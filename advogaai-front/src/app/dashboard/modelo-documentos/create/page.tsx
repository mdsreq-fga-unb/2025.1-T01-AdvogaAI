'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, FileText, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Parameter, ParameterInput } from './componentes/parameterInput';

export default function CreateDocModelPage() {
  const router = useRouter();
  const [nome, setNome] = useState<string>('');
  const [tipo, setTipo] = useState<string>('');
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [parametros, setParametros] = useState<Parameter[]>([
    { id: 1, text: 'Cliente - Nome', color: 'blue' },
    { id: 2, text: 'Cliente - CPF', color: 'red' },
    { id: 3, text: 'Cliente - Estado Civil', color: 'blue' },
    { id: 4, text: 'Cliente - Telefone', color: 'green' },
  ]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setArquivo(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        // Define que só aceitamos arquivos .docx
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          ['.docx'],
      },
      maxFiles: 1,
    });

  return (
    <div className="w-full h-full grid md:grid-cols-2 grid-cols-1 items-center place-items-center justify-center text-white">
      <div className="flex h-full max-w-[600px] max-h-[900px] w-full flex-col items-center justify-center gap-4 md:pb-0 pb-4 md:px-4">
        <div className="flex w-full flex-col gap-12">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="nome" className="font-bold">
              Nome do Modelo de Documento
            </Label>
            <Input
              type="text"
              id="nome"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="bg-white text-white"
            />
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="tipo" className="font-bold">
              Tipo do Modelo de Documento
            </Label>
            <Input
              type="text"
              id="tipo"
              placeholder="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="bg-white text-white"
            />
          </div>

          <ParameterInput
            parametros={parametros}
            setParametros={setParametros}
          />
        </div>

        <h1 className="text-alabaster-50 text-4xl font-bold">
          Criar novo modelo de documento
        </h1>
        <div className="w-full p-4 rounded-2xl font-cabinet bg-[#525252]">
          <h1 className="text-lg font-bold text-alabaster-50">
            Faça modelos de documentos para preenchimento automático
          </h1>
          <p className="font-semibold text-alabaster-200">
            Você pode selecionar os parâmetros já existentes no sistema e criar
            novos.<br></br> Ai é só marcar qual parte do documento esses
            parâmetros vão preencher e pronto! Seu modelo já vai estar preparado
            para ser preenchido automaticamente.
          </p>
        </div>

        <div className="flex w-full max-w-[600px] flex-col items-center justify-center gap-4 md:flex-row">
          <Button
            onClick={() => router.back()}
            className="w-full cursor-pointer border-1 border-white bg-[#0F172B] py-6 font-satoshi text-md text-white hover:bg-[#E5E5E5] hover:text-black md:flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => console.log('Criar')}
            className="w-full cursor-pointer !py-6 font-satoshi text-md md:flex-1"
          >
            <Plus className=" h-4 w-4" />
            Criar modelo
          </Button>
        </div>
      </div>
      <div className="flex w-full max-w-[600px] max-h-[900px] flex-col justify-center bg-[#525252] h-full rounded-2xl p-6">
        <p className="font-inter text-lg font-bold ml-8 mt-6">
          Preview do documento
        </p>

        <div className="flex-1 flex self-center h-full w-full items-center justify-center">
          <div
            {...getRootProps()}
            className={`w-3/4 max-w-[500px] h-auto p-6 rounded-2xl flex flex-col gap-4 justify-center items-center bg-white text-[#2A2A2A] transition-all duration-300 cursor-pointer`}
          >
            <input {...getInputProps()} />

            {arquivo ? (
              <div className="flex flex-col items-center gap-2 text-center">
                <FileText size={40} className="text-blue-600" />
                <p className="font-bold text-lg">{arquivo.name}</p>
                <p className="text-sm text-gray-600">
                  {(arquivo.size / 1024).toFixed(2)} KB
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setArquivo(null);
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Remover
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 text-center">
                <Download size={40} />
                <p className="font-bold text-xl">
                  {isDragActive
                    ? 'Solte o arquivo aqui!'
                    : 'Faça upload de um docx'}
                </p>
                <p className="text-md">
                  Arraste e solte ou clique para selecionar
                </p>
              </div>
            )}

            {fileRejections.length > 0 && (
              <p className="text-red-500 text-sm mt-2">
                Arquivo inválido! Por favor, envie apenas arquivos .docx.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
