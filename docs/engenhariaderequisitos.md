## 4. Estratégias de Engenharia de Requisitos

### 4.1 Atividades e Técnicas de Engenharia de Requisitos

#### 4.1.1 Elicitação e Descoberta

**Brainstorming:** Utilizada como técnica inicial de geração de ideias e compreensão ampla das necessidades do cliente. Foi aplicada em reuniões abertas com a participação da equipe de desenvolvimento e da cliente, permitindo a coleta de expectativas, dores e desejos em relação ao produto.

**Entrevistas com a Cliente:** Entrevistas semiestruturadas foram conduzidas com a cliente para detalhar fluxos de trabalho, problemas enfrentados e funcionalidades desejadas. As entrevistas orientaram o entendimento do contexto jurídico do produto e forneceram a base para as primeiras User Stories.

### 4.1.2 Análise e Consenso

**Negociação com Stakeholders:** A definição do escopo do MVP foi fruto de negociação direta com a cliente, levando em conta a capacidade da equipe, o valor de negócio e a urgência das funcionalidades.

### 4.1.3 Declaração

**User Stories com INVEST:** Os requisitos funcionais foram documentados como User Stories, respeitando o modelo INVEST (Independente, Negociável, Valiosa, Estimável, Sucinta e Testável). 

### 4.1.4 Representação

**Prototipação de Alta Fidelidade:** Utilizamos componentes prontos e mockups navegáveis para representar a interface e o comportamento esperados. As telas foram validadas em conjunto com a cliente ao longo dos ciclos de RAD.

### 4.1.5 Verificação e Validação

**Feedback Contínuo:** A cada novo protótipo desenvolvido, a cliente foi envolvida em testes exploratórios e revisões para validar o alinhamento com suas expectativas.

**Critérios de Aceitação:** Cada User Story possui critérios de aceitação definidos em conjunto com a cliente, garantindo clareza quanto à finalização e validação da funcionalidade.

**Definition of Ready e Done:** As histórias de usuário passam pelos critérios de DoR antes de entrarem na sprint e são consideradas concluídas apenas quando cumprem o DoD, que inclui testes, revisão de código, integração e documentação.

### 4.1.6 Organização e Atualização

**Backlog de Produto:** Todas as User Stories foram organizadas em um backlog priorizado, com base na técnica de pontuação por valor, urgência, risco, esforço e dependência.

**Revisão Contínua nas Sprints:** Durante o uso do ScrumXP, as US são refinadas em cada planning, atualizadas com base no feedback da cliente e adaptadas conforme evolução do entendimento da solução.

---

### 4.2 Engenharia de Requisitos e o Processo RAD + ScrumXP

| Fase                      | Atividade da Engenharia de Requisitos | Prática / Técnica                         | Resultado Esperado                                         |
| ------------------------- | ------------------------------------- | ----------------------------------------- | ---------------------------------------------------------- |
| Planejamento (RAD)        | Elicitação e Descoberta               | Brainstorming, Entrevistas                | Requisitos iniciais levantados e compreensão do problema   |
|                           | Análise e Consenso                    | Negociação com a cliente                  | Definição do escopo do MVP                                 |
|                           | Declaração                            | User Stories                              | Backlog inicial estruturado                                |
| User Design (RAD)         | Representação                         | Prototipação iterativa, Mockups           | Protótipos validados com a cliente                         |
|                           | Verificação e Validação               | Feedback da cliente                       | Ajustes constantes nas funcionalidades                     |
| Sprint Planning (ScrumXP) | Organização e Atualização             | Atualização do Backlog                    | US com critérios claros de aceitação e prontos para sprint |
|                           | Declaração                            | Estimativas, análise de dependências      | Sprint definida com base na prioridade e capacidade        |
| Execução da Sprint        | Representação                         | Pair Programming, Code Review             | Código testado, revisado e integrado continuamente         |
|                           | Verificação e Validação               | Integração Contínua, Testes Automatizados | Entregas incrementais validadas                            |
| Sprint Review             | Verificação e Validação               | DoD, Feedback da cliente                  | Funcionalidade validada com a cliente                      |
|                           | Organização e Atualização             | Replanejamento com base no feedback       | Backlog atualizado e sprint ajustada para o próximo ciclo  |
