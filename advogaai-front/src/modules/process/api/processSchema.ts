import { z } from 'zod';

const movimentacaoSchema = z.object({
  tipoComunicacao: z.string(), // Tipo da comunicação (ex: "Intimação")
  nomeOrgao: z.string(), // Nome do órgão (ex: "Presidência do Tribunal")
  tipoDocumento: z.string(), // Tipo do documento (ex: "Decisão")
  prazoResposta: z.coerce.date(), // Data de prazo de resposta
});

export const processoSchema = z.object({
  id: z.string().uuid({ message: 'ID de processo inválido.' }),
  siglaTribunal: z.string(), // Sigla do tribunal (ex: "TJDFT")
  numeroProcesso: z.string(), // Número do processo (ex: "07165746420198070020")
  nomeClasse: z.string(), // Nome da classe (ex: "AGRAVO DE INSTRUMENTO EM RECURSO ESPECIAL")
  userId: z.string().uuid({ message: 'ID do usuário (advogado) inválido.' }),
  createdAt: z.coerce.date(), // Data de criação
  updatedAt: z.coerce.date(), // Data de atualização
  movimentacoes: z.array(movimentacaoSchema), // Movimentações associadas ao processo
});

export const getProcessosResponseSchema = z.object({
  total: z.number(), // Total de processos encontrados
  processos: z.array(processoSchema), // Lista de processos
  page: z.number(), // Página atual
  pageSize: z.number(), // Tamanho da página
});

export const getProcessosPorPrioridadeResponseSchema = z.object({
  urgente: z.array(processoSchema),
  media: z.array(processoSchema),
  baixa: z.array(processoSchema),
});

export type Processo = z.infer<typeof processoSchema>;
export type Movimentacao = z.infer<typeof movimentacaoSchema>;
export type GetProcessosResponse = z.infer<typeof getProcessosResponseSchema>;
export type GetProcessosPorPrioridadeResponse = z.infer<
  typeof getProcessosPorPrioridadeResponseSchema
>;
