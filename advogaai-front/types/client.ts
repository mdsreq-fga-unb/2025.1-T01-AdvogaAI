import { Endereco } from '@/app/dashboard/client/edit-client-sidebar';
import { CreateAddressDto } from './address';

export enum EstadoCivil {
  SOLTEIRO = 'SOLTEIRO',
  CASADO = 'CASADO',
  DIVORCIADO = 'DIVORCIADO',
  VIUVO = 'VIUVO',
  UNIAO_ESTAVEL = 'UNIAO_ESTAVEL',
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
export interface RegisterJuridicalClientDto {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual: string;
  email: string;
  telefone: string;
  endereco: CreateAddressDto;
  representante: CreatePessoaFisicaDto;
}

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
  createdAt: string;
  updatedAt: string;
}
