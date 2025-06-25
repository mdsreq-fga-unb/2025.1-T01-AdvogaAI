import { z } from 'zod';

/**
 * Schema para o objeto Endereço.
 * Valida a estrutura de um endereço retornado pela API.
 */
export const enderecoSchema = z.object({
  id: z.string().uuid({ message: 'ID de endereço inválido.' }),
  logradouro: z.string(),
  numero: z.string(),
  complemento: z
    .string()
    .nullable()
    .transform((val) => val ?? undefined),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string().length(2, { message: 'Estado deve ter 2 caracteres.' }),
  cep: z.string().regex(/^\d{8}$/, { message: 'CEP deve conter 8 dígitos.' }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

/**
 * Schema para validação do formulário de criação de Endereço.
 */
export const createAddressSchema = z.object({
  cep: z.string().min(8, 'CEP é obrigatório'),
  logradouro: z.string().min(1, 'Logradouro é obrigatório'),
  numero: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string().optional(), // Complemento é opcional
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  estado: z.string().min(2, 'Estado é obrigatório').max(2),
});
export enum EstadoCivil {
  SOLTEIRO = 'SOLTEIRO',
  CASADO = 'CASADO',
  DIVORCIADO = 'DIVORCIADO',
  VIUVO = 'VIUVO',
  UNIAO_ESTAVEL = 'UNIAO_ESTAVEL',
}

export const updateAddressSchema = createAddressSchema.partial().extend({
  id: z
    .string()
    .uuid({ message: 'O ID do endereço é necessário para a atualização.' }),
});
/**
 * Schema para o objeto PessoaFisica.
 * Valida a estrutura completa de um cliente pessoa física retornado pela API.
 */
export const pessoaFisicaSchema = z.object({
  id: z.string().uuid({ message: 'ID de cliente inválido.' }),
  nomeCompleto: z.string(),
  cpf: z.string().regex(/^\d{11}$/, { message: 'CPF deve conter 11 dígitos.' }),
  rg: z.string(),
  ctps: z.string(),
  nacionalidade: z.string(),
  email: z.string().email({ message: 'Email em formato inválido.' }),
  telefone: z.string(),
  estadoCivil: z.nativeEnum(EstadoCivil, {
    message: 'Estado civil inválido vindo da API.',
  }),
  profissao: z.string(),
  enderecoId: z.string().uuid(),
  userId: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  endereco: enderecoSchema,
});

export const getPessoasFisicasResponseSchema = z.object({
  data: z.array(pessoaFisicaSchema),
  totalPages: z.number(),
  currentPage: z.number(),
});

export type Endereco = z.infer<typeof enderecoSchema>;
export type PessoaFisica = z.infer<typeof pessoaFisicaSchema>;
export type GetPessoasFisicasResponse = z.infer<
  typeof getPessoasFisicasResponseSchema
>;

/**
 * Schema para validação do formulário de criação de Pessoa Física.
 */
export const createPessoaFisicaSchema = z.object({
  nomeCompleto: z.string().min(3, 'Nome completo é obrigatório.'),
  cpf: z.string().length(11, 'O CPF deve conter 11 dígitos.'),
  rg: z.string().min(1, 'RG é obrigatório.'),
  ctps: z.string().min(1, 'CTPS é obrigatória.'),
  nacionalidade: z.string().min(1, 'Nacionalidade é obrigatória.'),
  email: z.string().email('Formato de email inválido.'),
  telefone: z.string().min(10, 'Telefone é obrigatório.'),
  estadoCivil: z.nativeEnum(EstadoCivil, {
    errorMap: () => ({ message: 'Selecione um estado civil.' }),
  }),
  profissao: z.string().min(1, 'Profissão é obrigatória.'),
  endereco: createAddressSchema,
});

export const updatePessoaFisicaSchema = createPessoaFisicaSchema
  .partial()
  .extend({
    endereco: updateAddressSchema.optional(),
  });

export type CreatePessoaFisicaDto = z.infer<typeof createPessoaFisicaSchema>;
export type UpdatePessoaFisicaDto = z.infer<typeof updatePessoaFisicaSchema>;
