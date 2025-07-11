import { z } from 'zod';
import {
  GetProcessosPorPrioridadeResponse,
  getProcessosPorPrioridadeResponseSchema,
  GetProcessosResponse,
  getProcessosResponseSchema,
} from './processSchema';

export async function getProcessos(
  limit: number,
  offset: number,
): Promise<GetProcessosResponse> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiUrl = `${API_BASE_URL}/processos?page=${offset}&pageSize=${limit}`;

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
          : 'Falha ao listar processos.';
      throw new Error(message);
    }

    const data = (await response.json()) as GetProcessosResponse;

    const validatedData = getProcessosResponseSchema.parse(data);
    return validatedData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          'Os dados recebidos da API estão em um formato inesperado.',
        );
      }
      throw new Error(error.message || 'Erro ao buscar os processos.');
    }
    throw new Error('Erro desconhecido ao buscar os processos.');
  }
}

export async function getProcessosPorPrioridade() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiUrl = `${API_BASE_URL}/processos/prioritized`;

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
          : 'Erro ao carregar processos.';
      throw new Error(message);
    }

    const data = (await response.json()) as GetProcessosPorPrioridadeResponse;
    const validatedData = getProcessosPorPrioridadeResponseSchema.parse(data);
    return validatedData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        error.message || 'Erro ao buscar processos por prioridade.',
      );
    }
    throw new Error('Erro desconhecido ao buscar processos por prioridade.');
  }
}
