import { useQuery } from '@tanstack/react-query';
import { getProcessos } from '../api/processApi'; // Importe o serviço que você criou para buscar processos

export const processosQueryKeys = {
  all: ['processos'] as const,
  lists: () => [...processosQueryKeys.all, 'list'] as const,
  list: (filters: { page: number; limit: number }) =>
    [...processosQueryKeys.lists(), filters] as const,
};

export function useGetProcessos({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  return useQuery({
    queryKey: processosQueryKeys.list({ page, limit }),
    queryFn: () => getProcessos(limit, page),
    staleTime: 1000 * 60 * 5, // Define um tempo de cache de 5 minutos (ajuste conforme necessário)
  });
}
