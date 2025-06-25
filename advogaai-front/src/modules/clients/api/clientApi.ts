import z from 'zod';
import {
  CreatePessoaFisicaDto,
  GetPessoasFisicasResponse,
  getPessoasFisicasResponseSchema,
  PessoaFisica,
  UpdatePessoaFisicaDto,
} from './clientSchema';

export interface UpdatePessoaFisicaResponseType {
  message: string;
  statusCode: number;
}

export async function createPessoaFisica(pessoaFisica: CreatePessoaFisicaDto) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiUrl = `${API_BASE_URL}/clients/pessoa-fisica`;
  const newClient = {
    pessoaFisica: pessoaFisica,
  };
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClient),
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
          : 'Falha ao criar cliente.';
      throw new Error(message);
    }
    return (await response.json()) as PessoaFisica;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Ocorreu um erro ao criar o cliente.');
    }
    throw new Error('Ocorreu um erro desconhecido ao criar o cliente.');
  }
}

export async function deletePessoaFisica(id: string): Promise<void> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiUrl = `${API_BASE_URL}/clients/pessoa-fisica/${id}`;

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
          : 'Falha ao excluir cliente.';
      throw new Error(message);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Ocorreu um erro ao excluir o cliente.');
    }
    throw new Error('Ocorreu um erro desconhecido ao excluir o cliente.');
  }
}

export async function getPessoasFisicas(
  limit: number = 10,
  offset: number = 0,
  search?: string,
): Promise<GetPessoasFisicasResponse> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const apiUrl = `${API_BASE_URL}/clients/pessoa-fisica?limit=${limit}&offset=${offset}&search=${search}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
          : 'Falha ao listar clientes.';
      throw new Error(message);
    }
    const data = (await response.json()) as GetPessoasFisicasResponse;

    const validatedData = getPessoasFisicasResponseSchema.parse(data);
    return validatedData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          'Os dados recebidos da API estão em um formato inesperado.',
        );
      }
      throw new Error(
        error.message || 'Ocorreu um erro ao buscar os clientes.',
      );
    }
    throw new Error('Ocorreu um erro desconhecido ao buscar os clientes.');
  }
}

export async function updatePessoaFisica(
  id: string,
  data: UpdatePessoaFisicaDto,
): Promise<void> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/clients/pessoa-fisica/${id}`;

    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    const responseData =
      (await response.json()) as UpdatePessoaFisicaResponseType;

    if (!response.ok) {
      const errorMessage =
        responseData.message || 'Falha ao atualizar dados da pessoa física.';
      throw new Error(errorMessage);
    }

    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Ocorreu um erro desconhecido.');
  }
}
