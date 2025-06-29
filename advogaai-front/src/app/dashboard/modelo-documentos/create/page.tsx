'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Parameter, ParameterInput } from './componentes/parameterInput';
import { DocxPreviewer } from './componentes/docxPreviewer';
import * as mammoth from 'mammoth';

export default function CreateDocModelPage() {
  const router = useRouter();
  const [nome, setNome] = useState<string>('');
  const [tipo, setTipo] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [parametros, setParametros] = useState<Parameter[]>([]);

  function extractTagsFromText(text: string): string[] {
    const regex = /{{\s*([^}]+?)\s*}}/g;
    const matches = text.match(regex) || [];

    const uniqueKeys = new Set(
      matches.map((tag) => tag.replace(/{{|}}/g, '').trim()),
    );

    return Array.from(uniqueKeys);
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      const file = acceptedFiles[0];
      setArquivo(file);
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;

        if (arrayBuffer) {
          try {
            const result = await mammoth.extractRawText({ arrayBuffer });

            const foundTags = extractTagsFromText(result.value);

            const autoDetectedParams: Parameter[] = foundTags.map(
              (tagText, index) => ({
                id: index,
                chave: `{{${tagText}}}`,
                nome:
                  tagText.charAt(0).toUpperCase() +
                  tagText.slice(1).replace(/_/g, ' '),
                color: 'blue',
              }),
            );

            setParametros(autoDetectedParams);
          } catch (error) {
            console.error('Erro ao processar o arquivo .docx:', error);
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          ['.docx'],
      },
      maxFiles: 1,
    });

  return (
    <div className="w-full h-full grid md:grid-cols-2 grid-cols-1 items-center place-items-center justify-center text-white">
      <div className="flex h-full max-w-[600px] max-h-[900px] w-full flex-col items-center justify-center gap-4 md:pb-0 pb-4 md:px-4">
        <div className="flex w-full flex-col gap-8">
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
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="tipo" className="font-bold">
              Descrição do Modelo de Documento
            </Label>
            <Input
              type="text"
              id="descricao"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="bg-white text-white"
            />
          </div>

          <ParameterInput parametros={parametros} />
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
            onClick={() =>
              console.log({ nome: nome, descricao: descricao, tipo: tipo })
            }
            className="w-full cursor-pointer !py-6 font-satoshi text-md md:flex-1"
          >
            <Plus className=" h-4 w-4" />
            Criar modelo
          </Button>
        </div>
      </div>
      <div className="flex w-full max-w-[600px] max-h-[900px] flex-col justify-center bg-[#525252] h-full rounded-2xl p-6">
        {arquivo && (
          <div className="flex items-center justify-between">
            <p className="font-inter text-lg font-bold ml-0 mt-0">
              <p>Preview do documento</p>
            </p>
            <button
              onClick={() => {
                setArquivo(null);
                setParametros([]);
              }}
              className="cursor-pointer"
            >
              <X />
            </button>
          </div>
        )}

        <div className="flex-1 flex self-center h-full w-full items-center justify-center">
          <div
            {...getRootProps()}
            className={`w-full ${arquivo ? 'max-h-[550px] h-full' : 'max-w-[500px] cursor-pointer h-auto'} p-6 rounded-2xl flex flex-col gap-4 justify-center items-center bg-white text-[#2A2A2A] transition-all duration-300 `}
          >
            {arquivo ? (
              <DocxPreviewer file={arquivo} />
            ) : (
              <div className="flex flex-col items-center gap-4 text-center">
                <input {...getInputProps()} />
                <p className="font-bold text-xl">
                  {isDragActive
                    ? 'Solte o arquivo aqui!'
                    : 'Faça upload de um docx'}
                </p>
                <p className="text-md">
                  Arraste e solte ou clique para selecionar
                </p>
                <Download size={40} />
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
