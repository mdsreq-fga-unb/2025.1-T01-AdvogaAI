# Especificação de Caso de Uso: Consultar pontos de fidelidade  

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
Este caso de uso permite ao paciente autenticado consultar seus pontos de fidelidade acumulados na plataforma ConnectCare. Esses pontos são obtidos a partir de ações de engajamento em saúde, como participação em campanhas comunitárias, comparecimento a consultas e feedbacks de atendimento. O objetivo é promover a fidelização, incentivar comportamentos saudáveis e permitir benefícios atrelados aos pontos.

## 2. Fluxo básico de eventos  
1. O caso de uso inicia-se quando o paciente acessa a plataforma ConnectCare e seleciona a funcionalidade "Consultar pontos de fidelidade" no menu do usuário.  
2. O sistema verifica se o usuário está autenticado. Caso não esteja, redireciona para o caso de uso "Realizar login" (FE1).  
3. O sistema recupera do banco de dados o histórico de pontos do paciente.  
4. O sistema apresenta na tela os seguintes dados:  
   - Total de pontos acumulados.  
   - Pontos utilizados.  
   - Saldo disponível.  
   - Histórico das ações que geraram os pontos (data, ação, quantidade).  
   - Pontos com data de expiração próxima.  
5. O paciente pode filtrar o histórico por período, tipo de ação ou status (utilizado/pendente). (FA1)  
6. O paciente pode clicar em “Detalhes” de cada linha para visualizar informações adicionais da ação que gerou os pontos (FA2).  
7. O sistema exibe, ao final da tela, orientações sobre como acumular mais pontos e onde resgatá-los.  
8. O paciente finaliza a consulta e pode retornar ao menu principal da plataforma.

## 3. Fluxos alternativos  

### FA1 – Aplicação de filtros ao histórico de pontos  
* Extensão do passo 5 do fluxo básico.  
1. O paciente seleciona um ou mais filtros.  
2. O sistema aplica os critérios e atualiza a exibição do histórico.  
3. O paciente pode limpar filtros a qualquer momento para retornar à visualização completa.

### FA2 – Visualizar detalhes de uma ação que gerou pontos  
* Extensão do passo 6 do fluxo básico.  
1. O paciente seleciona um item do histórico.  
2. O sistema exibe uma janela modal com:  
   - Nome e tipo da ação (ex: campanha de vacinação).  
   - Data de realização.  
   - Local da ação.  
   - Profissional vinculado (se aplicável).  
   - Valor em pontos gerado.  
   - Status (validado, pendente ou expirado).  

## 4. Fluxos de exceção  

### FE1 – Usuário não autenticado  
* Referente ao passo 2 do fluxo básico.  
1. Se o usuário não estiver autenticado, o sistema redireciona automaticamente para o caso de uso “Realizar login”.  
2. Após o login com sucesso, o sistema retorna automaticamente à funcionalidade “Consultar pontos de fidelidade”.  
3. Se o login falhar ou for cancelado, o sistema exibe mensagem de erro e não realiza a consulta.

### FE2 – Falha na recuperação de dados  
* Pode ocorrer no passo 3 do fluxo básico.  
1. Se houver falha de conexão ou erro interno ao recuperar os dados do banco, o sistema exibe a mensagem: “Não foi possível recuperar seus pontos de fidelidade no momento. Tente novamente mais tarde.”  
2. O usuário pode tentar novamente ou retornar ao menu principal.

## 5. Pré-condições  
- O paciente deve estar previamente cadastrado no ConnectCare.  
- O paciente deve ter realizado login válido e ativo na sessão atual.  

## 6. Pós-condições  
- Os pontos de fidelidade são exibidos ao paciente.  
- Nenhum dado é alterado durante a execução deste caso de uso.  

## 7. Pontos de extensão  
- Integração com o caso de uso “Realizar login”, no FE1.  
- Integração com o caso de uso “Participar de campanha de saúde”, como fonte de geração de pontos (referenciado nos detalhes de histórico).  

## 8. Requisitos especiais  
- A consulta de pontos deve estar disponível mesmo com baixa largura de banda.  
- A tela deve estar adaptada a dispositivos móveis com interface responsiva.  
- Os dados de fidelidade devem ser protegidos por autenticação e respeitar as normas da LGPD.  
- Os pontos com data de expiração menor que 30 dias devem ser destacados visualmente.  

## 9. Informações adicionais  
- A lógica de expiração de pontos segue a política: validade de 12 meses corridos após geração.  
- Os pontos são sincronizados com o sistema de parceiros (ex: farmácias) a cada 24 horas.  
- A consulta não exige sincronização em tempo real, mas alerta o usuário caso os dados estejam com mais de 24h de defasagem.  
