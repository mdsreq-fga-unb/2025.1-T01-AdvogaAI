/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { maskCPF, maskTelefone, maskCEP } from '@/lib/masks';
import {
  EstadoCivil,
  PessoaFisica,
  UpdatePessoaFisicaDto,
  updatePessoaFisicaSchema,
} from '@/modules/clients';

interface EditClientSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateClient: (clientId: string, clientData: UpdatePessoaFisicaDto) => void;
  clientToEdit: PessoaFisica | null;
}

export function EditClientSidebar({
  isOpen,
  onClose,
  onUpdateClient,
  clientToEdit,
}: Readonly<EditClientSidebarProps>) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdatePessoaFisicaDto>({
    resolver: zodResolver(updatePessoaFisicaSchema),
  });

  useEffect(() => {
    if (clientToEdit && isOpen) {
      // Map clientToEdit to UpdatePessoaFisicaDto shape and handle nulls
      const {
        nomeCompleto,
        cpf,
        rg,
        ctps,
        nacionalidade,
        email,
        telefone,
        estadoCivil,
        profissao,
        endereco,
      } = clientToEdit;

      reset({
        nomeCompleto,
        cpf: cpf ?? '',
        rg: rg ?? '',
        ctps: ctps ?? '',
        nacionalidade,
        email,
        telefone,
        estadoCivil,
        profissao,
        endereco: endereco
          ? {
              ...endereco,
              complemento:
                endereco.complemento === null
                  ? undefined
                  : endereco.complemento,
            }
          : undefined,
      });
    }
  }, [clientToEdit, isOpen, reset]);

  const onSubmit = (data: UpdatePessoaFisicaDto) => {
    if (!clientToEdit) return;

    try {
      onUpdateClient(clientToEdit.id, data);
      onClose();
    } catch (error) {
      console.error('Falha ao atualizar cliente:', error);
    }
  };
  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      console.log('ERROS DE VALIDAÇÃO (EDIÇÃO):', errors);
    }
  }, [errors]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={cn(
          'fixed top-0 right-0 h-full w-96 bg-slate-800 border-l border-slate-700 z-50 transform transition-transform duration-300 ease-in-out flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between p-6 border-b border-slate-700">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Editar Cliente
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Altere as informações do cliente abaixo.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-400 cursor-pointer hover:text-white hover:bg-slate-700"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </Button>
          </header>

          <div
            className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-white
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-500"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="edit-nomeCompleto" className="text-white">
                    Nome Completo
                  </Label>
                  <Input
                    id="edit-nomeCompleto"
                    {...register('nomeCompleto')}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  {errors.nomeCompleto && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.nomeCompleto.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="edit-email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    {...register('email')}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="edit-telefone" className="text-white">
                    Telefone
                  </Label>
                  <Controller
                    name="telefone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="edit-telefone"
                        value={maskTelefone(field.value || '')}
                        onChange={(e) =>
                          field.onChange(e.target.value.replace(/\D/g, ''))
                        }
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    )}
                  />
                  {errors.telefone && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.telefone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* --- DOCUMENTOS --- */}
              <div className="pt-4 border-t border-slate-700 space-y-4">
                <h3 className="text-lg font-medium text-white">Documentos</h3>
                <div className="space-y-1">
                  <Label htmlFor="edit-cpf" className="text-white">
                    CPF
                  </Label>
                  <Controller
                    name="cpf"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="edit-cpf"
                        value={maskCPF(field.value || '')}
                        onChange={(e) =>
                          field.onChange(e.target.value.replace(/\D/g, ''))
                        }
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    )}
                  />
                  {errors.cpf && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.cpf.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="edit-rg" className="text-white">
                      RG
                    </Label>
                    <Input
                      id="edit-rg"
                      {...register('rg')}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                    {errors.rg && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.rg.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="edit-ctps" className="text-white">
                      CTPS
                    </Label>
                    <Input
                      id="edit-ctps"
                      {...register('ctps')}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                    {errors.ctps && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.ctps.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* --- INFORMAÇÕES ADICIONAIS --- */}
              <div className="pt-4 border-t border-slate-700 space-y-4">
                <h3 className="text-lg font-medium text-white">
                  Informações Adicionais
                </h3>
                <div className="space-y-1">
                  <Label htmlFor="edit-nacionalidade" className="text-white">
                    Nacionalidade
                  </Label>
                  <Input
                    id="edit-nacionalidade"
                    {...register('nacionalidade')}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  {errors.nacionalidade && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.nacionalidade.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="edit-profissao" className="text-white">
                    Profissão
                  </Label>
                  <Input
                    id="edit-profissao"
                    {...register('profissao')}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  {errors.profissao && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.profissao.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="edit-estadoCivil" className="text-white">
                    Estado Civil
                  </Label>
                  <Controller
                    name="estadoCivil"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                          {Object.values(EstadoCivil).map((s) => (
                            <SelectItem
                              key={s}
                              value={s}
                              className="capitalize cursor-pointer hover:bg-slate-700"
                            >
                              {s.replace(/_/g, ' ').toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.estadoCivil && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.estadoCivil.message}
                    </p>
                  )}
                </div>
              </div>

              {/* --- ENDEREÇO --- */}
              <div className="pt-4 border-t border-slate-700 space-y-4">
                <h3 className="text-lg font-medium text-white">Endereço</h3>
                <div className="space-y-1">
                  <Label htmlFor="edit-cep" className="text-white">
                    CEP
                  </Label>
                  <Controller
                    name="endereco.cep"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="edit-cep"
                        placeholder="00000-000"
                        value={maskCEP(field.value || '')}
                        onChange={(e) =>
                          field.onChange(e.target.value.replace(/\D/g, ''))
                        }
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    )}
                  />
                  {errors.endereco?.cep && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.endereco.cep.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="edit-logradouro" className="text-white">
                    Logradouro
                  </Label>
                  <Input
                    id="edit-logradouro"
                    {...register('endereco.logradouro')}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  {errors.endereco?.logradouro && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.endereco.logradouro.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 space-y-1">
                    <Label htmlFor="edit-numero" className="text-white">
                      Número
                    </Label>
                    <Input
                      id="edit-numero"
                      {...register('endereco.numero')}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                    {errors.endereco?.numero && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.endereco.numero.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2 space-y-1">
                    <Label htmlFor="edit-complemento" className="text-white">
                      Complemento
                    </Label>
                    <Input
                      id="edit-complemento"
                      {...register('endereco.complemento')}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                    {errors.endereco?.complemento && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.endereco.complemento.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="edit-bairro" className="text-white">
                    Bairro
                  </Label>
                  <Input
                    id="edit-bairro"
                    {...register('endereco.bairro')}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  {errors.endereco?.bairro && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.endereco.bairro.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-1">
                    <Label htmlFor="edit-cidade" className="text-white">
                      Cidade
                    </Label>
                    <Input
                      id="edit-cidade"
                      {...register('endereco.cidade')}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                    {errors.endereco?.cidade && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.endereco.cidade.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1 space-y-1">
                    <Label htmlFor="edit-estado" className="text-white">
                      Estado
                    </Label>
                    <Input
                      id="edit-estado"
                      {...register('endereco.estado')}
                      maxLength={2}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                    {errors.endereco?.estado && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.endereco.estado.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* --- AÇÕES --- */}
              <div className="pt-6 border-t border-slate-700">
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Salvando...'
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" /> Salvar Alterações
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
