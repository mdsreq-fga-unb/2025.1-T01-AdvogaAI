# ConnectCare

## Especificação de Caso de Uso: Buscar serviços de saúde

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

Este caso de uso permite ao paciente buscar serviços de saúde disponíveis próximos à sua localização, utilizando filtros como tipo de atendimento (presencial, online ou móvel), especialidade e disponibilidade. O caso contempla também o ponto de extensão **“Indicar campanha móvel”**, que apresenta ações de saúde comunitária itinerantes quando não houver serviço fixo adequado próximo.

## 2. Fluxo básico de eventos

1. O paciente acessa o sistema após autenticação válida (**FA1**, **FE1**).
2. O sistema apresenta a tela de busca de serviços de saúde.
3. O paciente preenche os filtros de busca: tipo de serviço (consulta, exame, vacinação etc.), especialidade (pediatria, clínica geral etc.), localização atual ou desejada, e se deseja incluir campanhas móveis na busca.
4. O paciente envia a solicitação de busca.
5. O sistema valida os filtros e localiza os serviços que atendem aos critérios definidos.
6. O sistema apresenta uma lista de serviços ordenados por proximidade e disponibilidade.
7. O paciente visualiza os detalhes de cada serviço, como nome, endereço, tipo de atendimento, horários disponíveis, documentos exigidos e possibilidade de agendamento.
8. O paciente seleciona um serviço desejado.
9. O sistema direciona para a tela de agendamento ou fornece o mapa com instruções de deslocamento.
10. Caso não haja serviços fixos adequados, o sistema ativa o ponto de extensão **“Indicar campanha móvel”** (**PE1**).
11. O caso de uso se encerra.

## 3. Fluxos alternativos

### 3.1 Autenticação

#### 3.1.1 FA1 – Usuário não autenticado

- **Ponto de inserção:** Passo 1 do fluxo básico  
- O paciente não está autenticado no sistema.  
- O sistema redireciona para a tela de login.  
- Após autenticação bem-sucedida, o fluxo básico é retomado a partir do passo 2.

## 4. Fluxos de exceção

### 4.1 FE1 – Autenticação inválida

- **Ponto de inserção:** Passo 1 do fluxo básico  
- O paciente insere login ou senha incorretos.  
- O sistema exibe mensagem de erro: “Usuário ou senha inválidos.”  
- O sistema permite nova tentativa (até 3 vezes).  
- Após 3 tentativas mal sucedidas, o sistema bloqueia o acesso por 15 minutos.

### 4.2 FE2 – Falha de conexão

- **Ponto de inserção:** Passos 4 e 5 do fluxo básico  
- O sistema não consegue acessar os dados por falta de internet ou problema interno.  
- O sistema apresenta a mensagem: “Erro ao acessar os dados. Verifique sua conexão e tente novamente.”  
- O fluxo é encerrado com falha.

## 5. Pré-condições

5.1 O paciente deve estar cadastrado na plataforma e autenticado no sistema.

## 6. Pós-condições

6.1 O paciente visualiza os serviços disponíveis e pode prosseguir para o agendamento ou obter informações logísticas.

## 7. Pontos de extensão

### 7.1 Indicar campanha móvel

- **Ponto de ativação:** Passo 10 do fluxo básico  
- **Condição:** Nenhum serviço fixo (posto de saúde ou clínica) atende aos critérios definidos pelo paciente.  
- **Comportamento:** O sistema verifica campanhas de saúde em andamento na região e exibe opções de atendimento móvel, como mutirões e visitas domiciliares de agentes comunitários.

## 8. Requisitos especiais

8.1 A busca deve funcionar mesmo em ambientes com conexão de internet intermitente, utilizando cache local e sincronização assíncrona quando necessário.  
8.2 O sistema deve apresentar mapa com acesso offline (em formato simplificado) para facilitar o deslocamento em regiões com baixa conectividade.  
8.3 Todos os serviços devem estar georreferenciados e categorizados conforme o tipo de atendimento.  
8.4 As campanhas móveis devem ser indexadas com público-alvo, faixa etária, requisitos de documentação e data de realização.

## 9. Informações adicionais

- O sistema pode utilizar filtros inteligentes com base no perfil do paciente (idade, doenças pré-existentes, localização).  
- As sugestões de campanha móvel utilizam dados fornecidos por organizações parceiras (ONGs, secretarias de saúde).  
- APIs externas de geolocalização e mapeamento devem ser integradas (como OpenStreetMap ou Google Maps).  
- Exemplos de serviços: consultas médicas, exames laboratoriais, vacinação, atendimento odontológico, campanhas educativas.

