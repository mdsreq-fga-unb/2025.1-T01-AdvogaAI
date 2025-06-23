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
