'use client';

import { getUserDashboardData } from '@/services/user/getDashboardData.service';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [clients, setClients] = useState<number>(0);
  const [generatedDocs, setGeneratedDocs] = useState<number>(0);
  const [docsModels, setDocsModels] = useState<number>(0);
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

  return (
    <div className="flex flex-wrap justify-center items-center gap-10">
      <div className="flex w-full flex-col gap-6 outline-1 p-4 rounded-2xl max-w-[500px]">
        <h1 className="text-lg text-alabaster-400 font-satoshi">Clientes</h1>
        <p className="text-5xl text-alabaster-100 font-cabinet">{clients}</p>
      </div>
      <div className="flex w-full flex-col gap-6 outline-1 p-4 rounded-2xl max-w-[500px]">
        <h1 className="text-lg text-alabaster-400 font-satoshi">
          Documentos Gerados
        </h1>
        <p className="text-5xl text-alabaster-100 font-cabinet">
          {generatedDocs}
        </p>
      </div>
      <div className="flex w-full flex-col gap-6 outline-1 p-4 rounded-2xl max-w-[500px]">
        <h1 className="text-lg text-alabaster-400 font-satoshi">
          Modelos de Documento
        </h1>
        <p className="text-5xl text-alabaster-100 font-cabinet">{docsModels}</p>
      </div>
    </div>
  );
}
