# ConnectCare

# Especificação de Caso de Uso: Gerenciar Perfil

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

Este caso de uso permite que um paciente ou profissional de saúde registrado no sistema *ConnectCare* visualize e atualize seu perfil. As informações de perfil incluem dados pessoais, dados de saúde (para pacientes), credenciais profissionais (para profissionais), e configurações de preferências, como notificações. O gerenciamento de perfil visa garantir que o sistema disponha de dados atualizados e personalizados para oferecer serviços e comunicações adequadas.

## 2. Fluxo básico de eventos

1. O ator (usuário logado) acessa a opção "Perfil" no menu principal da plataforma (*ConnectCare*).  
2. O sistema apresenta os dados atualmente cadastrados: nome completo, data de nascimento, CPF, telefone, e-mail, endereço, gênero, condições de saúde preexistentes (para pacientes), especialização, registro profissional e horário de atendimento (para profissionais).  
3. O ator clica em "Editar perfil".  
4. O sistema permite a edição dos campos. O ator modifica os dados desejados. (FA1, FA2, FE1)  
5. O sistema valida os campos obrigatórios:  
   - Para pacientes: nome completo, data de nascimento, CPF válido, telefone com DDD, endereço completo.  
   - Para profissionais: nome, CPF, especialização, número do registro profissional (CRM ou equivalente), disponibilidade de horários.  
   - O e-mail deve estar em formato válido.  
6. O ator clica em "Salvar alterações".  
7. O sistema verifica se todos os campos obrigatórios foram preenchidos corretamente e atualiza os dados do perfil.  
8. O sistema exibe a mensagem de sucesso: “Perfil atualizado com sucesso.”  
9. O ator visualiza o perfil atualizado.  

## 3. Fluxos alternativos

### FA1 – Cancelar edição

- Ocorre após o passo 4 do fluxo básico.  
- O ator decide não concluir a edição e clica em “Cancelar”.  
- O sistema descarta as alterações feitas e retorna à tela de visualização do perfil (retorna ao passo 2 do fluxo básico).

### FA2 – Alterar apenas preferências de notificação

- Ocorre após o passo 4 do fluxo básico.  
- O ator acessa a aba de "Preferências" e ativa ou desativa notificações por SMS, e-mail ou push.  
- O sistema registra apenas essas alterações e salva sem modificar os demais campos.  
- Retorna ao passo 8 do fluxo básico.

## 4. Fluxos de exceção

### FE1 – Dados inválidos

- Ocorre no passo 5 do fluxo básico.  
- Se algum campo obrigatório estiver em branco ou em formato incorreto (por exemplo, CPF inválido, e-mail sem `@`), o sistema exibe mensagem de erro e impede a conclusão da atualização.  
- O ator deve corrigir os campos indicados e repetir o passo 6.

## 5. Pré-condições

1. O usuário deve estar autenticado no sistema.  
2. O perfil inicial já deve estar criado (cadastro previamente realizado).

## 6. Pós-condições

1. Os dados do perfil são atualizados no banco de dados.  
2. As preferências de notificação do usuário podem ser alteradas.  
3. As novas informações passam a ser utilizadas em futuras interações com o sistema.

## 7. Pontos de extensão

1. Receber notificações personalizadas: as alterações de preferências ativam ou desativam o envio de notificações vinculadas ao perfil.  
2. Atualizar dados de saúde: o preenchimento de novas condições de saúde pode acionar recomendações personalizadas.

## 8. Requisitos especiais

1. As validações devem seguir as normas da Receita Federal para CPF e formato de e-mail conforme padrão RFC 5322.  
2. Os dados devem ser armazenados em banco com criptografia de dados sensíveis (nome, CPF, e-mail, telefone).  
3. O sistema deve registrar log de alteração de perfil com data, hora e campos modificados.

## 9. Informações adicionais

- Este caso de uso pode ser reutilizado como extensão por outros casos, como “Agendar consulta” ou “Receber notificações”, em que dados do perfil são acessados automaticamente.  
- A implementação da lógica de regras de negócios para campos obrigatórios está vinculada à função do ator no sistema (paciente ou profissional).
