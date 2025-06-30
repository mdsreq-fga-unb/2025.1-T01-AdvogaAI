import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  console.log(
    `Iniciando o processo de seed para popular as tags do sistema...`,
  );

  // --- Tags para Pessoa Física (PF) ---

  await prisma.tagSistema.upsert({
    where: { chave: 'pf_nome_completo' },
    update: {},
    create: {
      chave: 'pf_nome_completo',
      descricao: 'Nome Completo (Cliente PF)',
      origemDados: 'PessoaFisica.nomeCompleto',
    },
  });

  await prisma.tagSistema.upsert({
    where: { chave: 'pf_cpf' },
    update: {},
    create: {
      chave: 'pf_cpf',
      descricao: 'CPF (Cliente PF)',
      origemDados: 'PessoaFisica.cpf',
    },
  });

  await prisma.tagSistema.upsert({
    where: { chave: 'pf_rg' },
    update: {},
    create: {
      chave: 'pf_rg',
      descricao: 'RG (Cliente PF)',
      origemDados: 'PessoaFisica.rg',
    },
  });

  await prisma.tagSistema.upsert({
    where: { chave: 'pf_email' },
    update: {},
    create: {
      chave: 'pf_email',
      descricao: 'E-mail (Cliente PF)',
      origemDados: 'PessoaFisica.email',
    },
  });

  await prisma.tagSistema.upsert({
    where: { chave: 'pf_telefone' },
    update: {},
    create: {
      chave: 'pf_telefone',
      descricao: 'Telefone (Cliente PF)',
      origemDados: 'PessoaFisica.telefone',
    },
  });

  await prisma.tagSistema.upsert({
    where: { chave: 'pf_estado_civil' },
    update: {},
    create: {
      chave: 'pf_estado_civil',
      descricao: 'Estado Civil (Cliente PF)',
      origemDados: 'PessoaFisica.estadoCivil',
    },
  });

  await prisma.tagSistema.upsert({
    where: { chave: 'pf_profissao' },
    update: {},
    create: {
      chave: 'pf_profissao',
      descricao: 'Profissão (Cliente PF)',
      origemDados: 'PessoaFisica.profissao',
    },
  });

  await prisma.tagSistema.upsert({
    where: { chave: 'pf_nacionalidade' },
    update: {},
    create: {
      chave: 'pf_nacionalidade',
      descricao: 'Nacionalidade (Cliente PF)',
      origemDados: 'PessoaFisica.nacionalidade',
    },
  });

  // --- Tags de Endereço para Pessoa Física ---

  await prisma.tagSistema.upsert({
    where: { chave: 'pf_end_logradouro' },
    update: {},
    create: {
      chave: 'pf_end_logradouro',
      descricao: 'Logradouro (Endereço PF)',
      origemDados: 'PessoaFisica.endereco.logradouro',
    },
  });

  await prisma.tagSistema.upsert({
    where: { chave: 'pf_end_numero' },
    update: {},
    create: {
      chave: 'pf_end_numero',
      descricao: 'Número (Endereço PF)',
      origemDados: 'PessoaFisica.endereco.numero',
    },
  });

  await prisma.tagSistema.upsert({
    where: { chave: 'pf_end_complemento' },
    update: {},
    create: {
      chave: 'pf_end_complemento',
      descricao: 'Complemento (Endereço PF)',
      origemDados: 'PessoaFisica.endereco.complemento',
    },
  });

  await prisma.tagSistema.upsert({
    where: { chave: 'pf_end_bairro' },
    update: {},
    create: {
      chave: 'pf_end_bairro',
      descricao: 'Bairro (Endereço PF)',
      origemDados: 'PessoaFisica.endereco.bairro',
    },
  });

  await prisma.tagSistema.upsert({
    where: { chave: 'pf_end_cidade' },
    update: {},
    create: {
      chave: 'pf_end_cidade',
      descricao: 'Cidade (Endereço PF)',
      origemDados: 'PessoaFisica.endereco.cidade',
    },
  });

  await prisma.tagSistema.upsert({
    where: { chave: 'pf_end_estado' },
    update: {},
    create: {
      chave: 'pf_end_estado',
      descricao: 'Estado (Endereço PF)',
      origemDados: 'PessoaFisica.endereco.estado',
    },
  });

  await prisma.tagSistema.upsert({
    where: { chave: 'pf_end_cep' },
    update: {},
    create: {
      chave: 'pf_end_cep',
      descricao: 'CEP (Endereço PF)',
      origemDados: 'PessoaFisica.endereco.cep',
    },
  });

  console.log('Seed finalizado com sucesso.');
}

main()
  .catch((e) => {
    console.error('Ocorreu um erro durante o processo de seed:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
