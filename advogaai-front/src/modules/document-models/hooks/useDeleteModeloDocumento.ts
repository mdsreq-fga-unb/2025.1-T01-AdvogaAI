import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteModeloDocumento } from '../api/documentModelsApi';
import { documentModelsQueryKeys } from '../document-model-query-keys';

/**
 * Hook para excluir um modelo de documento.
 */
export function useDeleteModeloDocumento({
  onSuccess,
}: { onSuccess?: () => void } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteModeloDocumento(id),
    onSuccess: async () => {
      toast.success('Modelo de documento excluído com sucesso!');
      await queryClient.invalidateQueries({
        queryKey: documentModelsQueryKeys.lists(),
      });
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao excluir o modelo de documento.');
    },
  });
}
