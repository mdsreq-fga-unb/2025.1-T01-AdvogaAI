'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
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
import toast from 'react-hot-toast';

// =================================================================
// DEFINIÇÕES DE TIPO CORRIGIDAS E UNIFICADAS
// =================================================================

export enum EstadoCivil {
  SOLTEIRO = 'SOLTEIRO',
  CASADO = 'CASADO',
  DIVORCIADO = 'DIVORCIADO',
  VIUVO = 'VIUVO',
  UNIAO_ESTAVEL = 'UNIAO_ESTAVEL',
}

// Representa um endereço completo, como vem do backend (com ID)
export interface Endereco {
  id: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

// Representa um cliente completo, como vem do backend (com ID)
export interface PessoaFisica {
  id: string;
  nomeCompleto: string;
  cpf: string;
  rg: string;
  ctps: string;
  nacionalidade: string;
  email: string;
  telefone: string;
  estadoCivil: EstadoCivil;
  profissao: string;
  endereco: Endereco;
}

// DTO para a submissão do formulário de EDIÇÃO (campos opcionais)
export interface UpdatePessoaFisicaDto {
  nomeCompleto?: string;
  cpf?: string;
  rg?: string;
  ctps?: string;
  nacionalidade?: string;
  email?: string;
  telefone?: string;
  estadoCivil?: EstadoCivil;
  profissao?: string;
  endereco?: {
    id: string; // ID do endereço é obrigatório na atualização
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
  };
}

// --- Props do Componente ---
interface EditClientSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateClient: (clientId: string, clientData: UpdatePessoaFisicaDto) => void;
  clientToEdit: PessoaFisica | null;
}

// --- Função Utilitária ---
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

// --- Estado Inicial Vazio (com a estrutura correta de PessoaFisica) ---
const initialPessoaFisicaState: PessoaFisica = {
  id: '',
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
    id: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  },
};

export function EditClientSidebar({
  isOpen,
  onClose,
  onUpdateClient,
  clientToEdit,
}: Readonly<EditClientSidebarProps>) {
  const [formData, setFormData] = useState<PessoaFisica>(
    initialPessoaFisicaState,
  );

  useEffect(() => {
    if (clientToEdit && isOpen) {
      setFormData(clientToEdit);
    } else {
      setFormData(initialPessoaFisicaState);
    }
  }, [clientToEdit, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Omit<PessoaFisica, 'id' | 'endereco'>,
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Omit<Endereco, 'id'>,
  ) => {
    setFormData({
      ...formData,
      endereco: { ...formData.endereco, [field]: e.target.value },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientToEdit) {
      toast.error('Nenhum cliente selecionado para edição.');
      return;
    }

    if (!formData.nomeCompleto || !formData.cpf || !formData.email) {
      toast.error('Nome, CPF e Email são obrigatórios.');
      return;
    }

    const updatePayload: UpdatePessoaFisicaDto = {
      nomeCompleto: formData.nomeCompleto,
      cpf: formData.cpf,
      rg: formData.rg,
      ctps: formData.ctps,
      nacionalidade: formData.nacionalidade,
      email: formData.email,
      telefone: formData.telefone,
      estadoCivil: formData.estadoCivil,
      profissao: formData.profissao,
      endereco: {
        id: formData.endereco.id,
        cep: formData.endereco.cep,
        logradouro: formData.endereco.logradouro,
        numero: formData.endereco.numero,
        complemento: formData.endereco.complemento,
        bairro: formData.endereco.bairro,
        cidade: formData.endereco.cidade,
        estado: formData.endereco.estado,
      },
    };

    onUpdateClient(clientToEdit.id, updatePayload);
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
                    className="bg-slate-700 border-slate-600 text-white"
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
                    onChange={(e) => handleInputChange(e, 'cpf')}
                    className="bg-slate-700 border-slate-600 text-white"
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
                    onChange={(e) => handleAddressChange(e, 'cep')}
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
                      value={formData.endereco.complemento ?? ''}
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
                      maxLength={2}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* --- Actions --- */}
              <div className="space-y-3 pt-4">
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-medium"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
