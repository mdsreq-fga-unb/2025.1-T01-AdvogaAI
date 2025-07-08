/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import type React from 'react';
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
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { maskCPF, maskTelefone, maskCEP } from '@/lib/masks';
import { useEffect, useState } from 'react';
import {
  CreatePessoaFisicaDto,
  createPessoaFisicaSchema,
  EstadoCivil,
  useCreateClient,
} from '@/modules/clients';
import { Checkbox } from '@/components/ui/checkbox';

interface CreateClientSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateClientSidebar({
  isOpen,
  onClose,
}: Readonly<CreateClientSidebarProps>) {
  const [isPessoaFisica, setIsPessoaFisica] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreatePessoaFisicaDto>({
    resolver: zodResolver(createPessoaFisicaSchema),
    defaultValues: {
      nomeCompleto: '',
      cpf: '',
      rg: '',
      ctps: '',
      nacionalidade: '',
      email: '',
      telefone: '',
      estadoCivil: undefined,
      profissao: '',
      endereco: {
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
      },
    },
  });
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => reset(), 300);
    }
  }, [isOpen, reset]);
  const { mutate: createClient, isPending } = useCreateClient({
    onSuccess: () => {
      reset();
      onClose();
    },
  });
  const onSubmit = (data: CreatePessoaFisicaDto) => {
    try {
      createClient(data);
      reset();
    } catch (error) {
      console.error('Falha ao criar cliente:', error);
    }
  };
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('ERROS DE VALIDAÇÃO ENCONTRADOS:', errors);
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
          <header className="flex flex-col gap-6 items-center justify-between p-6 border-b border-slate-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Adicionar Cliente
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Preencha as informações para adicionar um novo cliente.
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
            </div>
            <div className="flex justify-between items-center w-full gap-3">
              <div className="flex gap-2">
                <Checkbox
                  onCheckedChange={(e) =>
                    setIsPessoaFisica(e.valueOf() as boolean)
                  }
                  checked={isPessoaFisica}
                  className="cursor-pointer"
                  id="fisica"
                  defaultChecked
                />
                <Label className="cursor-pointer" htmlFor="fisica">
                  Pessoa fisica
                </Label>
              </div>
              <div className="flex gap-2">
                <Checkbox
                  checked={!isPessoaFisica}
                  onCheckedChange={() => setIsPessoaFisica(!isPessoaFisica)}
                  className="cursor-pointer"
                  id="juridica"
                />
                <Label className="cursor-pointer" htmlFor="juridica">
                  Pessoa juridica
                </Label>
              </div>
            </div>
          </header>

          {isPessoaFisica && (
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
                    <Label htmlFor="nomeCompleto" className="text-white">
                      Nome Completo
                    </Label>
                    <Input
                      id="nomeCompleto"
                      {...register('nomeCompleto')}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                    />
                    {errors.nomeCompleto && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.nomeCompleto.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                      placeholder="email@exemplo.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="cpf" className="text-white">
                      CPF
                    </Label>
                    <Controller
                      name="cpf"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="cpf"
                          placeholder="000.000.000-00"
                          value={maskCPF(field.value)}
                          onChange={(e) => {
                            const unmaskedValue = e.target.value.replace(
                              /\D/g,
                              '',
                            );
                            field.onChange(unmaskedValue);
                          }}
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
                      <Label htmlFor="rg" className="text-white">
                        RG
                      </Label>
                      <Input
                        id="rg"
                        {...register('rg')}
                        className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                      />
                      {errors.rg && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.rg.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="ctps" className="text-white">
                        CTPS
                      </Label>
                      <Input
                        id="ctps"
                        {...register('ctps')}
                        className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                      />
                      {errors.ctps && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.ctps.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="telefone" className="text-white">
                      Telefone
                    </Label>
                    <Controller
                      name="telefone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="telefone"
                          placeholder="(00) 00000-0000"
                          value={maskTelefone(field.value)}
                          onChange={(e) => {
                            const unmaskedValue = e.target.value.replace(
                              /\D/g,
                              '',
                            );
                            field.onChange(unmaskedValue);
                          }}
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
                  <div className="space-y-1">
                    <Label htmlFor="nacionalidade" className="text-white">
                      Nacionalidade
                    </Label>
                    <Input
                      id="nacionalidade"
                      {...register('nacionalidade')}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                    />
                    {errors.nacionalidade && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.nacionalidade.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="profissao" className="text-white">
                      Profissão
                    </Label>
                    <Input
                      id="profissao"
                      {...register('profissao')}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                    />
                    {errors.profissao && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.profissao.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="estadoCivil" className="text-white">
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
                          <SelectTrigger className="capitalize cursor-pointer text-white">
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600 text-white placeholder-slate-400">
                            {Object.values(EstadoCivil).map((s) => (
                              <SelectItem
                                key={s}
                                value={s}
                                className="capitalize cursor-pointer "
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
                <div className="pt-6 border-t border-slate-700 space-y-4">
                  <h3 className="text-lg font-medium text-white">Endereço</h3>
                  <div className="space-y-1">
                    <Label htmlFor="cep" className="text-white">
                      CEP
                    </Label>
                    <Controller
                      name="endereco.cep"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="cep"
                          placeholder="00000-000"
                          value={maskCEP(field.value)}
                          onChange={(e) => {
                            const unmaskedValue = e.target.value.replace(
                              /\D/g,
                              '',
                            );
                            field.onChange(unmaskedValue);
                          }}
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
                    <Label htmlFor="logradouro" className="text-white">
                      Logradouro
                    </Label>
                    <Input
                      id="logradouro"
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
                      <Label htmlFor="numero" className="text-white">
                        Número
                      </Label>
                      <Input
                        id="numero"
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
                      <Label htmlFor="complemento" className="text-white">
                        Complemento
                      </Label>
                      <Input
                        id="complemento"
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
                    <Label htmlFor="bairro" className="text-white">
                      Bairro
                    </Label>
                    <Input
                      id="bairro"
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
                      <Label htmlFor="cidade" className="text-white">
                        Cidade
                      </Label>
                      <Input
                        id="cidade"
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
                      <Label htmlFor="estado" className="text-white">
                        Estado
                      </Label>
                      <Input
                        id="estado"
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

                <div className="space-y-3 pt-4">
                  <Button type="submit" className="w-full ...">
                    <Button
                      type="submit"
                      className="w-full cursor-pointer ..."
                      disabled={isPending}
                    >
                      {isPending ? 'Salvando...' : 'Adicionar Cliente'}
                    </Button>
                  </Button>
                </div>
              </form>
            </div>
          )}

          {!isPessoaFisica && (
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
                    <Label htmlFor="nomeCompleto" className="text-white">
                      Razão Social
                    </Label>
                    <Input
                      id="nomeCompleto"
                      {...register('nomeCompleto')}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                    />
                    {errors.nomeCompleto && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.nomeCompleto.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="nomeCompleto" className="text-white">
                      Nome Fantasia
                    </Label>
                    <Input
                      id="nomeCompleto"
                      {...register('nomeCompleto')}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                    />
                    {errors.nomeCompleto && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.nomeCompleto.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="nomeCompleto" className="text-white">
                      Tipo da empresa
                    </Label>
                    <Input
                      id="nomeCompleto"
                      {...register('nomeCompleto')}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                    />
                    {errors.nomeCompleto && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.nomeCompleto.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="nomeCompleto" className="text-white">
                      Reperesentante Legal
                    </Label>
                    <Input
                      placeholder="Nome ou email do representante legal"
                      id="nomeCompleto"
                      {...register('nomeCompleto')}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                    />
                    {errors.nomeCompleto && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.nomeCompleto.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                      placeholder="email@exemplo.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="cpf" className="text-white">
                      CNPJ
                    </Label>
                    <Controller
                      name="cpf"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="cpf"
                          placeholder="00.000.000/0000-00"
                          value={maskCPF(field.value)}
                          onChange={(e) => {
                            const unmaskedValue = e.target.value.replace(
                              /\D/g,
                              '',
                            );
                            field.onChange(unmaskedValue);
                          }}
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
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="telefone" className="text-white">
                      Telefone
                    </Label>
                    <Controller
                      name="telefone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="telefone"
                          placeholder="(00) 00000-0000"
                          value={maskTelefone(field.value)}
                          onChange={(e) => {
                            const unmaskedValue = e.target.value.replace(
                              /\D/g,
                              '',
                            );
                            field.onChange(unmaskedValue);
                          }}
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
                <div className="pt-6 border-t border-slate-700 space-y-4">
                  <h3 className="text-lg font-medium text-white">Endereço</h3>
                  <div className="space-y-1">
                    <Label htmlFor="cep" className="text-white">
                      CEP
                    </Label>
                    <Controller
                      name="endereco.cep"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="cep"
                          placeholder="00000-000"
                          value={maskCEP(field.value)}
                          onChange={(e) => {
                            const unmaskedValue = e.target.value.replace(
                              /\D/g,
                              '',
                            );
                            field.onChange(unmaskedValue);
                          }}
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
                    <Label htmlFor="logradouro" className="text-white">
                      Logradouro
                    </Label>
                    <Input
                      id="logradouro"
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
                      <Label htmlFor="numero" className="text-white">
                        Número
                      </Label>
                      <Input
                        id="numero"
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
                      <Label htmlFor="complemento" className="text-white">
                        Complemento
                      </Label>
                      <Input
                        id="complemento"
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
                    <Label htmlFor="bairro" className="text-white">
                      Bairro
                    </Label>
                    <Input
                      id="bairro"
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
                      <Label htmlFor="cidade" className="text-white">
                        Cidade
                      </Label>
                      <Input
                        id="cidade"
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
                      <Label htmlFor="estado" className="text-white">
                        Estado
                      </Label>
                      <Input
                        id="estado"
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

                <div className="space-y-3 pt-4">
                  <Button type="submit" className="w-full ...">
                    <Button
                      type="submit"
                      className="w-full cursor-pointer ..."
                      disabled={isPending}
                    >
                      {isPending ? 'Salvando...' : 'Adicionar Cliente'}
                    </Button>
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
