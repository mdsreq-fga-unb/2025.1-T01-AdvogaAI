# ConnectCare

## Especificação de Caso de Uso: Criar relatório de saúde  

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

Este caso de uso permite que o administrador do sistema ou uma organização parceira gere um relatório de saúde com base em dados coletados de atendimentos, campanhas e interações realizadas na plataforma ConnectCare. O relatório é utilizado para fins estratégicos, acompanhamento de impacto social, prestação de contas e formulação de políticas públicas.

## 2 Fluxo básico de eventos

1. O ator (administrador ou organização parceira autenticada) acessa a funcionalidade "Criar relatório de saúde" no painel administrativo do sistema.  
2. O sistema apresenta a tela de criação de relatório com filtros personalizáveis (por data, região, tipo de serviço, faixa etária, condição de saúde, tipo de profissional, etc.).  
3. O ator seleciona os filtros desejados. (FA1, FA2, FE1, FE2)  
4. O ator define o tipo de relatório a ser gerado: analítico (com gráficos), estatístico (com agregações), ou individualizado (por paciente ou profissional).  
5. O sistema valida os parâmetros e busca os dados correspondentes. (FE3)  
6. O sistema gera uma pré-visualização do relatório com sumário estatístico, tabelas e gráficos conforme o tipo escolhido.  
7. O ator confirma a geração do relatório final.  
8. O sistema exporta o relatório em PDF e/ou CSV, armazenando-o no histórico do sistema.  
9. O sistema apresenta uma mensagem de sucesso com link para download e registro no histórico.  
10. O caso de uso termina.

## 3 Fluxos alternativos

### 3.1 Personalização de parâmetros

#### FA1 – O ator opta por salvar filtros para reutilização futura

- Ocorre após o passo 3 do fluxo básico.  
- O sistema oferece a opção de nomear e salvar o conjunto de filtros definidos.  
- O ator salva o conjunto como um "modelo de relatório".  
- O fluxo retorna ao passo 4 do fluxo básico.

#### FA2 – O ator carrega um modelo de relatório salvo

- Ocorre antes do passo 3 do fluxo básico.  
- O ator escolhe carregar um modelo salvo anteriormente.  
- O sistema pré-preenche os filtros com base no modelo.  
- O fluxo segue a partir do passo 4 do fluxo básico.

## 4 Fluxos de exceção

### FE1 – Filtros inválidos ou inconsistentes

- Ocorre no passo 3 do fluxo básico.  
- O sistema identifica inconsistências nos filtros (ex.: intervalo de datas invertido, combinação inválida de parâmetros).  
- O sistema exibe mensagem de erro detalhando o problema.  
- O ator corrige os parâmetros.  
- O fluxo retorna ao passo 3 do fluxo básico.

### FE2 – Nenhum dado encontrado

- Ocorre no passo 5 do fluxo básico.  
- O sistema não encontra dados correspondentes aos filtros selecionados.  
- O sistema informa que não há dados disponíveis para os critérios definidos.  
- O ator pode redefinir os filtros ou cancelar a operação.  
- O fluxo retorna ao passo 3 ou termina.

### FE3 – Falha na geração do relatório

- Ocorre no passo 6 ou 8 do fluxo básico.  
- Uma falha técnica impede a geração do relatório (ex.: problema de conexão, falha de renderização).  
- O sistema registra o erro e informa o ator.  
- O fluxo termina com registro de falha no log do sistema.

## 5 Pré-condições

5.1 O ator deve estar autenticado e ter permissão administrativa ou vínculo com uma organização parceira.  
5.2 O sistema deve estar com o módulo de relatórios ativo e funcional.

## 6 Pós-condições

6.1 Um relatório de saúde será gerado e armazenado no histórico do sistema.  
6.2 O relatório estará disponível para download em formato PDF e/ou CSV.  
6.3 O acesso ao relatório será registrado para auditoria.

## 7 Pontos de extensão

### 7.1 Exportar para integração externa

- Local: após o passo 8 do fluxo básico.  
- O sistema pode, opcionalmente, enviar o relatório para sistemas externos parceiros, mediante configuração.

## 8 Requisitos especiais

8.1 O relatório deve ser gerado em menos de 15 segundos para conjuntos de dados de até 10.000 registros.  
8.2 O sistema deve permitir a geração mesmo em conexões de baixa largura de banda.  
8.3 O conteúdo deve estar em conformidade com a LGPD (Lei Geral de Proteção de Dados).  
8.4 Os relatórios gerados devem estar acessíveis por 12 meses.  
8.5 O sistema deve oferecer opções de acessibilidade (contraste, leitores de tela).

## 9 Informações adicionais

- Este caso de uso está relacionado aos objetivos do ConnectCare de monitoramento do impacto social e operacional do sistema.  
- Dados utilizados na geração incluem registros de atendimento, prontuários eletrônicos, participação em campanhas e dados demográficos.  
- Relatórios gerados podem subsidiar decisões de ONGs, agentes públicos e gestores locais.  
- Um dashboard complementar pode ser desenvolvido para visualização contínua dos indicadores extraídos dos relatórios.
