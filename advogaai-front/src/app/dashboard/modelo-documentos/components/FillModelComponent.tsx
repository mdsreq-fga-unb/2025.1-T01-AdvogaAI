'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import { ModeloDocumento } from '@/modules/document-models/api/documentModelsSchema';
import toast from 'react-hot-toast';
import { downloadFile } from '@/services/documents/downloadFile.service';
import { PessoaFisica, useGetClients } from '@/modules/clients';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../../../../hooks/use-debounce';
import { DocxPreviewer } from '../create/componentes/docxPreviewer';
import PaginationComponent from '@/components/completePagination';
import { extractTagsFromText } from '@/app/utils/extractTagsFromText';
import mammoth from 'mammoth';
import { useGetSystemTags } from '@/modules/document-models/hooks/useGetSystemTags';
import { useGerarDocumento } from '@/modules/document-models/hooks/useGerarDocumento';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

interface FillModelComponentProps {
  modelToFill: ModeloDocumento | null;
  setIsFillingModel: (e: boolean) => void;
}

function saveFile(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

export function FillModelComponent({
  modelToFill,
  setIsFillingModel,
}: Readonly<FillModelComponentProps>) {
  const [page, setPage] = useState(1);
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [debouncedClientSearchTerm] = useDebounce(clientSearchTerm, 500);
  const [modelToFillBlob, setModelToFillBlob] = useState<Blob | null>(null);
  const [loadedModelTags, setLoadedModelTags] = useState<boolean>(false);
  const [clientToFillModel, setClientToFillModel] =
    useState<PessoaFisica | null>(null);
  const [manualTagValues, setManualTagValues] = useState<
    Array<{ chave: string; valor: string }>
  >([]);
  const [canGenerateDoc, setCanGenerateDoc] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const limit = 10;

  useEffect(() => {
    if (manualTagValues.length > 0) {
      const allValuesAreFilled = manualTagValues.every(
        (item) => item.valor && item.valor.trim() !== '',
      );

      setCanGenerateDoc(allValuesAreFilled);
    }
  }, [manualTagValues]);

  const { data: systemTags = [] } = useGetSystemTags();

  const { data: tags, isLoading: isLoadingTags } = useGerarDocumento(
    modelToFill?.id ?? '',
    clientToFillModel?.id ?? '',
  );

  const {
    data: responseClients,
    isLoading: isLoadingClients,
    isError,
    error,
  } = useGetClients({
    page,
    limit,
    search: debouncedClientSearchTerm ?? '',
  });

  useEffect(() => {
    void handleLoadDocumentToFill();
  }, [modelToFill]);

  async function handleLoadDocumentToFill() {
    if (modelToFill) {
      const file = await downloadFile(modelToFill.url);
      setModelToFillBlob(file.blob);
    }
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Erro ao carregar clientes: {error.message}
      </div>
    );
  }

  async function handleChooseClientDocument(client: PessoaFisica) {
    const modelArrayBuffer = await modelToFillBlob?.arrayBuffer();
    const modelContent = await mammoth.extractRawText({
      arrayBuffer: modelArrayBuffer ?? new ArrayBuffer(0),
    });
    const tags = extractTagsFromText(modelContent.value);
    const systemTagKeys = systemTags.map((tag) => tag.chave);
    const remainTags = tags.filter((tag) => !systemTagKeys.includes(tag));
    const initialManualValues = remainTags.map((tag) => ({
      chave: tag,
      valor: '',
    }));
    setClientToFillModel(client);
    setManualTagValues(initialManualValues);
    setLoadedModelTags(true);
  }

  function handleManualTagChange(chave: string, valor: string) {
    setManualTagValues((currentValues) =>
      currentValues.map((item) =>
        item.chave === chave ? { ...item, valor } : item,
      ),
    );
  }

  async function handleFillDocument() {
    setIsGenerating(true);
    try {
      if (!modelToFillBlob) {
        toast.error('O modelo de documento não foi carregado.');
        return;
      }

      const systemTagsArray = tags
        ? Object.entries(tags).map(([chave, valor]) => ({
            chave,
            valor,
          }))
        : [];

      const allTags = [...manualTagValues, ...systemTagsArray];
      const tagsObject = allTags.reduce(
        (obj, item) => {
          obj[item.chave] = item.valor;
          return obj;
        },
        {} as Record<string, string>,
      );
      const content = await modelToFillBlob.arrayBuffer();

      const zip = new PizZip(content);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: {
          start: '{{',
          end: '}}',
        },
      });

      doc.render(tagsObject);

      const outputBlob = doc.getZip().generate({
        type: 'blob',
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      const fileName = `${modelToFill?.tipo_documento}_${clientToFillModel?.nomeCompleto.replace(/ /g, '_') ?? 'doc_preenchido'}.docx`;
      saveFile(outputBlob, fileName);
      toast.success('Documento gerado e baixado com sucesso!');
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error('Ocorreu um erro inesperado.');
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="w-full h-full grid md:grid-cols-2 grid-cols-1 items-center place-items-center justify-center text-white">
      <div className="flex h-full max-w-[600px] max-h-[800px] w-full flex-col items-center  rounded-2xl justify-center gap-4 md:pb-0 pb-4 md:px-4">
        {!loadedModelTags && (
          <>
            <div className="w-full text-center gap-4 flex flex-col mb-10">
              <h1 className="text-alabaster-50 text-3xl font-satoshi font-bold">
                Selecione o cliente
              </h1>
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Pesquisar por nome, email ..."
                  value={clientSearchTerm}
                  onChange={(e) => setClientSearchTerm(e.target.value)}
                  className="pl-8 w-full bg-slate-700 border-slate-600 text-white"
                />
              </div>
              {!isLoadingClients &&
                (!responseClients || responseClients.data.length < 1) && (
                  <p>Nenhum cliente encontrado</p>
                )}
              {isLoadingClients && (
                <div className="flex justify-center p-16 z-50">
                  <div className="w-10 h-10 border-4 rounded-full border-slate-300 border-t-cyan-500 animate-spin"></div>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center items-center gap-4 w-full">
              {!isLoadingClients &&
                responseClients?.data.map((client) => (
                  <div
                    onClick={() => void handleChooseClientDocument(client)}
                    className="flex items-center justify-between w-full outline-1 p-5 rounded-lg cursor-pointer hover:bg-[#1D293D] transition-all duration-300"
                    key={client.cpf}
                  >
                    <div className="font-satoshi flex flex-col gap-1">
                      <p>{client.nomeCompleto}</p>
                      <p>{client.email}</p>
                    </div>
                    <ArrowRight />
                  </div>
                ))}
              <PaginationComponent
                currentPage={responseClients?.currentPage ?? 1}
                totalPages={responseClients?.totalPages ?? 1}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
        {!isLoadingTags && loadedModelTags && manualTagValues.length > 0 && (
          <div className="w-full text-left gap-4 flex flex-col mb-4">
            <h2 className="text-alabaster-50 text-xl font-satoshi font-bold mb-2">
              Preencha as informações restantes
            </h2>
            <div className="flex flex-col gap-4 max-h-64 overflow-y-auto pr-2">
              {manualTagValues.map((tag) => (
                <div key={tag.chave}>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    {tag.chave}
                  </label>
                  <Input
                    placeholder={`Insira o valor para ${tag.chave}...`}
                    value={tag.valor}
                    onChange={(e) =>
                      handleManualTagChange(tag.chave, e.target.value)
                    }
                    className="w-full bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {!isLoadingTags && !manualTagValues && (
          <div className="flex flex-col gap-4">
            <p className="text-center text-alabaster-50 text-xl font-satoshi font-bold">
              Seu documento está pronto para ser gerado! <br></br> Ao clicar no
              botão abaixo seu documento será exportado e salvo preenchido com
              os dados do usuario<br></br>{' '}
            </p>
            <p className="font-extrabold text-center text-xl text-alabaster-50">
              {clientToFillModel?.nomeCompleto}
              <br></br>
              {clientToFillModel?.email}
            </p>
          </div>
        )}

        {isLoadingTags && (
          <div className="flex justify-center p-16">
            <div className="w-10 h-10 border-4 rounded-full border-slate-300 border-t-cyan-500 animate-spin"></div>
          </div>
        )}

        <div className="mt-10 flex w-full max-w-[600px] flex-col items-center justify-center gap-4 md:flex-row">
          <Button
            onClick={() => {
              if (!loadedModelTags) {
                setIsFillingModel(false);
                setModelToFillBlob(null);
                setClientToFillModel(null);
              }
              setLoadedModelTags(false);
            }}
            className="w-full cursor-pointer border-1 border-white bg-[#0F172B] py-6 font-satoshi text-md text-white hover:bg-[#E5E5E5] hover:text-black md:flex-1"
          >
            Cancelar
          </Button>
          {loadedModelTags && (
            <Button
              onClick={() => void handleFillDocument()}
              disabled={!canGenerateDoc}
              className="w-full cursor-pointer border-1 text-black bg-[#E5E5E5] py-6 font-satoshi text-md hover:bg-[#525252] hover:text-white md:flex-1"
            >
              {isGenerating ? (
                <div className="flex justify-center p-16">
                  <div className="w-6 h-6 border-4 rounded-full border-slate-300 border-t-cyan-500 animate-spin"></div>
                </div>
              ) : (
                'Gerar documento'
              )}
            </Button>
          )}
        </div>
      </div>
      <div className="flex w-full max-w-[600px] max-h-[800px] flex-col justify-center bg-[#525252] h-full rounded-2xl p-6">
        <div className="flex-1 flex self-center h-full w-full items-center justify-center">
          <div
            className={`w-full ${modelToFillBlob ? 'max-h-[750px] h-full' : 'max-w-[500px] cursor-pointer h-auto'} p-6 rounded-2xl flex flex-col gap-4 justify-center items-center bg-white text-[#2A2A2A] transition-all duration-300 `}
          >
            <DocxPreviewer file={modelToFillBlob} />
          </div>
        </div>
      </div>
    </div>
  );
}
