'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Parameter, ParameterInput } from './componentes/parameterInput';
import { DocxPreviewer } from './componentes/docxPreviewer';
import * as mammoth from 'mammoth';
import { useCreateModeloDocumento } from '@/modules/document-models/hooks/useCreateModeloDocumento';
import toast from 'react-hot-toast';
import { useGetSystemTags } from '@/modules/document-models/hooks/useGetSystemTags';
import { extractTagsFromText } from '@/app/utils/extractTagsFromText';

export default function CreateDocModelPage() {
  const router = useRouter();
  const [nome, setNome] = useState<string>('');
  const [tipo, setTipo] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [tags, setTags] = useState<Parameter[]>([]);
  const [detectedTags, setDetectedTags] = useState<Parameter[]>([]);

  const { mutate: createModel, isPending } = useCreateModeloDocumento({
    onSuccess: () => {
      router.push('/dashboard/modelo-documentos');
    },
  });

  const { data: systemTags = [], isLoading: isLoadingTags } =
    useGetSystemTags();

  function handleSubmit() {
    if (!nome) {
      toast.error('O nome do modelo é obrigatório.');
      return;
    }
    if (!tipo) {
      toast.error('O tipo do modelo é obrigatório.');
      return;
    }
    if (!arquivo) {
      toast.error('É necessário fazer o upload de um arquivo .docx.');
      return;
    }

    if (!tags || tags.length < 1) {
      toast.error(
        'É necessário fazer o upload de um arquivo .docx com parâmetros válidos.',
      );
      return;
    }

    const validSystemTagIds = tags
      .filter((tag) => tag.id !== -1)
      .map((tag) => tag.id);

    const formData = {
      nome,
      tipo_documento: tipo,
      descricao,
      documento: arquivo,
      tagsSistemaIds: validSystemTagIds,
    };
    createModel(formData);
  }

  useEffect(() => {
    if (detectedTags.length === 0) {
      setTags([]);
      return;
    }

    const unifiedTags: Parameter[] = detectedTags.map((detectedTag) => {
      const detectedKey = detectedTag.chave.replace(/{{|}}/g, '').trim();

      const systemTagMatch = systemTags.find(
        (systemTag) => systemTag.chave === detectedKey,
      );

      if (systemTagMatch) {
        return {
          id: systemTagMatch.id,
          chave: `{{${systemTagMatch.chave}}}`,
          nome: systemTagMatch.descricao,
          color: 'green',
        };
      } else {
        return {
          ...detectedTag,
          id: -1,
          color: 'red',
        };
      }
    });

    setTags(unifiedTags);
  }, [detectedTags, systemTags]);

  useEffect(() => {
    if (arquivo) {
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
            setDetectedTags(autoDetectedParams);
          } catch (error) {
            console.error('Erro ao processar o arquivo .docx:', error);
          }
        }
      };
      reader.readAsArrayBuffer(arquivo);
    }
  }, [arquivo]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      const file = acceptedFiles[0];
      setArquivo(file);
    }
  }, []);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
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

          <ParameterInput parametros={tags} isLoading={isLoadingTags} />
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
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full cursor-pointer !py-6 font-satoshi text-md md:flex-1"
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 rounded-full border-white border-t-transparent animate-spin"></div>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Criar modelo
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="flex w-full max-w-[600px] max-h-[900px] flex-col justify-center bg-[#525252] h-full rounded-2xl p-6">
        {!arquivo && <input {...getInputProps()} />}
        {arquivo && (
          <div className="flex items-center justify-between">
            <p className="font-inter text-lg font-bold ml-0 mt-0">
              <p>Preview do documento</p>
            </p>
            <button
              onClick={() => {
                setArquivo(null);
                setTags([]);
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
                <h1 className="text-lg font-bold">
                  Faça upload do seu documento em .docx
                </h1>
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
