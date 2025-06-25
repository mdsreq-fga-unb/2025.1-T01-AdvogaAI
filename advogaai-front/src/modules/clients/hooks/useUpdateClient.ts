import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePessoaFisica } from '../api/clientApi';
import { clientsQueryKeys } from './useGetClients';
import { UpdatePessoaFisicaDto } from '../api/clientSchema';
import toast from 'react-hot-toast';

interface UpdateClientVariables {
  clientId: string;
  clientData: UpdatePessoaFisicaDto;
}

export function useUpdateClient({
  onSuccess,
}: { onSuccess?: () => void } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clientId, clientData }: UpdateClientVariables) =>
      updatePessoaFisica(clientId, clientData),

    onSuccess: async () => {
      toast.success('Cliente atualizado com sucesso!');

      await queryClient.invalidateQueries({
        queryKey: clientsQueryKeys.lists(),
      });

      onSuccess?.();
    },

    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao atualizar o cliente.');
    },
  });
}
