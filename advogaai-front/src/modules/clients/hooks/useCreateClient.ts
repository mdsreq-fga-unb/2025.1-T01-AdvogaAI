import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPessoaFisica } from '../api/clientApi';
import { clientsQueryKeys } from './useGetClients';
import toast from 'react-hot-toast';

export function useCreateClient({
  onSuccess,
}: { onSuccess?: () => void } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPessoaFisica,
    onSuccess: async () => {
      toast.success('Cliente criado com sucesso!');
      await queryClient.invalidateQueries({
        queryKey: clientsQueryKeys.lists(),
      });
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao criar cliente.');
    },
  });
}
