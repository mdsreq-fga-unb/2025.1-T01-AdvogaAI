## Extreme Programing

### 10.2 Atas de Reunião – Ciclos XP (Maio 2025)

# 🗓️ 27/05/2025 (Terça-feira) – Reunião de Acompanhamento Interno

**Objetivo:**  
Alinhar responsabilidades da sprint atual com base no cronograma

**Participantes:**  
Equipe de desenvolvimento

---

## Pontos discutidos:

- Distribuição de tarefas com base no cronograma
- Organização das frentes de desenvolvimento

---

## Decisões:

- **Ana** e **Vitor** ficarão encarregados do **deploy**, **login**, **logout** e funcionalidades correlatas
- **Ian**, **Lucas** e **Mateus Magno** atuarão diretamente na resolução das **issues abertas**
- **Nathan** será responsável pela implementação e acompanhamento dos **testes automatizados**

---

## Encaminhamentos:

- Início imediato das tarefas conforme divisão acordada
- Acompanhamento das entregas no próximo encontro de equipe

# 🗓️ 03/06/2025 (Terça-feira) – Reunião de Planejamento da Sprint (Sprint Planning)

**Objetivo:**
Planejar um sprint de "Sprint 0" ou "Sprint de Base" para o CRUD de Clientes, focando em preparar todo o necessário antes de escrever o código da funcionalidade.

**Participantes:**
Equipe de desenvolvimento

**Pontos discutidos:**
Análise aprofundada das User Stories do CRUD de Clientes para garantir o entendimento completo dos requisitos.
Definição de um Sprint Goal focado na preparação: "Ao final do sprint, teremos o modelo de dados definido, o contrato da API estabelecido e um protótipo de alta fidelidade validado para o fluxo completo do CRUD de Clientes."
Identificação de todas as tarefas de pesquisa, design e arquitetura necessárias.

**Decisões:**
A equipe se compromete com o Sprint Goal de preparação.
As tarefas de design do protótipo no Figma serão a prioridade inicial.
A definição do schema do banco de dados será feita em paralelo ao design.

**Encaminhamentos:**
Ana e Mateus Magno ficarão responsáveis por criar o protótipo de alta fidelidade das telas no Figma.
Yan e Lucas iniciarão o rascunho da estrutura da tabela clients no banco de dados.
Agendar uma reunião técnica para quinta-feira para discutir a arquitetura da API.

# 🗓️ 05/06/2025 (Quinta-feira) – Reunião de Arquitetura de Dados

**Objetivo:**
Definir e aprovar o schema da tabela de "Clientes" no banco de dados.

**Participantes:**
Equipe de desenvolvimento

**Pontos discutidos:**
Discussão sobre cada campo necessário para a tabela: name, email, document_type (CPF/CNPJ), document_number, status, etc.
Definição dos tipos de dados (VARCHAR, ENUM, BOOLEAN) e constraints (NOT NULL, UNIQUE).
Análise de possíveis relacionamentos com outras tabelas (ex: users, processes).
**Decisões:**
O schema da tabela clients foi aprovado pela equipe.
O campo document_number será criptografado no banco de dados por razões de segurança.
A tabela terá um campo status do tipo ENUM com os valores ('ACTIVE', 'INACTIVE', 'PROSPECT').
**Encaminhamentos:**
Lucas ficará responsável por escrever e commitar o arquivo de migração do banco de dados (usando Prisma, TypeORM, etc.).
Ana e Mateus usarão os campos definidos para finalizar o protótipo do formulário.

# 🗓️ 12/06/2025 (Quinta-feira) – Reunião de Validação de Protótipo e API

**Objetivo:**
Revisar o protótipo de alta fidelidade e definir o contrato dos endpoints da API para o CRUD.

**Participantes:**
Equipe de desenvolvimento

**Pontos discutidos:**

Apresentação do protótipo navegável no Figma, demonstrando o fluxo completo de criação, visualização, edição e exclusão.
Discussão sobre os endpoints necessários: POST /clients, GET /clients, GET /clients/:id, PUT /clients/:id, DELETE /clients/:id.
Definição dos DTOs (Data Transfer Objects) para as requisições e dos formatos de resposta (JSON).

**Decisões:**
O protótipo visual foi aprovado internamente.
O contrato da API foi finalizado e documentado no Postman/Swagger da equipe.
Vitor irá apresentar o protótipo para a cliente na próxima reunião para obter a validação final antes do desenvolvimento.

**Encaminhamentos:**
Yan e Lucas podem iniciar a criação do "esqueleto" dos serviços e controladores no backend com base no contrato da API.
Nathan utilizará o contrato da API para começar a planejar os testes de integração.

# 🗓️ 19/06/2025 (Quinta-feira) – Reunião com a Cliente

**Objetivo:**
Apresentar e validar o protótipo final do CRUD de Clientes antes de iniciar a codificação.

**Participantes:**
Equipe + Cliente

**Pontos discutidos:**

Demonstração do protótipo navegável, explicando cada passo do fluxo para a cliente.
Coleta de feedback sobre a clareza das informações, layout dos formulários e experiência do usuário.
Confirmação de que o protótipo atende a todos os requisitos de negócio discutidos anteriormente.

**Decisões:**

A cliente aprovou o protótipo e deu o "sinal verde" para o início do desenvolvimento.
Foi solicitado que o botão "Salvar" ficasse desabilitado até que todos os campos obrigatórios do formulário fossem preenchidos.

**Encaminhamentos:**
A observação da cliente sobre o botão "Salvar" foi adicionada aos critérios de aceitação da User Story correspondente.

# 🗓️ 24/06/2025 (Terça-feira) – Reunião com a equipe

**Objetivo:**
Sprint review e sprint planning

**Participantes:**
Equipe

**Pontos discutidos:**

Demonstração das funcionalidades feitas na sprint passada
Delegação de issues para cada membro do grupo

**Decisões:**

A equipe foi dividida em 2 grupos, backend e frontend, assim para desenvolver as funcionalidades de cada lado

**Encaminhamentos:**
Desenvolver as funcionalidades

# 🗓️ 26/06/2025 (Quinta-feira) – Reunião com a equipe

**Objetivo:**
Acompanhamento do desenvolvimento feito pela equipe

**Participantes:**
Equipe

**Pontos discutidos:**

Demonstração do que ja foi feito em quesito das funcionalidades
Retirada de duvidas restantes e validações de regra de negócio

**Decisões:**

Continuar o desenvolvimento

**Encaminhamentos:**
Todos vão continuar o desenvolvimento

# 🗓️ 01/07/2025 (Terça-feira) – Reunião com a Cliente

**Objetivo:**
Apresentar e validar as funcionalidades desenvolvidas na sprint e realizar a planning da proxima

**Participantes:**
Equipe + Cliente

**Pontos discutidos:**

Demonstração completa das funcionalidades ao vivo
Delegação de issues para cada grupo (front e back)

**Decisões:**

A cliente aprovou as funcionalidades e iremos seguir com o cronograma para a proxima sprint

**Encaminhamentos:**
Mesmos grupos feito anteriormente irão desenvolver o backend e o frontend das issues definidas no cronograma

# 🗓️ 03/07/2025 (Quinta-feira) – Reunião com a equipe

**Objetivo:**
Discutir sobre o acesso a API do PJe

**Participantes:**
Equipe

**Pontos discutidos:**

Possibilidade de não ter acesso a api do PJe
Mockar dados de processos para exemplo ou retirar do backlog?

**Decisões:**

Vamos conversar com o cliente e com o professor para entender o melhor caminho

**Encaminhamentos:**
Todos conversarem com o professor e cliente

# 🗓️ 08/07/2025 (Terça-feira) – Reunião com a equipe

**Objetivo:**
Discutir sobre o acesso a API do PJe

**Participantes:**
Equipe

**Pontos discutidos:**

Conseguimos acesso a api, e agora?
Quem vai integrar?

**Decisões:**

Vamos fazer a integração com a api do pje

**Encaminhamentos:**
Ana Luiza e Vitor vão integrar com a api do pje

# 🗓️ 10/07/2025 (Terça-feira) – Reunião com a cliente

**Objetivo:**
Apresentar as funcionalidades para a cliente

**Participantes:**
Equipe + Cliente

**Pontos discutidos:**

Feedbacks do cliente sobre a integração com a api do pje

**Decisões:**

MVP finalizado

**Encaminhamentos:**
Nenhum

# Dailys por pessoa

## Magno
2025-06-25: Planejamento estratégico para orientar as próximas atividades da sprint (definição de prioridades e entregas)  
2025-06-27: Dia cheio de compromissos acadêmicos, sem avançar em tarefas do projeto  
2025-06-28: Preparação do ambiente de dev interrompida por imprevisto; definição de metas para manhã seguinte  

## Valerio
2025-06-25: Revisão do PR da Ana – correção de conflitos e bugs de merge, deploy para branch dev  
2025-06-26: Brainstorm sobre estrutura de buckets no MinIO; esboço do schema Prisma e início da tela de edição de perfil  
2025-06-30: Estudo do código da sprint; integração back/front dos modelos de documentos (REST endpoints + formulários React)  
2025-07-01: Conclusão da integração completa front/back de modelos de documentos; testes manuais de fluxo CRUD  
2025-07-05: Preenchimento em lote de documentos; planejamento da persistência em MinIO; levantamento de requisitos para pessoa jurídica  
2025-07-06: Finalização das issues previstas; ajustes finais para PJ; mock do front de processos; alinhamento com o professor  

## Nathan
2025-06-25: Tentativa de rodar o projeto – identificação e relatório de erros de ambiente  
2025-06-26: Feedback na daily sobre ausência de progresso; alinhamento de expectativas com o time  
2025-06-27: Deploy local bem-sucedido; validação básica das rotas  
2025-06-28: Pair programming com Ana Luiza e Yan – implementação parcial da funcionalidade de exclusão de documentos  

## Lucas
2025-06-25: Nenhuma atividade registrada no projeto  
2025-06-30: Revisão do código da sprint; documentação de pontos de atenção para refatoração  

## Yan
2025-06-25: Planejamento de divisão de tarefas e definição de responsabilidades entre os membros  
2025-06-26: Configuração do ambiente de desenvolvimento completo (Node, Docker, banco local)  
2025-06-27: Sem progresso reportado nesta data  

## Ana Luiza
2025-06-25: Refatoração da criação de clientes – uso de React Query para cache e otimização de performance; definição do schema de documentos  
2025-06-26: Configuração do container MinIO no Docker; ajustes no schema Prisma para suportar storage de arquivos  
2025-06-27: Sem progresso reportado nesta data  

## Dias sem daily (equipe)
2025-06-29: Foco em resolução de exercícios da matéria; sem daily formal  
2025-07-02: Atividades acadêmicas – revisão de conteúdos da disciplina  
2025-07-03: Atividades acadêmicas – preparação para provas  
2025-07-04: Atividades acadêmicas – trabalhos em grupo  

## Dailys adicionais (equipe)
2025-07-07: Reunião de alinhamento do sprint e definição das tarefas finais  
2025-07-08: Implementação de testes unitários para CRUD de documentos e correção de bugs no upload do MinIO  
2025-07-09: Configuração do pipeline de CI/CD no GitHub Actions para ambiente de staging  
2025-07-10: Code freeze, revisão de user stories e preparação da demo  

