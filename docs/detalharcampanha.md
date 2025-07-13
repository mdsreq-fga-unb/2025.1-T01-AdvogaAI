# ConnectCare

## Especificação de Caso de Uso: Detalhar campanha  

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

## 1 Breve descrição

Este caso de uso permite que usuários autorizados (organizações parceiras ou administradores) acessem os detalhes completos de uma campanha cadastrada na plataforma ConnectCare. A funcionalidade possibilita a visualização de atributos como nome da campanha, público-alvo, localização, datas de início e fim, descrição, status, materiais associados e ações vinculadas.

## 2 Fluxo básico de eventos

1. O ator acessa o painel administrativo e seleciona a seção “Campanhas cadastradas”.  
2. O sistema exibe uma lista de campanhas com filtros de busca por nome, status, período ou região.  
3. O ator seleciona uma campanha específica. (FA1, FE1)  
4. O sistema exibe a tela com os detalhes da campanha, incluindo:  
   - Nome, descrição, tipo e categoria da campanha  
   - Organização responsável  
   - Datas de início e fim  
   - Status (ativa, encerrada, agendada)  
   - Localidades atendidas (endereços, bairros, regiões)  
   - Público-alvo (faixa etária, condições de saúde, vulnerabilidades sociais)  
   - Equipe envolvida  
   - Materiais informativos anexados (PDFs, imagens, vídeos)  
   - Relacionamento com outras campanhas ou ações de saúde  
5. O ator pode navegar por abas adicionais com informações operacionais, participantes e dados de monitoramento. (FA2, FE2)  
6. O sistema permite a exportação dos dados em formato PDF.  
7. O sistema registra o acesso nos logs de auditoria.  
8. O caso de uso termina.

## 3 Fluxos alternativos

### 3.1 Filtragem e comparação de campanhas

#### FA1 – O ator aplica filtros combinados na busca de campanhas

- Ocorre no passo 2 do fluxo básico.  
- O ator define filtros compostos (ex.: campanhas encerradas na zona rural entre março e junho).  
- O sistema exibe a lista filtrada conforme os critérios definidos.  
- O fluxo retorna ao passo 3.

#### FA2 – O ator acessa abas específicas dos detalhes

- Ocorre no passo 5 do fluxo básico.  
- O ator escolhe visualizar, por exemplo, a aba de “Equipe envolvida” ou “Materiais da campanha”.  
- O sistema carrega os dados dinamicamente.  
- O fluxo segue normalmente para o passo 6.

## 4 Fluxos de exceção

### FE1 – Campanha não encontrada

- Ocorre no passo 3 do fluxo básico.  
- O sistema não localiza a campanha selecionada (possivelmente removida ou alterada por outro usuário).  
- O sistema exibe mensagem de erro e orienta o ator a atualizar a lista.  
- O fluxo retorna ao passo 2 ou termina.

### FE2 – Falha no carregamento dos dados

- Ocorre no passo 4 ou 5 do fluxo básico.  
- O sistema encontra erro técnico ao tentar exibir os detalhes da campanha.  
- O sistema informa o erro e registra no log.  
- O fluxo retorna ao passo 3.

## 5 Pré-condições

5.1 O ator deve estar autenticado com permissão de administrador ou representante da organização responsável pela campanha.  
5.2 A campanha deve estar cadastrada no sistema e visível no escopo do ator.

## 6 Pós-condições

6.1 Os detalhes da campanha terão sido apresentados ao ator.  
6.2 As ações de acesso serão registradas para fins de auditoria.  
6.3 Caso a exportação seja realizada, o arquivo estará disponível para download.

## 7 Pontos de extensão

### 7.1 Editar campanha

- Local: a partir do passo 4, se o ator possuir permissão.  
- O sistema oferece opção para edição dos dados da campanha, redirecionando ao caso de uso “Editar campanha”.

### 7.2 Visualizar histórico de alterações

- Local: na aba de informações adicionais (passo 5).  
- O ator pode consultar o histórico completo de edições feitas na campanha, com carimbo de data e responsável.

## 8 Requisitos especiais

8.1 Os dados devem estar protegidos conforme a LGPD.  
8.2 O tempo de resposta da visualização não deve ultrapassar 3 segundos para campanhas com até 50 registros associados.  
8.3 O sistema deve apresentar os dados em modo responsivo e com acessibilidade.  
8.4 Materiais anexos devem estar disponíveis para download com verificação de integridade.  
8.5 A interface deve indicar claramente a validade e o status atual da campanha.

## 9 Informações adicionais

- Este caso de uso está ligado à necessidade de prestação de contas, gestão de ações em campo e compartilhamento de informações com atores diversos (usuários internos e externos).  
- A funcionalidade de detalhamento é complementar a “Monitorar impacto da campanha” e “Criar campanha”.  
- Pode ser usada em contextos administrativos, operacionais e estratégicos por ONGs, agentes de saúde, governos locais e gestores comunitários.
