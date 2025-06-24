import { PessoaFisica } from '../../types/client';

export interface PessoasFisicasResponse {
  data: PessoaFisica[];
  total: number;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

export async function getPessoasFisicas(
  limit: number = 10,
  offset: number = 0,
  search?: string,
): Promise<PessoasFisicasResponse> {
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
    return (await response.json()) as PessoasFisicasResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        error.message || 'Ocorreu um erro ao buscar os clientes.',
      );
    }
    throw new Error('Ocorreu um erro desconhecido ao buscar os clientes.');
  }
}
