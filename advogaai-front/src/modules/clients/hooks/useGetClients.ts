import { useQuery } from '@tanstack/react-query';
import { getPessoasFisicas } from '../api/clientApi';

export const clientsQueryKeys = {
  all: ['clientes'] as const,
  lists: () => [...clientsQueryKeys.all, 'list'] as const,
  list: (filters: { page: number; search: string }) =>
    [...clientsQueryKeys.lists(), filters] as const,
};

export function useGetClients({
  page,
  search,
  limit,
}: {
  page: number;
  search: string;
  limit: number;
}) {
  return useQuery({
    queryKey: clientsQueryKeys.list({ page, search }),
    queryFn: () => getPessoasFisicas(limit, (page - 1) * limit, search),
  });
}
