import { useQuery } from '@tanstack/react-query';
import { documentModelsQueryKeys } from '../document-model-query-keys';
import { getSystemTags } from '../api/documentModelsApi';

/**
 * Hook para buscar a lista completa de tags de sistema.
 */
export function useGetSystemTags() {
  return useQuery({
    queryKey: documentModelsQueryKeys.systemTags(),
    queryFn: getSystemTags,
    staleTime: 1000 * 60 * 5,
  });
}
