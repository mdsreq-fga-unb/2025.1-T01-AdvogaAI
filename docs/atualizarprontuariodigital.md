# ConnectCare  

# Especificação de Caso de Uso: Atualizar prontuário digital

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

Este caso de uso descreve as ações realizadas por um profissional de saúde (ator) para atualizar o prontuário digital de um paciente na plataforma ConnectCare. A funcionalidade permite inserir, modificar e registrar informações clínicas diretamente no sistema durante ou após um atendimento, promovendo a continuidade e qualidade do cuidado médico.

## 2. Fluxo básico de eventos

1. O profissional de saúde acessa o sistema e autentica-se com login e senha válidos. (FE1)  
2. O sistema valida as credenciais fornecidas.  
3. Após autenticação bem-sucedida, o profissional acessa a lista de pacientes agendados para o dia.  
4. O profissional seleciona o paciente em atendimento. (FA1)  
5. O sistema exibe o prontuário digital do paciente com histórico clínico anterior.  
6. O profissional insere ou atualiza os seguintes dados no prontuário:  
   - diagnóstico médico  
   - prescrições (medicamentos, dosagens, duração)  
   - exames solicitados  
   - orientações clínicas  
   - observações complementares  
7. O sistema valida os dados obrigatórios: diagnóstico, pelo menos uma conduta (prescrição, exame ou orientação), e integridade do histórico clínico. (FE2, FE3)  
8. O profissional confirma a atualização.  
9. O sistema registra o novo conteúdo com data, hora e identificador do profissional responsável.  
10. O sistema confirma a operação e disponibiliza o prontuário atualizado para visualização posterior.  

## 3. Fluxos alternativos

### FA1 – Profissional localiza paciente por busca textual

**Desvio do passo 4 do fluxo básico**  
4a. O profissional opta por buscar o paciente por nome, CPF ou número do cartão SUS.  
4b. O sistema apresenta os resultados da busca conforme os dados digitados.  
4c. O profissional seleciona o paciente desejado.  
4d. Retorna ao passo 5 do fluxo básico.

## 4. Fluxos de exceção

### FE1 – Falha de autenticação

**Desvio do passo 1 do fluxo básico**  
1a. O profissional fornece credenciais inválidas.  
1b. O sistema apresenta mensagem de erro de autenticação.  
1c. O profissional pode tentar novamente (limite de 3 tentativas).  
1d. Se atingir o limite, o sistema bloqueia temporariamente o acesso.  

### FE2 – Dados clínicos obrigatórios ausentes

**Desvio do passo 7 do fluxo básico**  
7a. O sistema detecta ausência de diagnóstico ou conduta.  
7b. O sistema exibe mensagem de erro indicando campos obrigatórios.  
7c. O profissional é redirecionado para complementar os dados.  
7d. Retorna ao passo 6 do fluxo básico.

### FE3 – Falha na persistência dos dados

**Desvio do passo 9 do fluxo básico**  
9a. Ocorre uma falha no banco de dados ou na comunicação com o servidor.  
9b. O sistema exibe mensagem de erro e sugere nova tentativa.  
9c. O profissional pode tentar novamente a operação.  
9d. Se persistir o erro, o sistema recomenda contato com o suporte técnico.  

## 5. Pré-condições

5.1 O profissional de saúde deve estar cadastrado e com acesso ativo na plataforma.  
5.2 O paciente deve possuir prontuário digital previamente criado no sistema.  

## 6. Pós-condições

6.1 O prontuário digital do paciente é atualizado com os novos dados clínicos.  
6.2 O histórico médico do paciente é preservado com registro de versão.  

## 7. Pontos de extensão

7.1 Visualizar exames do paciente  
Ponto de extensão no passo 5 do fluxo básico. Permite que o profissional visualize exames laboratoriais anteriores antes de realizar nova atualização.  

## 8. Requisitos especiais

8.1 A funcionalidade deve estar disponível em modo offline com sincronização posterior.  
8.2 O registro de alterações no prontuário deve conter assinatura digital do profissional.  
8.3 O sistema deve seguir normas da LGPD para dados sensíveis de saúde.  

## 9. Informações adicionais

- Este caso de uso está diretamente relacionado ao UC "Realizar atendimento clínico" e ao UC "Consultar histórico do paciente".  
- As atualizações realizadas neste UC afetam os relatórios de indicadores de saúde gerados pelo sistema.  
