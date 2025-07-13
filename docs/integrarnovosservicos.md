# ConnectCare

## Especificação de Caso de Uso: Integrar novos serviços

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

Este caso de uso descreve como o administrador do sistema ConnectCare integra novos serviços de saúde na plataforma, como campanhas, exames ou novos pontos de atendimento. A integração envolve a configuração de informações essenciais, definição de parâmetros de visibilidade e testes de ativação, garantindo que os serviços estejam disponíveis para os usuários de forma segura e eficiente.

## 2 Fluxo básico de eventos

1. O administrador acessa o painel administrativo com login e senha válidos (FA1, FE1)  
2. O sistema valida as credenciais e libera o acesso  
3. O administrador seleciona a opção “Gerenciar serviços”  
4. O sistema exibe a lista atual de serviços registrados  
5. O administrador clica em “Adicionar novo serviço”  
6. O sistema apresenta o formulário de cadastro de serviço  
7. O administrador preenche os seguintes campos obrigatórios:
   - Nome do serviço  
   - Tipo do serviço (ex.: exame, atendimento clínico, vacinação)  
   - Localização geográfica (com georreferência)  
   - Datas de início e término  
   - Público-alvo  
   - Entidade responsável  
   - Capacidade de atendimento  
8. O sistema valida os dados preenchidos (FA2, FE2)  
9. O administrador aciona o botão “Cadastrar serviço”  
10. O sistema salva os dados, ativa o serviço e o disponibiliza aos usuários finais  
11. O administrador recebe uma notificação de sucesso  
12. O sistema inclui o novo serviço nos filtros de busca da interface pública  

## 3 Fluxos alternativos

### 3.1 Autenticação

**FA1 – Autenticação via token multifator**  
- Ponto de entrada: passo 1 do fluxo básico  
- Se a conta do administrador tiver MFA ativado, o sistema solicita o token via app autenticador  
- O administrador insere o token válido  
- O sistema valida e permite o acesso  
- O fluxo continua no passo 2  

### 3.2 Validação com correções

**FA2 – Correção de dados inválidos**  
- Ponto de entrada: passo 8 do fluxo básico  
- O sistema detecta campos obrigatórios vazios ou dados inconsistentes  
- Exibe mensagens de erro em tempo real  
- O administrador corrige os dados e prossegue com o cadastro  
- O fluxo retorna ao passo 8  

## 4 Fluxos de exceção

### FE1 – Falha de autenticação

- Ponto de entrada: passo 1 do fluxo básico  
- O administrador insere credenciais incorretas três vezes  
- O sistema bloqueia temporariamente o acesso e registra tentativa suspeita  
- O administrador é instruído a redefinir a senha  
- O fluxo é encerrado  

### FE2 – Erro de cadastro

- Ponto de entrada: passo 8 do fluxo básico  
- O sistema apresenta erro interno ao validar ou salvar o novo serviço  
- O serviço não é cadastrado  
- Uma mensagem de falha é exibida ao administrador  
- O erro é logado e o administrador pode tentar novamente  
- O fluxo retorna ao passo 6  

## 5 Pré-condições

5.1 O administrador deve estar autenticado com permissões de integração  
5.2 O sistema deve estar operacional e com conexão ao banco de dados  

## 6 Pós-condições

6.1 O novo serviço está visível aos usuários do sistema  
6.2 Os filtros de busca foram atualizados com o novo serviço  
6.3 A entidade responsável passou a ser vinculada ao serviço na base de dados  

## 7 Pontos de extensão

**7.1 Integração com serviços parceiros**  
- Localização: após o passo 10 do fluxo básico  
- O sistema pode acionar APIs externas para informar entidades gestoras da inclusão do serviço  

## 8 Requisitos especiais

8.1 Os dados georreferenciados devem estar em conformidade com o padrão WGS84  
8.2 O sistema deve garantir a resposta de cadastro em até 5 segundos  
8.3 Todas as ações devem ser registradas no log administrativo  
8.4 O cadastro deve estar disponível mesmo em conexões instáveis (suporte a *retry* automático)  

## 9 Informações adicionais

- O cadastro de novos serviços exige que a entidade responsável esteja previamente validada na base de dados  
- A plataforma pode sugerir automaticamente campanhas com base nos dados demográficos da localidade  
