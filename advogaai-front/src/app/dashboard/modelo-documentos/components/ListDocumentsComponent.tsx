'use client';

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
import {
  Search,
  Edit,
  Trash2,
  UserPlus,
  Download,
  Plus,
  Eye,
} from 'lucide-react';
import CompletePagination from '@/components/completePagination';
import { Label } from '@/components/ui/label';
import { ModeloDocumento } from '@/modules/document-models/api/documentModelsSchema';
import { downloadFile } from '@/services/documents/downloadFile.service';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useDeleteModeloDocumento } from '@/modules/document-models/hooks/useDeleteModeloDocumento';
import { useUpdateModeloDocumento } from '@/modules/document-models/hooks/useUpdateModeloDocumento';
import { useGetModelosDocumento } from '@/modules/document-models/hooks/useGetModelosDocumento';
import { useDebounce } from '../../../../../hooks/use-debounce';
import { useRouter } from 'next/navigation';
import { useGetSystemTags } from '@/modules/document-models/hooks/useGetSystemTags';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
interface ListDocumentsProps {
  setModelToFill: (model: ModeloDocumento) => void;
  setIsFillingModel: (e: boolean) => void;
}

export function ListDocuments({
  setModelToFill,
  setIsFillingModel,
}: Readonly<ListDocumentsProps>) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [nomeEdit, setNomeEdit] = useState<string>('');
  const [tipoEdit, setTipoEdit] = useState<string>('');
  const [descEdit, setDescEdit] = useState<string>('');
  const [modelToEdit, setModelToEdit] = useState<ModeloDocumento | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [tagsSheetOpen, setTagsSheetOpen] = useState(false);
  const { data: tags } = useGetSystemTags();

  function handleNewModel() {
    router.push('modelo-documentos/create');
  }

  const itemsPerPage = 10;
  const {
    data: response,
    isLoading,
    error,
    isError,
  } = useGetModelosDocumento(
    itemsPerPage,
    (page - 1) * itemsPerPage,
    debouncedSearchTerm,
  );

  const { mutate: deleteModel, isPending: isDeleting } =
    useDeleteModeloDocumento();

  const { mutate: updateModel, isPending: isEditing } =
    useUpdateModeloDocumento();

  const docModels = response?.data ?? [];
  const totalPages = response?.totalPages ?? 1;
  const currentPage = response?.currentPage ?? 1;

  useEffect(() => {
    if (modelToEdit) {
      setNomeEdit(modelToEdit.nome);
      setTipoEdit(modelToEdit.tipo_documento);
      setDescEdit(modelToEdit.descricao ?? '');
    }
  }, [modelToEdit]);

  if (isError) {
    return (
      <div className="text-red-500">
        Falha ao carregar os dados: {error?.message}
      </div>
    );
  }

  async function handleDownload(model: ModeloDocumento) {
    setDownloadingId(model.id);
    const promise = downloadFile(model.url);

    await toast
      .promise(promise, {
        loading: 'Preparando download...',
        success: (data) => {
          const url = window.URL.createObjectURL(data.blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${model.nome}`);

          document.body.appendChild(link);
          link.click();

          link.parentNode?.removeChild(link);
          window.URL.revokeObjectURL(url);

          return 'Download feito com sucesso!';
        },
        error: () => 'Ocorreu um erro ao fazer o download.',
      })
      .finally(() => {
        setDownloadingId(null);
      });
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Pesquisar por nome, tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full bg-slate-700 border-slate-600 text-white"
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleNewModel()}
            className="gap-2 bg-cyan-500 cursor-pointer hover:bg-cyan-600 text-slate-900 font-medium"
          >
            <UserPlus className="h-4 w-4" />
            Novo Modelo
          </Button>
          <Sheet open={tagsSheetOpen} onOpenChange={setTagsSheetOpen}>
            <SheetTrigger asChild>
              <Button className="gap-2 bg-slate-500 cursor-pointer hover:bg-slate-600 text-white font-medium">
                <Eye className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="fixed top-0 right-0 h-full w-96 bg-slate-800 border-l border-slate-700 z-50 transform transition-transform duration-300 ease-in-out flex flex-col">
              <SheetHeader>
                <SheetTitle>Tags de Sistema</SheetTitle>
              </SheetHeader>

              {isLoading ? (
                <div className="flex justify-center p-16">
                  <div className="w-10 h-10 border-4 rounded-full border-slate-300 border-t-cyan-500 animate-spin"></div>
                </div>
              ) : (
                <ul className="space-y-4 p-4">
                  {tags?.map((tag) => (
                    <li key={tag.id} className="text-white">
                      <div className="flex flex-col justify-between">
                        <span className="text-slate-300">{tag.descricao}</span>
                        <span className="text-slate-500">
                          {`{{ ${tag.chave} }}`}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <SheetFooter></SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Modelos de Documentos</CardTitle>
          <CardDescription className="text-slate-400">
            Visualize e gerencie todos os seus modelos de documento cadastrados
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
                  <TableHead className="text-slate-300">#</TableHead>
                  <TableHead className="text-slate-300">Nome</TableHead>
                  <TableHead className="text-slate-300">Descrição</TableHead>
                  <TableHead className="text-slate-300">Tipo</TableHead>
                  <TableHead className="text-right text-slate-300">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {docModels.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-slate-400"
                    >
                      Nenhum modelo de documento encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  docModels.map((model, index) => (
                    <TableRow
                      key={model.id}
                      className="border-slate-700 w-full"
                    >
                      <TableCell className="font-medium text-white">
                        {index + 1 + itemsPerPage * (page - 1)}
                      </TableCell>
                      <TableCell className="font-medium  text-white">
                        {model.nome}
                      </TableCell>
                      <TableCell className="font-medium  text-white">
                        {model.descricao}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {model.tipo_documento}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setModelToFill(model);
                              setIsFillingModel(true);
                            }}
                            className="text-slate-400 cursor-pointer hover:text-white"
                          >
                            <Plus className="!w-5 !h-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={downloadingId === model.id}
                            onClick={() => void handleDownload(model)}
                            className="text-slate-400 cursor-pointer hover:text-white"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setModelToEdit(model);
                                }}
                                className="text-slate-400 cursor-pointer hover:text-white"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-slate-800 border-slate-700">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">
                                  Editar dados do documento
                                </AlertDialogTitle>
                                <div className="text-white flex flex-col gap-4">
                                  <div className="grid w-full items-center gap-2">
                                    <Label htmlFor="tipo" className="font-bold">
                                      Nome do documento
                                    </Label>
                                    <Input
                                      type="text"
                                      id="nome"
                                      placeholder={
                                        modelToEdit ? modelToEdit.nome : `Nome`
                                      }
                                      value={nomeEdit}
                                      onChange={(e) =>
                                        setNomeEdit(e.target.value)
                                      }
                                      className="bg-black border-0 text-white"
                                    />
                                  </div>
                                  <div className="grid w-full items-center gap-2">
                                    <Label htmlFor="tipo" className="font-bold">
                                      Tipo do documento
                                    </Label>
                                    <Input
                                      type="text"
                                      id="tipo"
                                      placeholder={
                                        modelToEdit
                                          ? modelToEdit.tipo_documento
                                          : `Tipo`
                                      }
                                      value={tipoEdit}
                                      onChange={(e) =>
                                        setTipoEdit(e.target.value)
                                      }
                                      className="bg-black border-0 text-white"
                                    />
                                  </div>
                                  <div className="grid w-full items-center gap-2">
                                    <Label htmlFor="tipo" className="font-bold">
                                      Descrição do documento
                                    </Label>
                                    <Input
                                      type="text"
                                      id="desc"
                                      placeholder={
                                        modelToEdit
                                          ? modelToEdit.descricao
                                          : `Descrição`
                                      }
                                      value={descEdit}
                                      onChange={(e) =>
                                        setDescEdit(e.target.value)
                                      }
                                      className="bg-black border-0 text-white"
                                    />
                                  </div>
                                </div>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-slate-700 cursor-pointer text-slate-300 hover:bg-slate-600 hover:text-slate-300 border-slate-600">
                                  Cancelar
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    updateModel({
                                      id: modelToEdit?.id ?? '',
                                      data: {
                                        descricao: descEdit,
                                        nome: nomeEdit,
                                        tipo_documento: tipoEdit,
                                      },
                                    })
                                  }
                                  className="bg-alabaster-100 hover:bg-alabaster-300 cursor-pointer text-black"
                                >
                                  {isEditing ? 'Salvando...' : 'Salvar'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={isDeleting}
                                className="text-slate-400 cursor-pointer hover:text-red-500"
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
                                  Tem certeza que deseja excluir o modelo de
                                  documento {model.nome}? Esta ação não pode ser
                                  desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-slate-700 cursor-pointer text-slate-300 hover:bg-slate-600 border-slate-600">
                                  Cancelar
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteModel(model.id)}
                                  className="bg-red-600 cursor-pointer hover:bg-red-700 text-white"
                                >
                                  {isDeleting ? 'Excluindo...' : 'Excluir'}
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
          )}
        </CardContent>
        {!isLoading && totalPages > 1 && (
          <CardFooter className="flex justify-end pt-6">
            <CompletePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </CardFooter>
        )}
      </Card>
    </>
  );
}
