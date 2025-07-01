import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePessoaFisica } from '../api/clientApi';
import { clientsQueryKeys } from './useGetClients';
import toast from 'react-hot-toast';

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientId: string) => deletePessoaFisica(clientId),

    onSuccess: async () => {
      toast.success('Cliente deletado com sucesso!');

      await queryClient.invalidateQueries({
        queryKey: clientsQueryKeys.lists(),
      });
    },

    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao deletar o cliente.');
    },
  });
}
