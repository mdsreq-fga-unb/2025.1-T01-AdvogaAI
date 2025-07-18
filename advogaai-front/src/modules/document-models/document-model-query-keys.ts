/**
 * Fábrica de chaves de query para manter a consistência e evitar erros de digitação.
 * Usado para invalidar e buscar dados do cache do React Query.
 */
export const documentModelsQueryKeys = {
  all: ['documentModels'] as const,
  lists: () => [...documentModelsQueryKeys.all, 'list'] as const,
  deleteGenerated: () => [...documentModelsQueryKeys.all, 'list'] as const,
  list: (filters: { limit: number; offset: number; search?: string }) =>
    [...documentModelsQueryKeys.lists(), filters] as const,
  listGeneratedDocs: (filters: {
    limit: number;
    offset: number;
    search?: string;
  }) => [...documentModelsQueryKeys.lists(), filters] as const,
  systemTags: () => [...documentModelsQueryKeys.all, 'system-tags'] as const,
  gerar: (modeloId: string, clienteId: string) =>
    [...documentModelsQueryKeys.all, 'gerar', modeloId, clienteId] as const,
};
