# ConnectCare  

# Especificação de Caso de Uso: Gerenciar campanha de saúde  

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

Este caso de uso descreve como uma organização parceira ou um administrador do sistema ConnectCare registra, publica, atualiza e monitora campanhas de saúde comunitárias (como mutirões, campanhas de vacinação e ações educativas), visando o engajamento da população local da Vila Esperança. As campanhas são associadas a um público-alvo, localização, datas e métricas de avaliação.

## 2. Fluxo básico de eventos

1. O ator (organização parceira ou administrador) acessa a área de gerenciamento de campanhas (FE1).  
2. O sistema exibe a lista de campanhas já cadastradas, com opção para criar nova campanha, editar ou remover existentes.  
3. O ator escolhe a opção "Criar nova campanha".  
4. O sistema apresenta o formulário de criação de campanha.  
5. O ator preenche os seguintes dados obrigatórios da campanha (FA1, FE2):  
   - Título da campanha  
   - Descrição  
   - Tipo de campanha (vacinação, exame, palestra etc.)  
   - Público-alvo (faixa etária, condição de saúde, localização)  
   - Local de realização (com georreferenciamento)  
   - Data e horário de início e fim  
   - Capacidade estimada de atendimento  
   - Informações adicionais como documentos obrigatórios  
6. O ator confirma os dados e clica em “Salvar campanha”.  
7. O sistema valida os dados obrigatórios (FE2).  
8. O sistema salva os dados e publica a campanha para os usuários elegíveis.  
9. O sistema gera notificações automáticas para usuários do público-alvo com base nos filtros informados.  
10. O ator pode, a qualquer momento, consultar o painel analítico da campanha para visualizar dados como número de visualizações, inscrições, avaliações e comparecimentos (FA2).  
11. O ator pode encerrar ou arquivar uma campanha após sua finalização.  

## 3. Fluxos alternativos

### FA1 – Dados opcionais ou complementares

Ocorre no passo 5 do fluxo básico.  
- O ator pode preencher dados complementares, como imagens ilustrativas, parceiros envolvidos, metas de cobertura, contato de referência.  
- O sistema armazena essas informações, mas não as utiliza para filtrar o público-alvo.  

### FA2 – Monitoramento contínuo de campanhas ativas

Ocorre no passo 10 do fluxo básico.  
- O ator pode acessar em tempo real o painel com métricas como:  
  - Total de notificações enviadas  
  - Número de usuários que visualizaram  
  - Número de inscrições confirmadas  
  - Taxa de comparecimento (atualizada após integração com registros de atendimento)  
  - Notas médias dadas pelos participantes  
- O ator pode exportar esses dados em planilhas para uso externo.  

## 4. Fluxos de exceção

### FE1 – Falha de autenticação ou sessão expirada

Ocorre no passo 1 do fluxo básico.  
- Se o ator tentar acessar o módulo sem estar autenticado, o sistema redireciona para a tela de login.  
- Caso a sessão tenha expirado, o sistema solicita nova autenticação.  

### FE2 – Dados inválidos ou incompletos na criação de campanha

Ocorre no passo 7 do fluxo básico.  
- O sistema identifica campos obrigatórios não preenchidos ou dados inválidos (ex: data de término anterior à de início, capacidade menor que 1).  
- O sistema exibe mensagens de erro específicas em cada campo e impede o salvamento até correção.  

## 5. Pré-condições

- O ator deve estar autenticado como representante de organização parceira ou como administrador do sistema.  
- O sistema deve estar funcional e com acesso à base de dados.  

## 6. Pós-condições

- A campanha é criada, armazenada no sistema e publicada para o público-alvo.  
- Notificações são geradas automaticamente para os usuários elegíveis.  
- Métricas de participação tornam-se disponíveis para acompanhamento.  

## 7. Pontos de extensão

### PE1 – Avaliar campanha de saúde

Local do ponto de extensão: após a execução da campanha, usuários participantes são convidados a avaliar.  
- Extensão do caso de uso “Avaliar campanha de saúde”.  
- Inclui envio de formulário com escala de satisfação e espaço para comentários.  

## 8. Requisitos especiais

- O sistema deve permitir filtros geográficos com base em coordenadas e CEPs das campanhas.  
- O mecanismo de notificação deve usar lógica baseada em perfis (idade, saúde, localização).  
- A interface de registro de campanhas deve funcionar em dispositivos móveis com baixa largura de banda.  
- O painel analítico deve ser atualizado em tempo real ou com atraso máximo de 10 minutos.  

## 9. Informações adicionais

- O caso de uso se relaciona diretamente com os objetivos de negócio 3 e 5 do projeto ConnectCare.  
- Pode haver integração futura com sistemas externos de registros de vacinação e atendimento.  
- A visibilidade da campanha entre usuários depende de critérios de elegibilidade definidos no cadastro.  
- Recomenda-se uso de diagramas de atividade complementares para visualização do fluxo entre estados da campanha (criação, ativa, encerrada, arquivada).  
