# ConnectCare

## Especificação de Caso de Uso: Atualizar informações de parceiros

### Índice

1. [Breve descrição](#1-breve-descrição)  
2. [Fluxo básico de eventos](#2-fluxo-básico-de-eventos)  
3. [Fluxos alternativos](#3-fluxos-alternativos)  
4. [Fluxos de exceção](#4-fluxos-de-exceção)  
5. [Pré-condições](#5-pré-condições)  
6. [Pós-condições](#6-pós-condições)  
7. [Pontos de extensão](#7-pontos-de-extensão)  
8. [Requisitos especiais](#8-requisitos-especiais)  
9. [Informações adicionais](#9-informações-adicionais)

## 1 Breve descrição

Este caso de uso descreve o processo realizado pelo administrador do ConnectCare para atualizar os dados de entidades parceiras previamente cadastradas, como ONGs, hospitais e secretarias de saúde. As atualizações podem incluir alterações em nome, endereço, responsáveis, tipos de ações ofertadas e contatos.

## 2 Fluxo básico de eventos

1. O administrador acessa o painel administrativo com suas credenciais válidas (FA1, FE1)  
2. O sistema valida as credenciais de acesso  
3. O administrador seleciona a opção “Gerenciar parceiros”  
4. O sistema exibe a lista de entidades parceiras cadastradas  
5. O administrador utiliza filtros por nome, CNPJ ou tipo de parceiro para localizar a entidade desejada (FA2)  
6. O administrador seleciona o parceiro a ser atualizado  
7. O sistema exibe o formulário com os dados atuais da entidade  
8. O administrador altera os seguintes campos permitidos:  
   - Nome da entidade  
   - Responsável principal  
   - Endereço completo com CEP  
   - Tipos de serviços ofertados  
   - E-mail institucional e telefone de contato  
9. O sistema valida os dados modificados (FA3, FE2)  
10. O administrador confirma a atualização  
11. O sistema salva as alterações, registra o histórico da modificação e exibe mensagem de sucesso  
12. O parceiro atualizado passa a refletir os novos dados nas campanhas e serviços vinculados

## 3 Fluxos alternativos

### 3.1 Autenticação multifator

**FA1 – Acesso com autenticação multifator**  
- Ponto de entrada: passo 1 do fluxo básico  
- Se o MFA estiver habilitado, o sistema solicita o código adicional via aplicativo autenticador  
- O administrador insere o código corretamente  
- O sistema valida o segundo fator e continua para o passo 2

### 3.2 Filtro por múltiplos critérios

**FA2 – Filtro cruzado por critérios compostos**  
- Ponto de entrada: passo 5 do fluxo básico  
- O administrador pode combinar nome parcial + CNPJ + status ativo  
- O sistema retorna apenas os parceiros que satisfazem todos os filtros aplicados  
- O fluxo continua no passo 6

### 3.3 Validação assistida

**FA3 – Sugestão de correção automática**  
- Ponto de entrada: passo 9 do fluxo básico  
- O sistema detecta campos inconsistentes e sugere correções com base no histórico ou dados externos  
- O administrador aceita ou rejeita as sugestões  
- O fluxo retorna ao passo 9

## 4 Fluxos de exceção

### FE1 – Erro de autenticação

- Ponto de entrada: passo 1 do fluxo básico  
- O administrador insere login/senha incorretos três vezes  
- O sistema bloqueia temporariamente o acesso e solicita redefinição de senha  
- O fluxo termina

### FE2 – Erro no salvamento

- Ponto de entrada: passo 9 do fluxo básico  
- Ocorre falha no banco de dados ao tentar salvar as alterações  
- O sistema exibe mensagem de erro e registra o incidente para revisão técnica  
- O fluxo retorna ao passo 8

## 5 Pré-condições

5.1 O administrador deve estar autenticado com permissões de edição de entidades  
5.2 O parceiro a ser atualizado deve estar previamente registrado no sistema

## 6 Pós-condições

6.1 Os dados da entidade foram atualizados corretamente no sistema  
6.2 As alterações estão refletidas em todos os pontos onde os dados são consumidos  
6.3 O log de modificações foi armazenado para fins de auditoria

## 7 Pontos de extensão

**7.1 Integração com sistemas externos (CNPJ/Receita Federal)**  
- Localização: passo 9 do fluxo básico  
- O sistema pode consultar dados públicos para validação de CNPJ e razão social

## 8 Requisitos especiais

8.1 O sistema deve permitir rastreabilidade completa de cada campo modificado  
8.2 O tempo de resposta da atualização deve ser inferior a 2 segundos  
8.3 O formulário deve estar disponível mesmo com conexão intermitente (modo offline)  
8.4 Todas as alterações devem ser auditáveis com timestamp e usuário

## 9 Informações adicionais

- O sistema deve fornecer relatório periódico com as atualizações realizadas nos últimos 30 dias  
- O cadastro de parceiros está sujeito a regras de conformidade com a LGPD
