import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UpdateModeloDocumentoForm } from '../api/documentModelsSchema';
import { updateModeloDocumento } from '../api/documentModelsApi';
import { documentModelsQueryKeys } from '../document-model-query-keys';

/**
 * Hook para atualizar um modelo de documento existente.
 */
export function useUpdateModeloDocumento({
  onSuccess,
}: { onSuccess?: () => void } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateModeloDocumentoForm;
    }) => updateModeloDocumento(id, data),
    onSuccess: async () => {
      toast.success('Modelo de documento atualizado com sucesso!');
      await queryClient.invalidateQueries({
        queryKey: documentModelsQueryKeys.lists(),
      });
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao atualizar o modelo de documento.');
    },
  });
}
