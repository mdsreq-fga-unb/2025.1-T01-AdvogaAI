import { useQuery } from '@tanstack/react-query';
import { getModelosDocumento } from '../api/documentModelsApi';
import { documentModelsQueryKeys } from '../document-model-query-keys';

/**
 * Hook para buscar a lista paginada de modelos de documento.
 */
export function useGetModelosDocumento(
  limit: number = 10,
  offset: number = 0,
  search?: string,
) {
  return useQuery({
    queryKey: documentModelsQueryKeys.list({ limit, offset, search }),
    queryFn: () => getModelosDocumento(limit, offset, search),
  });
}
