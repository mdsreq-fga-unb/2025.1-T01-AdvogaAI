import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CreateModeloDocumentoForm } from '../api/documentModelsSchema';
import { createModeloDocumento } from '../api/documentModelsApi';
import { documentModelsQueryKeys } from '../document-model-query-keys';

/**
 * Hook para criar um novo modelo de documento.
 */
export function useCreateModeloDocumento({
  onSuccess,
}: { onSuccess?: () => void } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateModeloDocumentoForm) =>
      createModeloDocumento(data),
    onSuccess: async () => {
      toast.success('Modelo de documento criado com sucesso!');
      await queryClient.invalidateQueries({
        queryKey: documentModelsQueryKeys.lists(),
      });
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao criar o modelo de documento.');
    },
  });
}
