# ConnectCare

## Especificação de Caso de Uso: Monitorar impacto da campanha  

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

Este caso de uso permite que organizações parceiras e administradores do sistema acompanhem, em tempo real ou por períodos definidos, o impacto de campanhas de saúde cadastradas na plataforma ConnectCare. O monitoramento contempla métricas de engajamento, cobertura populacional, taxa de comparecimento, avaliações dos usuários e indicadores de efetividade.

## 2 Fluxo básico de eventos

1. O ator (organização parceira ou administrador autenticado) acessa o módulo “Campanhas” no painel administrativo.  
2. O sistema apresenta a lista de campanhas cadastradas, com opção de filtro por período, localidade, público-alvo ou status da campanha.  
3. O ator seleciona a campanha a ser monitorada. (FA1, FE1)  
4. O sistema exibe o painel de monitoramento da campanha, com indicadores como:  
   - Número de participantes  
   - Perfil demográfico dos atendidos (idade, sexo, região)  
   - Avaliações dos usuários  
   - Taxa de retorno às unidades  
   - Comparativo entre número previsto e efetivo de atendimentos  
5. O ator interage com gráficos e tabelas para detalhamento por região, por tipo de serviço, por faixa etária ou por período. (FA2)  
6. O ator pode exportar os dados monitorados para PDF ou CSV.  
7. O sistema registra a ação no histórico de monitoramento e exibe mensagem de sucesso.  
8. O caso de uso termina.

## 3 Fluxos alternativos

### 3.1 Interação com relatórios

#### FA1 – O ator opta por comparar múltiplas campanhas simultaneamente

- Ocorre no passo 3 do fluxo básico.  
- O ator marca mais de uma campanha para análise comparativa.  
- O sistema apresenta um painel consolidado com gráficos comparativos.  
- O fluxo retorna ao passo 4 do fluxo básico.

#### FA2 – O ator deseja aplicar filtros personalizados no detalhamento

- Ocorre no passo 5 do fluxo básico.  
- O ator define filtros compostos (ex.: mulheres acima de 60 anos atendidas em área rural entre duas datas específicas).  
- O sistema refina os dados apresentados.  
- O fluxo segue normalmente a partir do passo 6.

## 4 Fluxos de exceção

### FE1 – Campanha inexistente ou com dados insuficientes

- Ocorre no passo 3 do fluxo básico.  
- O sistema identifica que a campanha selecionada não existe mais ou não possui dados registrados suficientes para análise.  
- O sistema exibe mensagem explicativa.  
- O ator pode escolher outra campanha ou encerrar a operação.  
- O fluxo retorna ao passo 2 ou termina.

### FE2 – Falha ao carregar os indicadores

- Ocorre no passo 4 do fluxo básico.  
- O sistema apresenta erro ao acessar os dados da campanha.  
- O sistema exibe mensagem de falha e sugere tentar novamente.  
- O fluxo retorna ao passo 3 do fluxo básico.

## 5 Pré-condições

5.1 O ator deve estar autenticado com perfil de administrador ou representante da organização vinculada à campanha.  
5.2 A campanha deve estar previamente cadastrada e com dados inseridos durante sua execução.

## 6 Pós-condições

6.1 O ator terá visualizado os dados consolidados e atualizados da campanha.  
6.2 Os dados exportados, se gerados, estarão disponíveis em PDF/CSV.  
6.3 A operação será registrada no log do sistema.

## 7 Pontos de extensão

### 7.1 Exportar relatório completo

- Local: após o passo 6 do fluxo básico.  
- O sistema permite a exportação de um relatório consolidado com indicadores em diferentes formatos.

### 7.2 Agendar atualização periódica

- Local: após o passo 7 do fluxo básico.  
- O ator pode optar por receber relatórios automáticos em periodicidades definidas (diária, semanal, mensal).

## 8 Requisitos especiais

8.1 Todos os dados devem ser anonimizados conforme exigência da LGPD.  
8.2 O painel deve estar disponível em modo responsivo, acessível em dispositivos móveis e áreas com conexão limitada.  
8.3 O sistema deve apresentar os dados em tempo inferior a 10 segundos para campanhas com até 20 mil registros.  
8.4 Deve haver suporte a gráficos interativos com acessibilidade (uso por teclado e descrição textual).  
8.5 Indicadores visuais devem seguir padrões de cor universal (color blindness friendly).

## 9 Informações adicionais

- Este caso de uso contribui diretamente com os objetivos estratégicos do ConnectCare, relacionados à análise de impacto social e à melhoria contínua de políticas públicas.  
- Os dados monitorados alimentam o repositório de inteligência da plataforma, podendo ser integrados com painéis de secretarias de saúde locais.  
- As campanhas monitoradas podem incluir ações como vacinação, mutirões, distribuição de medicamentos ou educação em saúde.  
- A visualização integrada e analítica das campanhas visa promover decisões baseadas em evidências para ações futuras.
