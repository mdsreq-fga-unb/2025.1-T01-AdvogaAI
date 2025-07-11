'use client';

import { useState } from 'react';

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

import CompletePagination from '@/components/completePagination';

import { useGetProcessos } from '@/modules/process/hooks/useGetProcess';

export default function ProcessosPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetProcessos({ page, limit });

  const processos = response?.processos ?? [];
  const totalPages =
    response?.total && response?.pageSize
      ? Math.ceil(response.total / response.pageSize)
      : 1;
  if (isError) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Erro ao carregar processos: {error.message}
      </div>
    );
  }

  return (
    <>
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Lista de Processos</CardTitle>
          <CardDescription className="text-slate-400">
            Visualize e gerencie todos os seus processos cadastrados
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
                  <TableHead className="text-slate-300">
                    Número do Processo
                  </TableHead>
                  <TableHead className="text-slate-300">Classe</TableHead>
                  <TableHead className="text-slate-300">
                    Última Movimentação
                  </TableHead>
                  <TableHead className="text-slate-300">
                    Prazo de Resposta
                  </TableHead>
                  <TableHead className="text-right text-slate-300">
                    Tribunal
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processos.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-slate-400"
                    >
                      Nenhum processo encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  processos.map((processo) => {
                    return (
                      <TableRow
                        key={processo.id}
                        className={`border-slate-700`}
                      >
                        <TableCell className="font-medium text-white">
                          {processo.numeroProcesso}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {processo.nomeClasse}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {processo.movimentacoes[0]?.tipoComunicacao}
                        </TableCell>
                        <TableCell className={` text-white rounded-2xl `}>
                          {new Date(
                            processo.movimentacoes[0]?.prazoResposta,
                          ).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {processo.siglaTribunal}
                        </TableCell>
                      </TableRow>
                    );
                  })
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
    </>
  );
}
