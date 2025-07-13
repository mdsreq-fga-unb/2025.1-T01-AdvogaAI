# ConnectCare

## Especificação de Caso de Uso: Fornecer feedback

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

Este caso de uso permite ao paciente fornecer feedback sobre os atendimentos recebidos por meio da plataforma ConnectCare. O feedback pode incluir avaliações quantitativas e qualitativas, relacionadas à qualidade do atendimento, pontualidade, ambiente e funcionalidade do sistema. Esse processo visa promover a melhoria contínua dos serviços prestados.

## 2. Fluxo básico de eventos

1. O paciente acessa a plataforma autenticado (FA1, FE1).  
2. O sistema exibe a tela “Meus atendimentos”.  
3. O paciente seleciona o atendimento para o qual deseja fornecer feedback.  
4. O sistema exibe um formulário de feedback com os seguintes campos obrigatórios:  
   - Nota de 1 a 5 para qualidade do atendimento  
   - Nota de 1 a 5 para pontualidade  
   - Campo aberto para comentários (mínimo de 10 caracteres)  
   - Consentimento para uso anônimo do feedback em relatórios  
5. O paciente preenche o formulário e clica em “Enviar feedback”.  
6. O sistema valida as entradas (campos obrigatórios, limites de caracteres).  
7. O sistema armazena o feedback no banco de dados associado ao atendimento avaliado.  
8. O sistema exibe mensagem de confirmação: “Obrigado por compartilhar sua opinião!”  
9. O caso de uso é encerrado.

## 3. Fluxos alternativos

### 3.1 FA1 – Acesso direto por notificação

Ponto de inserção: Passo 1 do fluxo básico.  
O paciente recebe uma notificação push ou por e-mail com um link direto para o feedback após a finalização do atendimento.  
O link leva diretamente à etapa 3 do fluxo básico.

### 3.2 FA2 – Feedback não obrigatório

Ponto de inserção: Passo 4 do fluxo básico.  
O paciente opta por não preencher o campo de comentários.  
O sistema aceita o envio do formulário com apenas as notas obrigatórias preenchidas.  
Fluxo segue a partir do passo 6.

## 4. Fluxos de exceção

### 4.1 FE1 – Falha na autenticação

Ponto de inserção: Passo 1 do fluxo básico.  
O paciente tenta acessar o sistema mas insere credenciais incorretas.  
O sistema bloqueia o acesso após três tentativas.  
Paciente é orientado a redefinir a senha.

### 4.2 FE2 – Campos inválidos no formulário

Ponto de inserção: Passo 6 do fluxo básico.  
Campos obrigatórios estão vazios ou comentário tem menos de 10 caracteres (quando preenchido).  
O sistema exibe mensagens de erro e impede o envio até correção.  
Após correção, fluxo retorna ao passo 6.

## 5. Pré-condições

5.1 O paciente deve ter realizado ao menos um atendimento validado no ConnectCare.  
5.2 O paciente deve estar autenticado na plataforma.

## 6. Pós-condições

6.1 O feedback é registrado e armazenado com data, hora e vínculo ao atendimento.  
6.2 O sistema poderá utilizar os dados em relatórios de melhoria e monitoramento.

## 7. Pontos de extensão

*Este caso de uso não possui ponto de extensão definido neste momento.*

## 8. Requisitos especiais

8.1 Os feedbacks devem ser armazenados com criptografia de dados sensíveis.  
8.2 O sistema deve garantir anonimato em relatórios públicos.  
8.3 O formulário deve ser responsivo e acessível em dispositivos móveis com conexão limitada.

## 9. Informações adicionais

O feedback será utilizado por gestores e parceiros da saúde para ajustar processos e políticas de atendimento.  
Avaliações repetidas e consistentes poderão gerar alertas de qualidade crítica.  
A coleta contínua de feedback contribuirá para a evolução dos indicadores sociais monitorados pela plataforma.
