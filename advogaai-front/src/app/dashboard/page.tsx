'use client';

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
import { useGetProcessosPorPrioridade } from '@/modules/process/hooks/useGetProcessosPorPrioridade';
import { getUserDashboardData } from '@/services/user/getDashboardData.service';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [clients, setClients] = useState<number>(0);
  const [generatedDocs, setGeneratedDocs] = useState<number>(0);
  const [docsModels, setDocsModels] = useState<number>(0);
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetProcessosPorPrioridade();
  async function getDashboardInfo() {
    try {
      const response = await getUserDashboardData();
      setClients(response.clientes);
      setGeneratedDocs(response.docsGerados);
      setDocsModels(response.docsModels);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    void getDashboardInfo();
  }, []);

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Erro ao carregar os processos: {error.message}
      </div>
    );
  }

  const { urgente, media, baixa } = response ?? {
    urgente: [],
    media: [],
    baixa: [],
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="flex flex-col md:flex-row w-full justify-center items-center gap-10">
        <div className="flex w-full md:w-1/3 flex-col gap-6 outline-1 p-4 rounded-2xl ">
          <h1 className="text-lg text-alabaster-400 font-satoshi">Clientes</h1>
          <p className="text-5xl text-alabaster-100 font-cabinet">{clients}</p>
        </div>
        <div className="flex w-full md:w-1/3 flex-col gap-6 outline-1 p-4 rounded-2xl ">
          <h1 className="text-lg text-alabaster-400 font-satoshi">
            Documentos Gerados
          </h1>
          <p className="text-5xl text-alabaster-100 font-cabinet">
            {generatedDocs}
          </p>
        </div>
        <div className="flex w-full md:w-1/3 flex-col gap-6 outline-1 p-4 rounded-2xl ">
          <h1 className="text-lg text-alabaster-400 font-satoshi">
            Modelos de Documento
          </h1>
          <p className="text-5xl text-alabaster-100 font-cabinet">
            {docsModels}
          </p>
        </div>
      </div>

      <Card className="bg-slate-800 border-slate-700 w-full ">
        <CardHeader>
          <CardTitle className="text-white">Prioridade Urgente</CardTitle>
          <CardDescription className="text-slate-400">
            Processos que estão com o prazo de resposta entre 1 e 2 dias.
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {urgente.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-slate-400"
                    >
                      Nenhum processo urgente encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  urgente.map((processo) => (
                    <TableRow key={processo.id} className="border-slate-700">
                      <TableCell className="font-medium text-white">
                        {processo.numeroProcesso}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {processo.nomeClasse}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {processo.movimentacoes[0]?.tipoComunicacao}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {new Date(
                          processo.movimentacoes[0]?.prazoResposta,
                        ).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Média */}
      <Card className="bg-slate-800 border-slate-700 w-full ">
        <CardHeader>
          <CardTitle className="text-white">Prioridade Média</CardTitle>
          <CardDescription className="text-slate-400">
            Processos com prazo de resposta entre 3 e 4 dias.
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {media.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-slate-400"
                    >
                      Nenhum processo de prioridade média encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  media.map((processo) => (
                    <TableRow key={processo.id} className="border-slate-700">
                      <TableCell className="font-medium text-white">
                        {processo.numeroProcesso}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {processo.nomeClasse}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {processo.movimentacoes[0]?.tipoComunicacao}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {new Date(
                          processo.movimentacoes[0]?.prazoResposta,
                        ).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Baixa */}
      <Card className="bg-slate-800 border-slate-700 w-full">
        <CardHeader>
          <CardTitle className="text-white">Prioridade Baixa</CardTitle>
          <CardDescription className="text-slate-400">
            Processos com prazo de resposta acima de 4 dias.
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {baixa.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-slate-400"
                    >
                      Nenhum processo de prioridade baixa encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  baixa.map((processo) => (
                    <TableRow key={processo.id} className="border-slate-700">
                      <TableCell className="font-medium text-white">
                        {processo.numeroProcesso}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {processo.nomeClasse}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {processo.movimentacoes[0]?.tipoComunicacao}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {new Date(
                          processo.movimentacoes[0]?.prazoResposta,
                        ).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
