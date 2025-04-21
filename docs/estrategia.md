| Data       | Versão | Descrição                          | Autor                    |
|------------|--------|------------------------------------|--------------------------|
| 21/04/2025 | *1.1*  | Adição sessão 3 - Estratégia        | Ana Luiza Pfeilsticker   |

# III. ESTRATÉGIAS DE ENGENHARIA DE SOFTWARE

### 3.1 Estratégia priorizada

**Abordagem**: Ágil  
**Ciclo de vida**: Ágil  
**Processo de engenharia de software**: ScrumXP

---

### 3.2 Quadro comparativo

O quadro a seguir apresenta características comparativas entre os processos: **RAD** e **ScrumXP**, visando auxiliar o entendimento da escolha mais adequada de processo ao caso do **AdvogaAI**.

| *Características*                      | *RAD (Rapid Application Development)*                                               | *ScrumXP*                                                                       |
|---------------------------------------|-------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| **Abordagem Geral**                   | Focado em desenvolvimento rápido com uso intensivo de prototipação.                | Ágil com foco em entregas rápidas e feedback contínuo.                          |
| **Foco em Arquitetura**               | Baixo foco em arquitetura no início, priorizando entregas rápidas com protótipos.  | Evolução da arquitetura ao longo do tempo e conforme a necessidade.            |
| **Estrutura de Processos**            | Baseado em fases como modelagem, prototipação, testes e iteração rápida.           | Focado em sprints curtos e flexíveis (2-4 semanas) com entregas incrementais.   |
| **Flexibilidade de Requisitos**       | Alta flexibilidade, com requisitos evoluindo conforme os protótipos são testados.  | Alta flexibilidade com adaptação contínua dos requisitos a cada sprint.         |
| **Colaboração com Cliente**           | Envolvimento frequente durante as fases de prototipação e testes.                  | Envolvimento constante, com feedback ao final de cada sprint.                   |
| **Complexidade do Processo**          | Processo simples e rápido, com pouca formalidade e foco na velocidade.             | Leve e ágil, com foco na entrega funcional e adaptação contínua.                |
| **Qualidade Técnica**                 | Qualidade validada com testes rápidos sobre os protótipos.                         | Alta ênfase em qualidade com TDD, integração contínua e pair programming.       |
| **Práticas de Desenvolvimento**       | Foco em ciclos rápidos de prototipagem e testes, com menos práticas estruturadas.  | TDD, refatoração contínua, integração contínua e pair programming.              |
| **Adaptação ao Projeto AdvogaAI**     | Útil para gerar protótipos rápidos da interface e validar ideias com usuários.     | Ideal para evolução contínua da plataforma com qualidade e feedbacks.           |
| **Documentação**                      | Documentação mínima, focada em protótipos e requisitos emergentes.                 | Documentação reduzida, centrada no essencial e comunicação ágil.                |
| **Controle de Qualidade**             | Baseado em revisões de protótipos e feedback do cliente.                           | Embutido com testes automatizados e práticas ágeis de qualidade.                |
| **Escalabilidade**                    | Limitado a projetos de menor escala e com menos complexidade técnica.              | Escalável, indicado para equipes pequenas e médias com foco em colaboração.     |
| **Suporte a Equipes de Desenvolvimento** | Adequado para equipes pequenas com foco em entrega rápida.                   | Ideal para equipes colaborativas, com papéis flexíveis e alta comunicação.      |

---

### 3.3 Apoio na Escolha: Análise com Base no Framework de Gupta (2008)

Segundo **Gupta (2008)**, a escolha do processo ideal de desenvolvimento de software deve considerar critérios como:

- características dos requisitos,
- perfil da equipe de desenvolvimento,
- envolvimento do usuário,
- tipo de projeto,
- riscos envolvidos.

Com base nesses critérios, foi construído o seguinte quadro para avaliar os modelos tradicionais em relação às necessidades do projeto AdvogaAI:

#### Características dos Requisitos

| Requisitos                                                           | Cascata | Prototipação | Iterativo e Incremental | Evolutivo | Spiral | RAD  |
|----------------------------------------------------------------------|---------|--------------|--------------------------|-----------|--------|------|
| Os requisitos são facilmente compreensíveis e definidos? (**Não**)   | ❌      | ✅           | ✅                       | ✅        | ✅     | ❌   |
| Mudamos os requisitos com bastante frequência? (**Sim**)             | ✅      | ❌           | ✅                       | ✅        | ❌     | ✅   |
| Podemos mudar os requisitos no início do ciclo? (**Sim**)            | ✅      | ❌           | ✅                       | ✅        | ❌     | ✅   |
| Os requisitos indicam um sistema complexo a ser construído? (**Não**) | ❌      | ✅           | ✅                       | ✅        | ✅     | ❌   |


#### Status da Equipe de Desenvolvimento

| Requisitos                                                                      | Cascata | Prototipação | Iterativo e Incremental | Evolutivo | Spiral | RAD  |
|---------------------------------------------------------------------------------|---------|--------------|--------------------------|-----------|--------|------|
| Menos experiência em projetos similares (**Não**)                               | ✅      | ❌           | ✅                       | ✅        | ❌     | ✅   |
| Menos conhecimento de domínio (novidade na tecnologia) (**Não**)                | ✅      | ❌           | ✅                       | ✅        | ✅     | ❌   |
| Menos experiência nas ferramentas a serem utilizadas (**Não**)                  | ✅      | ❌           | ❌                       | ❌        | ✅     | ❌   |
| Disponibilidade de treinamento, se necessário (**Sim**)                         | ❌      | ❌           | ✅                       | ✅        | ❌     | ✅   |

#### Envolvimento do Usuário

| Requisitos                                                                 | Cascata | Prototipação | Iterativo e Incremental | Evolutivo | Spiral | RAD  |
|----------------------------------------------------------------------------|---------|--------------|--------------------------|-----------|--------|------|
| Envolvimento do usuário em todas as fases (**Sim**)                        | ✅      | ❌           | ✅                       | ✅        | ✅     | ❌   |
| Participação limitada do usuário (**Não**)                                 | ❌      | ✅           | ❌                       | ❌        | ❌     | ✅   |
| O usuário não tem experiência prévia em projeto semelhante (**Não**)       | ✅      | ❌           | ❌                       | ❌        | ❌     | ✅   |
| Os usuários são especialistas no domínio do problema (**Sim**)             | ✅      | ❌           | ✅                       | ✅        | ✅     | ❌   |


####  Tipo de Projeto e Risco Associado

| Requisitos                                                                    | Cascata | Prototipação | Iterativo e Incremental | Evolutivo | Spiral | RAD  |
|-------------------------------------------------------------------------------|---------|--------------|--------------------------|-----------|--------|------|
| O projeto é aprimoramento do sistema existente (**Não**)                      | ❌      | ❌           | ✅                       | ✅        | ❌     | ✅   |
| O financiamento é estável para o projeto (**Sim**)                            | ✅      | ✅           | ❌                       | ❌        | ❌     | ✅   |
| Altos requisitos de confiabilidade (**Sim**)                                  | ❌      | ❌           | ✅                       | ✅        | ✅     | ❌   |
| Cronograma do projeto apertado (**Sim**)                                      | ❌      | ✅           | ✅                       | ✅        | ✅     | ✅   |
| Uso de componentes reutilizáveis (**Não**)                                    | ❌      | ✅           | ❌                       | ❌        | ✅     | ✅   |
| Os recursos (tempo, dinheiro, pessoas etc.) são escassos (**Sim**)            | ❌      | ✅           | ❌                       | ❌        | ✅     | ❌   |


### 3.4 Justificativa Final

Com base na análise do **framework de Gupta (2008)** e no comparativo entre os processos RAD e ScrumXP, a escolha pelo **ScrumXP** se mostrou mais aderente ao projeto **AdvogaAI**.

#### Equipe Pequena e Multidisciplinar

- A equipe do projeto é reduzida e todos os membros atuam de forma colaborativa em diversas frentes (backend, frontend, design e testes). O ScrumXP valoriza exatamente esse tipo de estrutura horizontal.
- O RAD funciona melhor em equipes segmentadas por fases (análise, design, prototipagem), o que não se encaixa na dinâmica do projeto.

#### Entrega Contínua com Validação Frequente

- A cliente Hermínia estará disponível frequentemente para validar o progresso. O ScrumXP permite entregas incrementais e testáveis em cada sprint.
- No RAD, a validação tende a ocorrer após protótipos mais completos, dificultando o feedback contínuo.

#### Crescimento Progressivo

- O objetivo do projeto é crescer funcionalidade por funcionalidade, mantendo sempre uma versão utilizável e funcional.
- O ScrumXP sustenta esse tipo de crescimento técnico e de produto, enquanto o RAD foca mais em prototipagem rápida.

#### Foco em Valor e Qualidade

- O projeto exige simplicidade, agilidade e foco em valor real para o usuário. O ScrumXP oferece isso com práticas como TDD, integração contínua e feedback constante.
- O RAD não prioriza escalabilidade e qualidade técnica da mesma forma, o que poderia comprometer o crescimento sustentável do AdvogaAI.

### Conclusão

| Processo                    | Pontuação |
|-----------------------------|-----------|
| Cascata                     | 8         |
| Prototipação                | 10        |
| Iterativo e Incremental     | **12**    |
| Evolutivo                   | 11        |
| Spiral                      | 11        |
| RAD                         | 9         |

Ao analisar cada um dos critérios no contexto do projeto **AdvogaAI**, a abordagem com maior aderência foi a **Iterativa e Incremental**, totalizando 12 pontos.

Essa abordagem permite o **desenvolvimento progressivo de funcionalidades**, com **validações frequentes do cliente**, **alta qualidade técnica** e **capacidade de adaptação às mudanças**. Além disso, ela está alinhada aos princípios do **ScrumXP**, que foi adotado como processo de engenharia de software para o projeto.

