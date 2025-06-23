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
import type { Client } from '@/app/client/clientList/page';

interface CreateClientSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateClient: (client: {
    nomeCompleto: string;
    documento: string;
    telefone: string;
    email: string;
    estadoCivil:
      | 'SOLTEIRO'
      | 'CASADO'
      | 'DIVORCIADO'
      | 'VIUVO'
      | 'UNIAO_ESTAVEL';
  }) => void;
}

const formatCPF = (value: string) => {
  const cleanValue = value.replace(/\D/g, '');

  if (cleanValue.length <= 11) {
    return cleanValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2');
  }

  return cleanValue
    .slice(0, 11)
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

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

export function CreateClientSidebar({
  isOpen,
  onClose,
  onCreateClient,
}: CreateClientSidebarProps) {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    estadoCivil: '',
    telefone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.cpf) {
      return;
    }

    onCreateClient({
      nomeCompleto: formData.nome,
      documento: formData.cpf,
      telefone: formData.telefone,
      email: formData.email,
      estadoCivil: formData.estadoCivil as Client['estadoCivil'],
    });

    setFormData({
      nome: '',
      cpf: '',
      email: '',
      estadoCivil: '',
      telefone: '',
    });
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCPF(e.target.value);
    setFormData({ ...formData, cpf: formattedValue });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhone(e.target.value);
    setFormData({ ...formData, telefone: formattedValue });
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
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Adicionar Cliente
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Preencha as informações e adicione um cliente em sua lista
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-white">
                    Nome
                  </Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                    placeholder="Digite o nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf" className="text-white">
                    CPF
                  </Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={handleCPFChange}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                    placeholder="000.000.000-00"
                    maxLength={14}
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
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-white">
                    Telefone
                  </Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={handlePhoneChange}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estadoCivil" className="text-white">
                    Estado Civil
                  </Label>
                  <Select
                    value={formData.estadoCivil}
                    onValueChange={(value) =>
                      setFormData({ ...formData, estadoCivil: value })
                    }
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-cyan-500">
                      <SelectValue placeholder="Selecione o estado civil" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem
                        value="solteiro"
                        className="text-white hover:bg-slate-600"
                      >
                        Solteiro(a)
                      </SelectItem>
                      <SelectItem
                        value="casado"
                        className="text-white hover:bg-slate-600"
                      >
                        Casado(a)
                      </SelectItem>
                      <SelectItem
                        value="divorciado"
                        className="text-white hover:bg-slate-600"
                      >
                        Divorciado(a)
                      </SelectItem>
                      <SelectItem
                        value="viuvo"
                        className="text-white hover:bg-slate-600"
                      >
                        Viúvo(a)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-medium"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>

              <div className="pt-6 border-t border-slate-700">
                <div className="space-y-3">
                  <h3 className="text-white font-medium">
                    Gerar link do cadastro
                  </h3>
                  <p className="text-sm text-slate-400">
                    Gere um link de cadastro automático para ser preenchido pelo
                    cliente
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
