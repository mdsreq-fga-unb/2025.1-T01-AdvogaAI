import { useQuery } from '@tanstack/react-query';
import { GetProcessosPorPrioridadeResponse } from '../api/processSchema';
import { getProcessosPorPrioridade } from '../api/processApi';

export const processosQueryKeys = {
  all: ['processos'] as const,
  priority: () => [...processosQueryKeys.all, 'priority'] as const,
};

export function useGetProcessosPorPrioridade() {
  return useQuery<GetProcessosPorPrioridadeResponse>({
    queryKey: processosQueryKeys.priority(),
    queryFn: getProcessosPorPrioridade,
  });
}
