'use client';

import { useState } from 'react';
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

interface Client {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
}

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateClientOpen, setIsCreateClientOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      nome: 'Herminia Silva',
      email: 'pfelisticker@gmail.com',
      telefone: '(11) 91234-5678',
      cpf: '274.850.540-91',
    },
    {
      id: '2',
      nome: 'João Santos',
      email: 'joao.santos@gmail.com',
      telefone: '(21) 99876-5432',
      cpf: '036.127.370-82',
    },
    {
      id: '3',
      nome: 'Maria Oliveira',
      email: 'maria.oliveira@gmail.com',
      telefone: '(31) 98765-4321',
      cpf: '801.034.100-53',
    },
    {
      id: '4',
      nome: 'Pedro Costa',
      email: 'pedro.costa@gmail.com',
      telefone: '(61) 99666-1122',
      cpf: '587.316.670-04',
    },
    {
      id: '5',
      nome: 'Ana Ferreira',
      email: 'ana.ferreira@gmail.com',
      telefone: '(41) 99900-8877',
      cpf: '923.580.420-00',
    },
  ]);

  const filteredClients = clients.filter(
    (client) =>
      client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telefone.includes(searchTerm) ||
      client.cpf.includes(searchTerm),
  );

  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter((client) => client.id !== clientId));
  };

  const handleEditClient = () => {
    //Todo
  };

  const handleCreateClient = (newClient: Omit<Client, 'id'>) => {
    const client: Client = {
      id: Date.now().toString(),
      ...newClient,
    };
    setClients([...clients, client]);
    setIsCreateClientOpen(false);
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
                            {client.nome}
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
                                      {client.nome}? Esta ação não pode ser
                                      desfeita.
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
