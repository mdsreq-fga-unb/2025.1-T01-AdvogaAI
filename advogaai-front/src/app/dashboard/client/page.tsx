'use client';

import { useEffect, useState } from 'react';
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
import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  CreateClientSidebar,
  CreatePessoaFisicaDto,
} from '@/app/dashboard/client/create-client-sidebar';
import { PessoaFisica } from '../../../../types/client';
import { createPessoaFisica } from '../../../../services/clients/createClient';
import { getPessoasFisicas } from '../../../../services/clients/listClient';
import CompletePagination from '@/components/completePagination';
import { deletePessoaFisica } from '../../../../services/clients/deleteClient';
import toast from 'react-hot-toast';
import { EditClientSidebar } from './edit-client-sidebar';
import {
  updatePessoaFisica,
  UpdatePessoaFisicaDto,
} from '../../../../services/clients/updateClient';

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateClientOpen, setIsCreateClientOpen] = useState(false);
  const [isEditClientOpen, setIsEditClientOpen] = useState(false);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [clients, setClients] = useState<PessoaFisica[]>([]);
  const [clientToEdit, setClientToEdit] = useState<PessoaFisica | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  async function fetchClients(search?: string) {
    setIsLoadingClients(true);
    try {
      const response = await getPessoasFisicas(
        limit,
        (page - 1) * limit,
        search ?? searchTerm,
      );
      setTotalPages(response.totalPages);
      setPage(response.currentPage);
      setClients(response.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Não foi possivel carregar os clientes!';
      toast.error(errorMessage);
    } finally {
      setIsLoadingClients(false);
    }
  }

  useEffect(() => {
    void fetchClients();
  }, [page]);

  const handleDeleteClient = async (clientId: string) => {
    try {
      await deletePessoaFisica(clientId);
      toast.success('Cliente deletado com sucesso!');
      await fetchClients();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Não foi possivel deletar o usuario!';
      toast.error(errorMessage);
    }
  };

  const handleEditClient = async (
    clientId: string,
    clientData: UpdatePessoaFisicaDto,
  ) => {
    try {
      await updatePessoaFisica(clientId, clientData);

      toast.success('Cliente atualizado com sucesso!');
      setIsEditClientOpen(false);
      await fetchClients();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Não foi possível editar o cliente!';
      toast.error(errorMessage);
    }
  };

  const handleCreateClient = async (newClientData: CreatePessoaFisicaDto) => {
    try {
      await createPessoaFisica(newClientData);
      toast.success('Cliente criado com sucesso!');
      setIsCreateClientOpen(false);
      setPage(1);
      setSearchTerm('');
      await fetchClients();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Não foi possivel criar o cliente!';
      toast.error(errorMessage);
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await fetchClients();
    }
  };

  async function handleSearchChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    event.preventDefault();
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      await fetchClients('');
    }
  }

  return (
    <div className="dark">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar variant="inset" />
        <SidebarInset
          className={cn(
            'transition-[margin] duration-200',
            'md:peer-data-[state=expanded]:ml-[--sidebar-width]',
            'md:peer-data-[state=collapsed]:ml-[calc(var(--sidebar-width-icon)+theme(spacing.4))]',
          )}
        >
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-700 bg-slate-800 px-4">
            <SidebarTrigger className="-ml-1 text-slate-300 hover:text-white" />
            <Separator
              orientation="vertical"
              className="mr-2 h-4 bg-slate-600"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="#"
                    className="text-slate-300 hover:text-white"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-slate-500" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">
                    Clientes
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-6 bg-slate-900 min-h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    max={80}
                    maxLength={80}
                    onKeyDown={(e) => void handleKeyDown(e)}
                    placeholder="Pesquisar por nome, email, CPF..."
                    value={searchTerm}
                    onChange={(e) => void handleSearchChange(e)}
                    className="pl-8 w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                  />
                </div>
                <Search className="h-6 w-6 cursor-pointer text-slate-400" />
              </div>
              <Button
                className="gap-2 bg-cyan-500 cursor-pointer hover:bg-cyan-600 text-slate-900 font-medium"
                onClick={() => setIsCreateClientOpen(true)}
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
              {!isLoadingClients ? (
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700 hover:bg-slate-700/50">
                        <TableHead className="text-slate-300">Nome</TableHead>
                        <TableHead className="text-slate-300">Email</TableHead>
                        <TableHead className="text-slate-300">
                          Telefone
                        </TableHead>
                        <TableHead className="text-slate-300">CPF</TableHead>
                        <TableHead className="text-slate-300">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {!isLoadingClients && clients.length === 0 ? (
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
                          <TableRow
                            key={client.id}
                            className="border-slate-700 hover:bg-slate-700/30"
                          >
                            <TableCell className="font-medium text-white">
                              {client.nomeCompleto}
                            </TableCell>
                            <TableCell className="text-slate-300">
                              {client.email}
                            </TableCell>
                            <TableCell className="text-slate-300">
                              {client.telefone}
                            </TableCell>
                            <TableCell className="text-slate-300">
                              {client.cpf}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setClientToEdit(client);
                                    setIsEditClientOpen(true);
                                  }}
                                  className="text-slate-400 cursor-pointer hover:text-white hover:bg-slate-700"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-slate-400 cursor-pointer hover:text-red-400 hover:bg-slate-700"
                                    >
                                      <Trash2 className=" w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="bg-slate-800 border-slate-700">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle className="text-white">
                                        Confirmar exclusão
                                      </AlertDialogTitle>
                                      <AlertDialogDescription className="text-slate-400">
                                        Tem certeza que deseja excluir o cliente{' '}
                                        {client.nomeCompleto}? Esta ação não
                                        pode ser desfeita.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="bg-slate-700 text-slate-300 hover:bg-slate-600 border-slate-600">
                                        Cancelar
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          void handleDeleteClient(client.id)
                                        }
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                      >
                                        Excluir
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
                </CardContent>
              ) : (
                <div className="w-10 h-10 border-6 self-center rounded-full border-slate-300 border-t-[#0092B8] animate-spin"></div>
              )}
              {!isLoadingClients && (
                <CardFooter className="flex justify-end pt-6">
                  <CompletePagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </CardFooter>
              )}
            </Card>
          </main>
        </SidebarInset>

        <CreateClientSidebar
          isOpen={isCreateClientOpen}
          onClose={() => setIsCreateClientOpen(false)}
          onCreateClient={(newClient) => {
            void handleCreateClient(newClient);
          }}
        />
        <EditClientSidebar
          clientToEdit={clientToEdit}
          isOpen={isEditClientOpen}
          onClose={() => setIsEditClientOpen(false)}
          onUpdateClient={(clientId, clientData) =>
            void handleEditClient(clientId, clientData)
          }
        />
      </SidebarProvider>
    </div>
  );
}
