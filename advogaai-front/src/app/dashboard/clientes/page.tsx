'use client';

import { useState } from 'react';

import { maskCPF, maskTelefone } from '@/lib/masks';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Search, Edit, Trash2, UserPlus } from 'lucide-react';
import { CreateClientSidebar } from './components/create-client-sidebar';
import { EditClientSidebar } from './components/edit-client-sidebar';
import CompletePagination from '@/components/completePagination';

import { useDebounce } from '../../../../hooks/use-debounce';
import {
  useDeleteClient,
  useGetClients,
  useUpdateClient,
  PessoaFisica,
} from '@/modules/clients';

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateClientOpen, setIsCreateClientOpen] = useState(false);
  const [isEditClientOpen, setIsEditClientOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<PessoaFisica | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetClients({ page, limit, search: debouncedSearchTerm });

  const clients = response?.data ?? [];
  const totalPages = response?.totalPages ?? 1;

  const { mutate: deleteClient, isPending: isDeleting } = useDeleteClient();

  const { mutate: updateClient } = useUpdateClient({
    onSuccess: () => {
      setIsEditClientOpen(false);
    },
  });
  if (isError) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Erro ao carregar clientes: {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Pesquisar por nome, email, CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full bg-slate-700 border-slate-600 text-white"
          />
        </div>
        <Button
          onClick={() => setIsCreateClientOpen(true)}
          className="gap-2 bg-cyan-500 cursor-pointer hover:bg-cyan-600 text-slate-900 font-medium"
        >
          <UserPlus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Lista de Clientes</CardTitle>
          <CardDescription className="text-slate-400">
            Visualize e gerencie todos os seus clientes cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-16">
              <div className="w-10 h-10 border-4 rounded-full border-slate-300 border-t-cyan-500 animate-spin"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-700/50">
                  <TableHead className="text-slate-300">Nome</TableHead>
                  <TableHead className="text-slate-300">Email</TableHead>
                  <TableHead className="text-slate-300">Telefone</TableHead>
                  <TableHead className="text-slate-300">CPF</TableHead>
                  <TableHead className="text-right text-slate-300">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-slate-400"
                    >
                      Nenhum cliente encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client) => (
                    <TableRow key={client.id} className="border-slate-700">
                      <TableCell className="font-medium text-white">
                        {client.nomeCompleto}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {client.email}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {maskTelefone(client.telefone)}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {maskCPF(client.cpf ?? '')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setClientToEdit(client);
                              setIsEditClientOpen(true);
                            }}
                            className="text-slate-400 cursor-pointer hover:text-white"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={isDeleting}
                                className="text-slate-400 cursor-pointer hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-slate-800 border-slate-700">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">
                                  Confirmar exclusão
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-slate-400">
                                  Tem certeza que deseja excluir o cliente{' '}
                                  {client.nomeCompleto}? Esta ação não pode ser
                                  desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-slate-700 cursor-pointer text-slate-300 hover:bg-slate-600 border-slate-600">
                                  Cancelar
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteClient(client.id)}
                                  className="bg-red-600 cursor-pointer hover:bg-red-700 text-white"
                                >
                                  {isDeleting ? 'Excluindo...' : 'Excluir'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
        {!isLoading && totalPages > 1 && (
          <CardFooter className="flex justify-end pt-6">
            <CompletePagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </CardFooter>
        )}
      </Card>

      <CreateClientSidebar
        isOpen={isCreateClientOpen}
        onClose={() => setIsCreateClientOpen(false)}
      />
      <EditClientSidebar
        clientToEdit={clientToEdit}
        isOpen={isEditClientOpen}
        onClose={() => setIsEditClientOpen(false)}
        onUpdateClient={(clientId, clientData) =>
          updateClient({ clientId, clientData })
        }
      />
    </>
  );
}
