import { useQuery } from '@tanstack/react-query';
import { gerarDocumento } from '../api/documentModelsApi';
import { documentModelsQueryKeys } from '../document-model-query-keys';

export function useGerarDocumento(modeloId: string, clienteId: string) {
  return useQuery({
    queryKey: documentModelsQueryKeys.gerar(modeloId, clienteId),
    queryFn: () => gerarDocumento(modeloId, clienteId),
    enabled: !!modeloId && !!clienteId,
  });
}
