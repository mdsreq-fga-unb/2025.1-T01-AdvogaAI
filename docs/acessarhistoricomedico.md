# Especificação de Caso de Uso: Acessar histórico médico

## Índice

1. [Breve descrição](#1-breve-descrição)  
2. [Fluxo básico de eventos](#2-fluxo-básico-de-eventos)  
3. [Fluxos alternativos](#3-fluxos-alternativos)  
4. [Fluxos de exceção](#4-fluxos-de-exceção)  
5. [Pré-condições](#5-pré-condições)  
6. [Pós-condições](#6-pós-condições)  
7. [Pontos de extensão](#7-pontos-de-extensão)  
8. [Requisitos especiais](#8-requisitos-especiais)  
9. [Informações adicionais](#9-informações-adicionais)

## 1. Breve descrição

Este caso de uso permite ao paciente acessar seu histórico médico digital por meio do aplicativo *ConnectCare*. As informações acessadas incluem consultas passadas, prescrições, diagnósticos e exames registrados na plataforma. O acesso é protegido por autenticação e ocorre após o login do paciente. Este caso de uso também contém uma extensão chamada **Receber orientações pós-atendimento**, que se aplica após cada novo registro médico.-

## 2. Fluxo básico de eventos

1. O paciente abre o aplicativo *ConnectCare*.  
2. O sistema solicita autenticação por login (FA1, FE1).  
3. O paciente informa os seguintes dados obrigatórios: CPF válido e senha cadastrada com, no mínimo, 8 caracteres (incluindo letra maiúscula, minúscula, número e símbolo).  
4. O sistema valida as credenciais fornecidas (FA1, FE1).  
5. O sistema exibe a tela inicial com as opções principais.  
6. O paciente seleciona “Histórico médico”.  
7. O sistema carrega e exibe a lista cronológica de registros médicos, incluindo: data, tipo de atendimento, profissional responsável, e botões para visualizar detalhes.  
8. O paciente escolhe um registro específico para visualizar.  
9. O sistema exibe os dados completos do atendimento: sintomas relatados, diagnóstico, exames solicitados, prescrições e recomendações.  
10. O sistema exibe a extensão “Receber orientações pós-atendimento” (FE2).  
11. O paciente confirma que leu e compreendeu as orientações.  
12. O sistema registra a leitura e retorna à lista de registros.  

## 3. Fluxos alternativos

### FA1 – Autenticação com biometria (passo 2 do fluxo básico)

- Se o dispositivo for compatível, o sistema oferece a opção de login por biometria (digital ou facial).
- O paciente autentica-se por biometria.
- O sistema valida a autenticação e avança para o passo 5 do fluxo básico.

## 4. Fluxos de exceção

### FE1 – Credenciais inválidas (passo 4 do fluxo básico)

- O sistema detecta que CPF ou senha são inválidos.
- Exibe mensagem: “Credenciais inválidas. Tente novamente.”.
- Permite até três tentativas.
- Após três falhas, bloqueia temporariamente o acesso por 15 minutos.

### FE2 – Falha ao carregar orientações pós-atendimento (passo 10 do fluxo básico)

- O sistema não consegue carregar as orientações associadas ao atendimento selecionado.
- Exibe mensagem: “Orientações indisponíveis no momento. Tente novamente mais tarde.”.
- Registra falha no log de erro.
- Permite que o usuário continue navegando pelo histórico.

## 5. Pré-condições

- O paciente deve estar cadastrado na plataforma.
- Deve possuir ao menos um registro médico no histórico.

## 6. Pós-condições

- O paciente acessou com sucesso seu histórico médico.
- O sistema registrou a leitura das orientações pós-atendimento.

## 7. Pontos de extensão

- **Receber orientações pós-atendimento**: extensão executada ao final do passo 9 do fluxo básico, caso existam orientações médicas vinculadas ao registro.

## 8. Requisitos especiais

- Compatibilidade com dispositivos móveis Android e iOS.
- Proteção de dados conforme LGPD (Lei Geral de Proteção de Dados).
- Disponibilidade do histórico mesmo em conexões instáveis (com cache local criptografado).

## 9. Informações adicionais

- Os registros médicos são cadastrados exclusivamente por profissionais autenticados no sistema.
- A extensão pode incluir imagens, vídeos e arquivos em PDF com instruções médicas.
- O sistema possui monitoramento de acesso com autenticação de dois fatores, quando ativada nas configurações.

