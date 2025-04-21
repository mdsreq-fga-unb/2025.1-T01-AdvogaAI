| Data       | Versão | Descrição                          | Autor                    |
|------------|--------|------------------------------------|--------------------------|
| 21/04/2025 | *1.1* | Adição sessão 3  - Estratégia       | Ana Luiza Pfeilsticker   |

# III ESTRATÉGIAS DE ENGENHARIA DE SOFTWARE

### 3.1 Estratégia priorizada

*Abordagem*: Ágil
*Ciclo de vida*: Ágil
*Processo de engenharia de software*: ScrumXP

### 3.2 Quadro comparativo

O quadro a seguir apresenta características comparativas entre os processos: RAD e ScrumXP, visando auxiliar o entendimento da escolha mais adequada de processo ao caso do AdvogaAI.

| *Características*                  | *RAD (Rapid Application Development)*                                               | *ScrumXP*                                                                 |
|-------------------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| *Abordagem Geral*                 | Focado em desenvolvimento rápido com uso intensivo de prototipação.                   | Ágil com foco em entregas rápidas e feedback contínuo.                      |
| *Foco em Arquitetura*             | Baixo foco em arquitetura no início, priorizando entregas rápidas com protótipos.     | Evolução da arquitetura ao longo do tempo e conforme a necessidade.        |
| *Estrutura de Processos*          | Baseado em fases como modelagem, prototipação, testes e iteração rápida.              | Focado em sprints curtos e flexíveis (2-4 semanas) com entregas incrementais. |
| *Flexibilidade de Requisitos*     | Alta flexibilidade, com requisitos evoluindo conforme os protótipos são testados.     | Alta flexibilidade com adaptação contínua dos requisitos a cada sprint.     |
| *Colaboração com Cliente*         | Envolvimento frequente durante as fases de prototipação e testes.                     | Envolvimento constante, com feedback ao final de cada sprint.               |
| *Complexidade do Processo*        | Processo simples e rápido, com pouca formalidade e foco na velocidade.                | Leve e ágil, com foco na entrega funcional e adaptação contínua.            |
| *Qualidade Técnica*               | Qualidade validada com testes rápidos sobre os protótipos.                            | Alta ênfase em qualidade com TDD, integração contínua e pair programming.   |
| *Práticas de Desenvolvimento*     | Foco em ciclos rápidos de prototipagem e testes, com menos práticas estruturadas.     | TDD, refatoração contínua, integração contínua e pair programming.          |
| *Adaptação ao Projeto AdvogaAI*   | Útil para gerar protótipos rápidos da interface e validar ideias com usuários.        | Ideal para evolução contínua da plataforma com qualidade e feedbacks.       |
| *Documentação*                    | Documentação mínima, focada em protótipos e requisitos emergentes.                    | Documentação reduzida, centrada no essencial e comunicação ágil.            |
| *Controle de Qualidade*           | Baseado em revisões de protótipos e feedback do cliente.                              | Embutido com testes automatizados e práticas ágeis de qualidade.            |
| *Escalabilidade*                  | Limitado a projetos de menor escala e com menos complexidade técnica.                 | Escalável, indicado para equipes pequenas e médias com foco em colaboração. |
| *Suporte a Equipes de Desenvolvimento* | Adequado para equipes pequenas com foco em entrega rápida.                     | Ideal para equipes colaborativas, com papéis flexíveis e alta comunicação.  |


### 3.3 Justificativa

O processo ScrumXP foi escolhido como o mais adequado ao desenvolvimento do projeto AdvogaAI por refletir com mais precisão a realidade da equipe e os objetivos da solução. Em comparação ao RAD (Rapid Application Development), o ScrumXP oferece benefícios claros no contexto específico do projeto:

#### Equipe Pequena e Multidisciplinar

 - A equipe do projeto é reduzida e todos os membros atuam de forma colaborativa em diversas frentes (backend, frontend, design e testes). O ScrumXP valoriza exatamente esse tipo de estrutura horizontal, com papeis flexíveis e integração entre os envolvidos.


 - O RAD funciona melhor em equipes segmentadas por fases (análise, design, prototipagem), o que não se encaixa bem na dinâmica colaborativa adotada no AdvogaAI.

#### Entrega Contínua de Funcionalidades com Validação Frequente

 - A cliente Hermínia estará disponível com frequência para validar o progresso da aplicação. O ScrumXP permite entregas incrementais e funcionais a cada sprint, possibilitando que ela acompanhe e teste partes reais do sistema desde o início.


 - No RAD, a validação tende a acontecer após protótipos mais completos, o que dificulta o envolvimento constante do cliente e reduz a capacidade de ajustar funcionalidades com base no uso real.

#### Crescimento Progressivo do Produto

 - O projeto não será entregue todo de uma vez. O objetivo é desenvolver o sistema funcionalidade por funcionalidade, garantindo que cada parte seja implementada, testada, validada e integrada ao todo, mantendo sempre uma versão utilizável da plataforma.


 - O ScrumXP é ideal para esse cenário, pois cada sprint resulta em um incremento funcional. Já o RAD costuma priorizar o desenvolvimento rápido de protótipos completos, o que dificulta a manutenção de uma base de código estável e em constante evolução.

#### Simplicidade, Agilidade e Foco em Valor

 - O projeto exige uma abordagem ágil, leve e centrada na entrega de valor real. O ScrumXP foca na entrega contínua de partes úteis da aplicação, mantendo a cliente sempre no centro do processo.


 - O RAD, embora ágil, carece de práticas voltadas à evolução estruturada do software e não prioriza qualidade técnica e escalabilidade a longo prazo, pontos essenciais para o sucesso do AdvogaAI.
