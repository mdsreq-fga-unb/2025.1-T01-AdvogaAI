/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
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
import { CreateClientSidebar } from '@/components/create-client-sidebar';

export interface Client {
  id: string;
  nomeCompleto: string;
  documento: string;
  telefone: string;
  email: string;
  estadoCivil: 'SOLTEIRO' | 'CASADO' | 'DIVORCIADO' | 'VIUVO' | 'UNIAO_ESTAVEL';
}

export async function registerClient(clientData: {
  nome: string;
  documento: string;
  telefone: string;
  email: string;
}) {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5555/clients/pessoa-fisica', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(clientData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao criar cliente');
  return data;
}

export async function fetchClients(
  page = 1,
  pageSize = 10,
  search = '',
): Promise<{ items: Client[]; totalPages: number }> {
  const token = localStorage.getItem('token');
  const query = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    search,
  });

  const response = await fetch(
    `http://localhost:5555/clients/pessoa-fisica?${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Erro ao buscar clientes');
  }

  const result = await response.json();
  return {
    items: result.items,
    totalPages: result.totalPages,
  };
}

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateClientOpen, setIsCreateClientOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadClients() {
      try {
        const data = await fetchClients(page, pageSize, searchTerm);
        setClients(data.items);
        setTotalPages(data.totalPages);
      } catch (error: any) {
        alert(error.message || 'Erro ao carregar clientes');
      }
    }

    loadClients();
  }, [page, pageSize, searchTerm]);

  const filteredClients = clients.filter(
    (client) =>
      client.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telefone.includes(searchTerm) ||
      client.documento.includes(searchTerm),
  );

  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter((client) => client.id !== clientId));
  };

  const handleEditClient = () => {
    //Todo
  };

  const handleCreateClient = async (newClient: Omit<Client, 'id'>) => {
    try {
      await registerClient({
        nome: newClient.nomeCompleto,
        documento: newClient.documento,
        telefone: newClient.telefone,
        email: newClient.email,
      });

      const data = await fetchClients(page, pageSize, searchTerm);
      setClients(data.items);
      setTotalPages(data.totalPages);

      setIsCreateClientOpen(false);
    } catch (err: any) {
      alert(err.message);
    }
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

          <div className="flex flex-1 flex-col gap-4 p-6 bg-slate-900 min-h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Pesquisar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                    {filteredClients.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-8 text-slate-400"
                        >
                          Nenhum cliente encontrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredClients.map((client) => (
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
                            {client.documento}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditClient()}
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
              <div className="mt-4 flex justify-end">
                <div className="flex items-center gap-4 text-slate-300">
                  <span>
                    Página {page} de {totalPages}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={page <= 1}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="hover:text-white"
                  >
                    <span className="sr-only">Anterior</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={page >= totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="hover:text-white"
                  >
                    <span className="sr-only">Próxima</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </SidebarInset>

        <CreateClientSidebar
          isOpen={isCreateClientOpen}
          onClose={() => setIsCreateClientOpen(false)}
          onCreateClient={handleCreateClient}
        />
      </SidebarProvider>
    </div>
  );
}
