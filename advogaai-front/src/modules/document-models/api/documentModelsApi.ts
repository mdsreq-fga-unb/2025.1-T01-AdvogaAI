import z from 'zod';
import {
  CreateModeloDocumentoForm,
  GetModelosDocumentoResponse,
  getModelosDocumentoResponseSchema,
  ModeloDocumento,
  modeloDocumentoSchema,
  gerarDocumentoResponseSchema,
  TagSistema,
  tagSistemaSchema,
  UpdateModeloDocumentoForm,
} from './documentModelsSchema';

/**
 * Cria um novo modelo de documento, fazendo o upload do arquivo e dos dados.
 * @param data Os dados do formulário, incluindo o arquivo.
 * @returns O objeto ModeloDocumento criado.
 */
export async function createModeloDocumento(
  data: CreateModeloDocumentoForm,
): Promise<ModeloDocumento> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiUrl = `${API_BASE_URL}/document-models`;

  const formData = new FormData();
  formData.append('nome', data.nome);
  formData.append('tipo_documento', data.tipo_documento);
  formData.append('documento', data.documento ?? '');
  if (data.descricao) {
    formData.append('descricao', data.descricao);
  }
  // Adiciona cada ID de tag como um campo separado
  if (data.tagsSistemaIds) {
    data.tagsSistemaIds.forEach((id) =>
      formData.append('tagsSistemaIds', String(id)),
    );
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      credentials: 'include', // Para enviar cookies/tokens de autenticação
    });

    if (!response.ok) {
      const errorData: unknown = await response.json();
      const message =
        typeof errorData === 'object' &&
        errorData !== null &&
        'message' in errorData &&
        typeof (errorData as { message?: unknown }).message === 'string'
          ? (errorData as { message: string }).message
          : 'Falha ao criar o modelo de documento.';
      throw new Error(message);
    }
    return modeloDocumentoSchema.parse(await response.json());
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Ocorreu um erro desconhecido ao criar o modelo.');
  }
}

/**
 * Busca uma lista paginada de modelos de documento.
 * @param limit Itens por página.
 * @param offset Número de itens a pular.
 * @param search Termo de busca opcional.
 * @returns Um objeto com os dados paginados.
 */
export async function getModelosDocumento(
  limit: number = 10,
  offset: number = 0,
  search?: string,
): Promise<GetModelosDocumentoResponse> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });
  if (search) {
    params.append('search', search);
  }

  const apiUrl = `${API_BASE_URL}/document-models?${params.toString()}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData: unknown = await response.json();
      const message =
        typeof errorData === 'object' &&
        errorData !== null &&
        'message' in errorData &&
        typeof (errorData as { message?: unknown }).message === 'string'
          ? (errorData as { message: string }).message
          : 'Falha ao listar os modelos de documento.';
      throw new Error(message);
    }
    return getModelosDocumentoResponseSchema.parse(await response.json());
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.error('Erro de validação Zod:', error.issues);
      throw new Error(
        'Os dados recebidos da API estão em um formato inesperado.',
      );
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Ocorreu um erro desconhecido ao buscar os modelos.');
  }
}

/**
 * Busca a lista completa de tags de sistema disponíveis.
 * @returns Uma lista de tags de sistema.
 */
export async function getSystemTags(): Promise<TagSistema[]> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiUrl = `${API_BASE_URL}/document-models/system-tags`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData: unknown = await response.json();
      const message =
        typeof errorData === 'object' &&
        errorData !== null &&
        'message' in errorData &&
        typeof (errorData as { message?: unknown }).message === 'string'
          ? (errorData as { message: string }).message
          : 'Falha ao buscar as tags do sistema.';
      throw new Error(message);
    }
    return z.array(tagSistemaSchema).parse(await response.json());
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.error('Erro de validação Zod:', error.issues);
      throw new Error(
        'Os dados de tags recebidos da API estão em um formato inesperado.',
      );
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Ocorreu um erro desconhecido ao buscar as tags.');
  }
}

/**
 * Atualiza um modelo de documento existente.
 * @param id O ID do modelo a ser atualizado.
 * @param data Os dados do formulário a serem atualizados.
 * @returns O objeto ModeloDocumento atualizado.
 */
export async function updateModeloDocumento(
  id: string,
  data: UpdateModeloDocumentoForm,
): Promise<ModeloDocumento> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiUrl = `${API_BASE_URL}/document-models/${id}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData: unknown = await response.json();
      const message =
        typeof errorData === 'object' &&
        errorData !== null &&
        'message' in errorData &&
        typeof (errorData as { message?: unknown }).message === 'string'
          ? (errorData as { message: string }).message
          : 'Falha ao atualizar o modelo.';
      throw new Error(message);
    }
    return modeloDocumentoSchema.parse(await response.json());
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Ocorreu um erro desconhecido ao atualizar o modelo.');
  }
}

/**
 * Exclui um modelo de documento.
 * @param id O ID do modelo a ser excluído.
 */
export async function deleteModeloDocumento(id: string): Promise<void> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiUrl = `${API_BASE_URL}/document-models/${id}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData: unknown = await response.json();
      const message =
        typeof errorData === 'object' &&
        errorData !== null &&
        'message' in errorData &&
        typeof (errorData as { message?: unknown }).message === 'string'
          ? (errorData as { message: string }).message
          : 'Falha ao excluir o modelo.';
      throw new Error(message);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Ocorreu um erro desconhecido ao excluir o modelo.');
  }
}

export async function gerarDocumento(modeloId: string, clienteId: string) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiUrl = `${API_BASE_URL}/document-models/${modeloId}/gerar/${clienteId}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData: unknown = await response.json();
      const message =
        typeof errorData === 'object' &&
        errorData !== null &&
        'message' in errorData &&
        typeof (errorData as { message?: unknown }).message === 'string'
          ? (errorData as { message: string }).message
          : 'Falha ao gerar os dados do documento.';
      throw new Error(message);
    }

    return gerarDocumentoResponseSchema.parse(await response.json());
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      'Ocorreu um erro desconhecido ao gerar os dados do documento.',
    );
  }
}
