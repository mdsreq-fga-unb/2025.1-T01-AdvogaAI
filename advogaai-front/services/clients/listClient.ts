import { PessoaFisica } from '../../types/client';
import nookies from 'nookies';

export interface PessoasFisicasResponse {
  data: PessoaFisica[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export async function getPessoasFisicas(
  page: number = 1,
  pageSize: number = 10,
  search?: string,
): Promise<PessoasFisicasResponse> {
  const token = nookies.get().authToken;

  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (search) {
    params.append('search', search);
  }
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const apiUrl = `${API_BASE_URL}/clients/pessoa-fisica?${params.toString()}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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
