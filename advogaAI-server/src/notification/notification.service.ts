/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';
import axios from 'axios';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';
import { SendEmailDto } from 'src/email/dto/send-email.dto';
import { EmailQueueService } from 'src/email/services/email-queue.service';
import { ProcessoRepository } from 'src/process/process.repository';

interface Movimentacao {
  id: number;
  data_disponibilizacao: string; // Data de disponibilização (ex: "2025-07-07")
  siglaTribunal: string; // Sigla do Tribunal (ex: "TRT10")
  tipoComunicacao: string; // Tipo de Comunicação (ex: "Intimação")
  nomeOrgao: string; // Nome do órgão (ex: "17ª Vara do Trabalho de Brasília - DF")
  idOrgao: number; // ID do órgão (ex: 46619)
  texto: string; // Texto completo da comunicação
  numero_processo: string; // Número do processo (ex: "00009753020245100017")
  meio: string; // Meio de comunicação (ex: "D")
  link: string; // Link para o documento (ex: "https://pje.trt10.jus.br/pjekz/validacao/...")
  tipoDocumento: string; // Tipo do documento (ex: "Notificação")
  nomeClasse: string; // Nome da classe (ex: "Ação Trabalhista - Rito Ordinário")
  codigoClasse: string; // Código da classe (ex: "985")
  numeroComunicacao: number; // Número da comunicação (ex: 1936)
  ativo: boolean; // Status ativo da comunicação (ex: true)
  hash: string; // Hash (ex: "QP4g8rBZ7LVh5W5IqTzVnloYn27bML")
  status: string; // Status da comunicação (ex: "P")
  motivoCancelamento?: string; // Motivo do cancelamento (se houver)
  dataCancelamento?: string; // Data do cancelamento (se houver)
  meiocompleto: string; // Meio completo (ex: "Diário de Justiça Eletrônico Nacional")
  numeroProcessoComMascara: string; // Número do processo com máscara (ex: "0000975-30.2024.5.10.0017")
  destinatarios: Destinatario[]; // Destinatários da comunicação
  destinatarioAdvogados: DestinatarioAdvogado[]; // Advogados destinatários da comunicação
}

// Definindo a tipagem da movimentação
export interface MovimentacaoBanco {
  id: string;
  tipoComunicacao: string;
  nomeOrgao: string;
  tipoDocumento: string;
  meiocompleto: string;
  prazoResposta: Date;
  numeroComunicacao: string;
  createdAt: Date;
  updatedAt: Date;
  dataDisponibilizacao: Date;
}

// Definindo a tipagem do processo, incluindo movimentações
export interface Processo {
  id: string;
  siglaTribunal: string;
  numeroProcesso: string;
  nomeClasse: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  movimentacoes: MovimentacaoBanco[];
}

interface Destinatario {
  polo: string; // Polo (ex: "A", "P")
  nome: string; // Nome do destinatário (ex: "CAROLINE DA CUNHA DINIZ")
  comunicacaoId: number; // ID da comunicação
}

interface DestinatarioAdvogado {
  id: number; // ID do destinatário advogado
  comunicacaoId: number; // ID da comunicação
  advogadoId: number; // ID do advogado
  advogado: Advogado; // Dados do advogado
}

interface Advogado {
  id: number; // ID do advogado
  nome: string; // Nome do advogado (ex: "HERMINIA PFEILSTICKER GONCALVES DE OLIVEIRA")
  numero_oab: string; // Número da OAB do advogado (ex: "12400")
  uf_oab: string; // UF da OAB do advogado (ex: "DF")
}

function separarOAB(oab: string): { uf: string; numero: string } | null {
  const regex = /^([A-Z]{2})(\d+)$/; // Regex para separar UF (2 letras) e número (sequência numérica)

  const match = RegExp(regex).exec(oab); // Aplica a regex na OAB

  if (match) {
    const uf = match[1]; // Captura a UF (2 primeiras letras)
    const numero = match[2]; // Captura o número (restante)
    return { uf, numero };
  }

  return null; // Caso o formato não seja válido
}

@Injectable()
export class NotificacaoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailQueueService: EmailQueueService,
    private readonly processRepository: ProcessoRepository,
  ) {}

  scheduleCronJobs() {
    cron.schedule('0 0 * * *', async () => {
      await this.processarUsuarios();
    });
    cron.schedule('0 12 * * *', async () => {
      await this.sendNotificationEmails();
    });
  }

  async triggerCronJobManual() {
    console.log('Triggering cron job manually...');
    await this.processarUsuarios();
  }

  async triggerCronJobNotificationManual() {
    console.log('Triggering cron job manually...');
    await this.sendNotificationEmails();
  }

  async processarUsuarios() {
    const usuarios: User[] = await this.prisma.user.findMany({
      where: {
        isActive: true,
        isConfirmed: true,
        oab: {
          not: null,
        },
      },
    });
    console.log(usuarios);

    for (const usuario of usuarios) {
      if (usuario.oab) {
        const resultado = separarOAB(usuario.oab);

        if (resultado) {
          await this.buscarMovimentacoes(
            usuario.id,
            resultado.uf,
            resultado.numero,
          );
        }
      }
    }
  }

  async buscarMovimentacoes(userId: string, uf: string, numero: string) {
    const url = `${process.env.PJE_URL}/comunicacao?ufOab=${uf}&numeroOab=${numero}`;
    console.log(url);
    try {
      const response = await axios.get(url, {
        timeout: 10000, // 10 segundos de timeout
      });
      const movimentacoes: Movimentacao[] = response.data.items;
      console.log(`Movimentações encontradas: ${movimentacoes.length}`);

      for (const movimentacao of movimentacoes) {
        let processo = await this.prisma.processo.findUnique({
          where: { numeroProcesso: movimentacao.numero_processo },
        });

        if (!processo) {
          console.log(
            `Processo não encontrado, criando novo para o número ${movimentacao.numero_processo}`,
          );

          processo = await this.prisma.processo.create({
            data: {
              numeroProcesso: movimentacao.numero_processo,
              siglaTribunal: movimentacao.siglaTribunal,
              nomeClasse: movimentacao.nomeClasse,
              userId: userId,
            },
          });
        }
        let comunicacao = await this.prisma.movimentacao.findUnique({
          where: {
            numeroComunicacao: movimentacao.numeroComunicacao.toString(),
          },
        });

        if (!comunicacao) {
          // Se a movimentação não existir, cria uma nova
          console.log(
            `Criando movimentação para o processo ${movimentacao.numero_processo}`,
          );
          const prazoResposta = new Date(movimentacao.data_disponibilizacao);
          prazoResposta.setDate(prazoResposta.getDate() + 7);

          comunicacao = await this.prisma.movimentacao.create({
            data: {
              numeroComunicacao: movimentacao.numeroComunicacao.toString(),
              tipoComunicacao: movimentacao.tipoComunicacao,
              nomeOrgao: movimentacao.nomeOrgao,
              texto: movimentacao.texto,
              tipoDocumento: movimentacao.tipoDocumento,
              meiocompleto: movimentacao.meiocompleto,
              dataDisponibilizacao: new Date(
                movimentacao.data_disponibilizacao,
              ),
              prazoResposta,
              processoId: processo.id,
            },
          });

          console.log(
            `Movimentação criada com sucesso - ID: ${comunicacao.id}`,
          );
        } else {
          console.log(
            `Movimentação já existente com o ID ${movimentacao.numeroComunicacao}`,
          );
        }
      }
    } catch (error) {
      console.error('Erro ao buscar movimentações:', error);
    }
  }

  async sendNotificationEmails() {
    const usuariosComOAB = await this.prisma.user.findMany({
      where: {
        isActive: true,
        isConfirmed: true,
        oab: { not: null },
      },
    });

    for (const usuario of usuariosComOAB) {
      // Obtém os processos com base nas prioridades
      const processos = await this.processRepository.getPrioritizedProcessos(
        usuario.id,
      );

      const processosUrgentes = processos.urgente; // Prioridade 1 (urgente)
      const processosMedia = processos.media; // Prioridade 2 (média)
      const processosBaixa = processos.baixa; // Prioridade 3 (baixa)

      const emailData: SendEmailDto = {
        emailDestino: usuario.email,
        nomeUsuario: usuario.name,
        assunto: 'Aviso de Prazo de Resposta',
        titulo: 'Resumo dos Processos com Prazo de Resposta',
        corpo: this.criarCorpoEmailComProcessos(
          processosUrgentes,
          processosMedia,
          processosBaixa,
        ),
      };
      await this.emailQueueService.publishEmail(emailData);
    }
  }

  // Função para gerar o corpo do email com todos os processos e as últimas movimentações
  criarCorpoEmailComProcessos(
    processosUrgentes: Processo[],
    processosMedia: Processo[],
    processosBaixa: Processo[],
  ) {
    let corpo = `
    <p>Seguem os processos com prazos de resposta próximos:</p>`;

    corpo += this.criarCorpoPorPrioridade(processosUrgentes, 'urgente', 'red');
    corpo += this.criarCorpoPorPrioridade(processosMedia, 'média', 'yellow');
    corpo += this.criarCorpoPorPrioridade(processosBaixa, 'baixa', 'green');

    return corpo;
  }

  // Função para gerar o corpo do e-mail baseado na prioridade
  criarCorpoPorPrioridade(
    processos: Processo[],
    prioridade: string,
    cor: string,
  ) {
    let corpo = `<h2>${prioridade.charAt(0).toUpperCase() + prioridade.slice(1)} Prioridade</h2>`;
    if (processos.length === 0) {
      corpo += `<p>Não há processos de ${prioridade} prioridade.</p>`;
    } else {
      corpo += '<ul>';
      processos.forEach((processo) => {
        const ultimaMovimentacao = processo.movimentacoes[0];
        const prazoResposta = new Date(ultimaMovimentacao.prazoResposta);
        const diasRestantes = Math.ceil(
          (prazoResposta.getTime() - new Date().getTime()) / (1000 * 3600 * 24),
        );

        corpo += `
        <li>
          <strong>Processo:</strong> ${processo.numeroProcesso} - ${processo.nomeClasse}<br>
          <strong>Última Movimentação:</strong> ${ultimaMovimentacao.tipoComunicacao} - ${ultimaMovimentacao.nomeOrgao}<br>
          <strong>Prazo de Resposta:</strong> <span style="background-color: ${cor}">${prazoResposta.toLocaleDateString()}</span><br>
          <strong>Faltam</strong>: ${diasRestantes} dias
        </li>`;
      });
      corpo += '</ul>';
    }
    return corpo;
  }

  // Função que determina a cor da data com base no prazo
  getPrazoCor(prazoResposta: Date) {
    const now = new Date();
    const diasRestantes = Math.ceil(
      (prazoResposta.getTime() - now.getTime()) / (1000 * 3600 * 24),
    );

    if (diasRestantes <= 2) {
      return 'red'; // Prazo urgente
    } else if (diasRestantes <= 4) {
      return 'yellow'; // Prazo médio
    } else {
      return 'green'; // Prazo distante
    }
  }
}
