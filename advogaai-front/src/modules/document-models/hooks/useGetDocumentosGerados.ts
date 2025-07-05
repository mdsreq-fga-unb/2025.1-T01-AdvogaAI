import { useQuery } from '@tanstack/react-query';
import { getDocumentosGerados } from '../api/documentModelsApi';
import { documentModelsQueryKeys } from '../document-model-query-keys';

/**
 * Hook para buscar a lista paginada de modelos de documento.
 */
export function useGetDocumentosGerados(
  limit: number = 10,
  offset: number = 0,
  search?: string,
) {
  return useQuery({
    queryKey: documentModelsQueryKeys.listGeneratedDocs({
      limit,
      offset,
      search,
    }),
    queryFn: () => getDocumentosGerados(limit, offset, search),
  });
}
