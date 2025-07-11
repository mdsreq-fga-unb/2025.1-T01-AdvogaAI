/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Movimentacao } from '@prisma/client';

@Injectable()
export class ProcessoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getProcessosPaginated(userId: string, page: number, pageSize: number) {
    return await this.prisma.processo.findMany({
      where: { userId },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        movimentacoes: {
          take: 1,
          orderBy: {
            dataDisponibilizacao: 'desc',
          },
          select: {
            tipoComunicacao: true,
            nomeOrgao: true,
            tipoDocumento: true,
            prazoResposta: true,
          },
        },
      },
    });
  }

  async countProcessos(userId: string) {
    return await this.prisma.processo.count({
      where: { userId },
    });
  }

  async getLastMovimentacao(processoId: string): Promise<Movimentacao | null> {
    return await this.prisma.movimentacao.findFirst({
      where: { processoId },
      orderBy: {
        dataDisponibilizacao: 'desc',
      },
    });
  }

  async getPrioritizedProcessos(userId: string) {
    const now = new Date();
    const urgente = 2;
    const media = 4;
    const baixa = 5;

    const processos = await this.prisma.processo.findMany({
      where: {
        userId,
        movimentacoes: {
          some: {
            prazoResposta: { gte: now },
          },
        },
      },
      include: {
        movimentacoes: {
          select: {
            id: true,
            tipoComunicacao: true,
            nomeOrgao: true,
            tipoDocumento: true,
            meiocompleto: true,
            prazoResposta: true,
            numeroComunicacao: true,
            createdAt: true,
            updatedAt: true,
            dataDisponibilizacao: true,
          },
          orderBy: {
            prazoResposta: 'desc',
          },
        },
      },
    });

    type ProcessoWithMovimentacoes = (typeof processos)[number];
    const urgenteList: ProcessoWithMovimentacoes[] = [];
    const mediaList: ProcessoWithMovimentacoes[] = [];
    const baixaList: ProcessoWithMovimentacoes[] = [];

    processos.forEach((processo) => {
      const movimentacao = processo.movimentacoes[0];

      if (movimentacao) {
        const prazoResposta = new Date(movimentacao.prazoResposta);
        const diffTime = prazoResposta.getTime() - now.getTime();
        const diffDays = diffTime / (1000 * 3600 * 24);

        if (diffDays <= urgente && diffDays >= 0) {
          urgenteList.push(processo);
        } else if (diffDays <= media && diffDays >= urgente) {
          mediaList.push(processo);
        } else if (diffDays > baixa) {
          baixaList.push(processo);
        }
      }
    });

    return {
      urgente: urgenteList,
      media: mediaList,
      baixa: baixaList,
    };
  }
}
