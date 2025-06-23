'use client';

import { useCallback, useEffect, useState } from 'react';
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
} from '@/app/client/create-client-sidebar';
import { PessoaFisica } from '../../../types/client';
import { createPessoaFisica } from '../../../services/clients/createClient';
import { getPessoasFisicas } from '../../../services/clients/listClient';
import CompletePagination from '@/components/completePagination';

const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  console.log(`Toast (${type}):`, message);
  alert(message);
};

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateClientOpen, setIsCreateClientOpen] = useState(false);
  const [clients, setClients] = useState<PessoaFisica[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const fetchClients = useCallback(async () => {
    try {
      const response = await getPessoasFisicas(page, pageSize, searchTerm);
      setClients(response.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Could not load clients';
      showToast(errorMessage, 'error');
    }
  }, [page, pageSize, searchTerm]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleDeleteClient = (clientId: string) => {
    console.log(clientId);
    //     try {
    //       await deletePessoaFisica(clientId);
    //       showToast('Client deleted successfully!', 'success'); // Refresh the client list
    //       fetchClients();
    //     } catch (error) {
    //       const errorMessage =
    //         error instanceof Error ? error.message : 'Could not delete client';
    //       showToast(errorMessage, 'error');
    //     }
  };

  const handleEditClient = () => {
    // TODO: Implement edit functionality. This would likely involve:
    // 1. Opening a sidebar/modal, similar to CreateClientSidebar.
    // 2. Pre-filling the form with the selected client's data.
    // 3. Creating an `updatePessoaFisica` function in the service.
    // 4. Calling that service function on form submission.
    showToast('Edit functionality is not yet implemented.', 'error');
  };

  const handleCreateClient = async (newClientData: CreatePessoaFisicaDto) => {
    console.log(newClientData);
    try {
      await createPessoaFisica(newClientData);
      showToast('Client created successfully!', 'success');
      setIsCreateClientOpen(false);
      setPage(1);
      setSearchTerm('');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Could not create client';
      showToast(errorMessage, 'error');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

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
                    href="/dashboard"
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
                    placeholder="Pesquisar por nome, email, CPF..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-8 w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                  />
                </div>
              </div>
              <Button
                className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-medium"
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
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-slate-700/50">
                      <TableHead className="text-slate-300">Nome</TableHead>
                      <TableHead className="text-slate-300">Email</TableHead>
                      <TableHead className="text-slate-300">Telefone</TableHead>
                      <TableHead className="text-slate-300">CPF</TableHead>
                      <TableHead className="text-slate-300">Ações</TableHead>
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
                                onClick={handleEditClient}
                                className="text-slate-400 hover:text-white hover:bg-slate-700"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-slate-400 hover:text-red-400 hover:bg-slate-700"
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
                                      {client.nomeCompleto}? Esta ação não pode
                                      ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-slate-700 text-slate-300 hover:bg-slate-600 border-slate-600">
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteClient(client.id)
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
              <CardFooter className="flex justify-end pt-6">
                <CompletePagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </CardFooter>
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
      </SidebarProvider>
    </div>
  );
}
