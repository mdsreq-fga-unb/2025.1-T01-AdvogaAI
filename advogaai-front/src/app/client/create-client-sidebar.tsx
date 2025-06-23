'use client';

import type React from 'react';
import { useState } from 'react';
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
import { X, Plus, Link } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Type Definitions (Moved from external service file to resolve import error) ---

export enum EstadoCivil {
  SOLTEIRO = 'SOLTEIRO',
  CASADO = 'CASADO',
  DIVORCIADO = 'DIVORCIADO',
  VIUVO = 'VIUVO',
  UNIAO_ESTAVEL = 'UNIAO_ESTAVEL',
}

export interface CreateAddressDto {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface CreatePessoaFisicaDto {
  nomeCompleto: string;
  cpf: string;
  rg: string;
  ctps: string;
  nacionalidade: string;
  email: string;
  telefone: string;
  estadoCivil: EstadoCivil;
  profissao: string;
  endereco: CreateAddressDto;
}

export interface CreatePessoaFisica {
  pessoaFisica: CreatePessoaFisicaDto;
}

// --- Component ---

interface CreateClientSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateClient: (client: CreatePessoaFisicaDto) => void;
}

const formatPhone = (value: string) => {
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length <= 10) {
    return cleanValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    return cleanValue
      .slice(0, 11)
      .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
};

const initialFormData: CreatePessoaFisicaDto = {
  nomeCompleto: '',
  cpf: '',
  rg: '',
  ctps: '',
  nacionalidade: '',
  email: '',
  telefone: '',
  estadoCivil: EstadoCivil.SOLTEIRO,
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
};

export function CreateClientSidebar({
  isOpen,
  onClose,
  onCreateClient,
}: CreateClientSidebarProps) {
  const [formData, setFormData] =
    useState<CreatePessoaFisicaDto>(initialFormData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Omit<CreatePessoaFisicaDto, 'endereco'>,
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof CreatePessoaFisicaDto['endereco'],
  ) => {
    setFormData({
      ...formData,
      endereco: { ...formData.endereco, [field]: e.target.value },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nomeCompleto || !formData.cpf || !formData.email) {
      console.error('Validation failed: Required fields are missing.');
      return;
    }
    onCreateClient(formData);
    setFormData(initialFormData);
    onClose();
  };

  const handleGenerateLink = () => {
    console.log('Gerar link de cadastro');
  };

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
              className="text-slate-400 hover:text-white hover:bg-slate-700"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </Button>
          </header>

          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* --- Personal Info --- */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nomeCompleto" className="text-white">
                    Nome Completo
                  </Label>
                  <Input
                    id="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={(e) => handleInputChange(e, 'nomeCompleto')}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                    placeholder="Digite o nome completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf" className="text-white">
                    CPF
                  </Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cpf: e.target.value,
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                    placeholder="000.000.000-00"
                    maxLength={11}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rg" className="text-white">
                      RG
                    </Label>
                    <Input
                      id="rg"
                      value={formData.rg}
                      onChange={(e) => handleInputChange(e, 'rg')}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ctps" className="text-white">
                      CTPS
                    </Label>
                    <Input
                      id="ctps"
                      value={formData.ctps}
                      onChange={(e) => handleInputChange(e, 'ctps')}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nacionalidade" className="text-white">
                    Nacionalidade
                  </Label>
                  <Input
                    id="nacionalidade"
                    value={formData.nacionalidade}
                    onChange={(e) => handleInputChange(e, 'nacionalidade')}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e, 'email')}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-white">
                    Telefone
                  </Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        telefone: formatPhone(e.target.value),
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profissao" className="text-white">
                    Profissão
                  </Label>
                  <Input
                    id="profissao"
                    value={formData.profissao}
                    onChange={(e) => handleInputChange(e, 'profissao')}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estadoCivil" className="text-white">
                    Estado Civil
                  </Label>
                  <Select
                    value={formData.estadoCivil}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        estadoCivil: value as EstadoCivil,
                      })
                    }
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Selecione o estado civil" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600 text-white">
                      {Object.values(EstadoCivil).map((status) => (
                        <SelectItem
                          key={status}
                          value={status}
                          className="capitalize text-white hover:bg-slate-600"
                        >
                          {status.replace(/_/g, ' ').toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* --- Address Info --- */}
              <div className="pt-6 border-t border-slate-700 space-y-4">
                <h3 className="text-lg font-medium text-white">Endereço</h3>
                <div className="space-y-2">
                  <Label htmlFor="cep" className="text-white">
                    CEP
                  </Label>
                  <Input
                    id="cep"
                    value={formData.endereco.cep}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endereco: {
                          ...formData.endereco,
                          cep: e.target.value,
                        },
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                    maxLength={9}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logradouro" className="text-white">
                    Logradouro
                  </Label>
                  <Input
                    id="logradouro"
                    value={formData.endereco.logradouro}
                    onChange={(e) => handleAddressChange(e, 'logradouro')}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 space-y-2">
                    <Label htmlFor="numero" className="text-white">
                      Número
                    </Label>
                    <Input
                      id="numero"
                      value={formData.endereco.numero}
                      onChange={(e) => handleAddressChange(e, 'numero')}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="complemento" className="text-white">
                      Complemento
                    </Label>
                    <Input
                      id="complemento"
                      value={formData.endereco.complemento || ''}
                      onChange={(e) => handleAddressChange(e, 'complemento')}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bairro" className="text-white">
                    Bairro
                  </Label>
                  <Input
                    id="bairro"
                    value={formData.endereco.bairro}
                    onChange={(e) => handleAddressChange(e, 'bairro')}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cidade" className="text-white">
                      Cidade
                    </Label>
                    <Input
                      id="cidade"
                      value={formData.endereco.cidade}
                      onChange={(e) => handleAddressChange(e, 'cidade')}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado" className="text-white">
                      Estado
                    </Label>
                    <Input
                      id="estado"
                      value={formData.endereco.estado}
                      onChange={(e) => handleAddressChange(e, 'estado')}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* --- Actions --- */}
              <div className="space-y-3 pt-4">
                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-medium"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Cliente
                </Button>
              </div>

              <div className="pt-6 border-t border-slate-700">
                <div className="space-y-3">
                  <h3 className="text-white font-medium">
                    Gerar link do cadastro
                  </h3>
                  <p className="text-sm text-slate-400">
                    Gere um link para ser preenchido pelo cliente.
                  </p>
                  <Input
                    readOnly
                    value="Clique no botão para gerar um link"
                    className="bg-slate-700 border-slate-600 text-slate-400"
                  />
                  <Button
                    type="button"
                    onClick={handleGenerateLink}
                    variant="outline"
                    className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    <Link className="h-4 w-4 mr-2" />
                    Gerar Link
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
