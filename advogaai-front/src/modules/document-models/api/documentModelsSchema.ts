import { z } from 'zod';

/**
 * Schema para o objeto User.
 * Valida a estrutura de um usuário retornado pela API.
 * Nota: O campo 'password' é omitido por segurança.
 */
export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  isConfirmed: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

/**
 * Schema para o objeto TagSistema.
 * Valida a estrutura de uma tag de sistema retornada pela API.
 */
export const tagSistemaSchema = z.object({
  id: z.number(),
  chave: z.string(),
  descricao: z.string(),
  origemDados: z.string(),
});

/**
 * Schema para a tabela de junção CampoModeloDocumento.
 * Valida a relação entre ModeloDocumento e TagSistema.
 */
export const campoModeloDocumentoSchema = z.object({
  modeloDocumentoId: z.string().uuid(),
  tagSistemaId: z.number(),
  tagSistema: tagSistemaSchema, // Inclui o schema da tag aninhada
});

/**
 * Schema para o objeto ModeloDocumento.
 * Valida a estrutura completa de um modelo de documento retornado pela API.
 */
export const modeloDocumentoSchema = z.object({
  id: z.string().uuid({ message: 'ID do modelo inválido.' }),
  nome: z.string(),
  tipo_documento: z.string(),
  descricao: z
    .string()
    .nullable()
    .transform((val) => val ?? undefined),
  url: z.string().url({ message: 'URL do arquivo inválida.' }),
  userId: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  tagsDoSistema: z.array(campoModeloDocumentoSchema),
  user: userSchema,
});

/**
 * Schema para a resposta paginada da rota de listagem de modelos.
 */
export const getModelosDocumentoResponseSchema = z.object({
  data: z.array(modeloDocumentoSchema),
  totalItems: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  itemsPerPage: z.number(),
});

export type TagSistema = z.infer<typeof tagSistemaSchema>;
export type ModeloDocumento = z.infer<typeof modeloDocumentoSchema>;
export type GetModelosDocumentoResponse = z.infer<
  typeof getModelosDocumentoResponseSchema
>;

/**
 * Schema para validação do formulário de criação de Modelo de Documento.
 */
export const createModeloDocumentoSchema = z.object({
  nome: z.string().min(3, 'O nome do modelo é obrigatório.'),
  tipo_documento: z.string().min(1, 'O tipo do documento é obrigatório.'),
  descricao: z.string().optional(),
  documento: z
    .instanceof(FileList, { message: 'É necessário selecionar um arquivo.' })
    .refine((files) => files.length === 1, 'Selecione apenas um arquivo.')
    .transform((files) => files[0])
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, // 5MB
      `O arquivo não pode ter mais de 5MB.`,
    ),
  tagsSistemaIds: z
    .array(z.string())
    .optional()
    .transform((val) => val?.map(Number) ?? []),
});

/**
 * Schema para validação do formulário de atualização de Modelo de Documento.
 * Permite que todos os campos sejam opcionais.
 */
export const updateModeloDocumentoSchema = z.object({
  nome: z.string().min(3, 'O nome do modelo é obrigatório.').optional(),
  tipo_documento: z
    .string()
    .min(1, 'O tipo do documento é obrigatório.')
    .optional(),
  descricao: z.string().optional(),
});

export type CreateModeloDocumentoForm = z.infer<
  typeof createModeloDocumentoSchema
>;
export type UpdateModeloDocumentoForm = z.infer<
  typeof updateModeloDocumentoSchema
>;
