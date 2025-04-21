| Data       | Versão | Descrição                          | Autor                    |
|------------|--------|------------------------------------|--------------------------|
| 04/04/2025 | **1.0** | Preenchimento da sessão de cliente | Ana Luiza Pfeilsticker   |
| 08/04/2025 | **1.0** | Adição do diagrama de Ishikawa     | Vitor Hoffmann           |
| 20/04/2025 | **1.1** | Melhoria do texto                  | Lucas                    |


# I CENÁRIO ATUAL DO CLIENTE E DO NEGÓCIO
### 1.1  Introdução ao Negócio e Contexto

Hermínia Oliveira Sociedade Unipessoal de Advocacia é um escritório de advocacia individual, conduzido exclusivamente por Hermínia Pfeilsticker Gonçalves de Oliveira, que oferece serviços jurídicos nas áreas de Direito Administrativo, Direito Trabalhista, Direito Previdenciário, Direito Tributário, Direito Civil, entre outras. Por operar como sociedade unipessoal, o escritório enfrenta limitações de atendimento e expansão.
Embora a advogada tenha uma vasta experiência adquirida ao longo de sua carreira no Judiciário Federal e Tribunal Superior do Trabalho (TST), o escritório enfrenta sérios desafios relacionados à escalabilidade de suas operações e à gestão dos processos jurídicos. A dependência de uma única profissional para lidar com todas as demandas e processos tem causado atrasos, erros e falta de organização em diversas áreas da gestão do escritório.

### 1.2 Identificação da Oportunidade ou Problema
O principal problema enfrentado pelo escritório é a falta de escalabilidade, o que afeta diretamente a eficiência e a qualidade do atendimento. A ausência de uma equipe maior e a dependência de processos manuais resultam em diversos desafios:

 - **Gestão de documentos e prazos**: A coleta de informações, elaboração e assinatura de contratos e procurações são feitas manualmente, levando em média 4 dias para conclusão. A obtenção de assinaturas também demanda tempo extra, dificultando a escalabilidade e gerando atrasos no atendimento.


 - **Comunicação e organização**: Toda a comunicação com clientes e gestão de processos é feita exclusivamente pelo WhatsApp, o que gera confusão, perda de informações e atrasos. A falta de uma triagem eficiente compromete a organização e os tempos de resposta.


 - **Gestão financeira e de pagamentos**: O controle dos pagamentos, incluindo entradas e percentagens de êxito, é feito de forma manual e informal, o que eleva o risco de erros, como perda de parcelas ou cobranças incorretas..


 - **Acompanhamento de prazos**: Não há um sistema de notificações para movimentações processuais. Hermínia precisa verificar manualmente cada processo, o que consome tempo e eleva o risco de erros ou esquecimentos.


Esses desafios resultam em atrasos no atendimento ao cliente e comprometem a qualidade do serviço, já que a advogada não consegue se dedicar adequadamente às estratégias jurídicas e ao estudo de doutrinas e jurisprudências. A falta de escalabilidade do modelo atual limita a expansão do escritório e afeta a experiência do cliente.

![Imagem do WhatsApp de 2025-04-08 à(s) 16 50 46_475cb787](https://github.com/user-attachments/assets/0cf26c76-4be3-430b-bbf1-45ba1629ee9e)
Figura 1: Diagrama de Ishikawa

**Oportunidades Identificadas:**

- **Automação de documentos**: Criação automatizada de contratos, procurações e petições.
- **Gestão de prazos**: Integração com APIs de tribunais para notificações automáticas.
- **Gestão financeira**: Controle eficiente de pagamentos e honorários.

### 1.3 Desafios do Projeto

O desenvolvimento da plataforma enfrenta três desafios principais:

1. **Integração com a API do PJe**: Garantir uma integração segura e eficiente para o acompanhamento automático das movimentações processuais e prazos.
2. **Escalabilidade futura**: Criar uma solução que cresça à medida que o escritório se expande e que possa ser comercializada para outros escritórios unipessoais.
3. **Intuitividade da plataforma**: Garantir que a plataforma seja fácil de usar para advogados e clientes, mesmo os com pouca experiência tecnológica.

### 1.4 Segmentação de Clientes

O público-alvo da solução proposta é dividido em dois principais grupos:

1. **Advogados Unipessoais**: Formado por advogados com perfil semelhante ao de Hermínia Oliveira — profissionais autônomos ou atuando em sociedades unipessoais, com equipes reduzidas e volume limitado de processos e clientes. Enfrentam desafios como baixa escalabilidade, dificuldade de organização e gestão manual de tarefas. Hermínia será considerada a principal usuária no desenvolvimento da solução, representando as necessidades desse público. 

2. **Clientes dos Advogados**: Público de clientes dos advogados, especificamente os de Hermínia, que têm entre 35 e 70 anos, e geralmente enfrentam questões como aposentadoria, situações trabalhistas ou outras questões jurídicas relacionadas ao direito previdenciário e direito do trabalho. Este público tem um perfil que inclui pessoas aposentadas ou que estão em processo de aposentadoria, além de trabalhadores que enfrentam desafios no ambiente laboral, como demissões, disputas trabalhistas ou questões relacionadas a direitos de seguridade social. Esses clientes podem ter dificuldade com tecnologias mais avançadas.

## III ESTRATÉGIAS DE ENGENHARIA DE SOFTWARE

### 3.1 Estratégia priorizada

**Abordagem**: Ágil
**Ciclo de vida**: Ágil
**Processo de engenharia de software**: ScrumXP

### 3.2 Quadro comparativo

O quadro a seguir apresenta características comparativas entre os processos: RAD e ScrumXP, visando auxiliar o entendimento da escolha mais adequada de processo ao caso do AdvogaAI.

| **Características**                  | **RAD (Rapid Application Development)**                                               | **ScrumXP**                                                                 |
|-------------------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| **Abordagem Geral**                 | Focado em desenvolvimento rápido com uso intensivo de prototipação.                   | Ágil com foco em entregas rápidas e feedback contínuo.                      |
| **Foco em Arquitetura**             | Baixo foco em arquitetura no início, priorizando entregas rápidas com protótipos.     | Evolução da arquitetura ao longo do tempo e conforme a necessidade.        |
| **Estrutura de Processos**          | Baseado em fases como modelagem, prototipação, testes e iteração rápida.              | Focado em sprints curtos e flexíveis (2-4 semanas) com entregas incrementais. |
| **Flexibilidade de Requisitos**     | Alta flexibilidade, com requisitos evoluindo conforme os protótipos são testados.     | Alta flexibilidade com adaptação contínua dos requisitos a cada sprint.     |
| **Colaboração com Cliente**         | Envolvimento frequente durante as fases de prototipação e testes.                     | Envolvimento constante, com feedback ao final de cada sprint.               |
| **Complexidade do Processo**        | Processo simples e rápido, com pouca formalidade e foco na velocidade.                | Leve e ágil, com foco na entrega funcional e adaptação contínua.            |
| **Qualidade Técnica**               | Qualidade validada com testes rápidos sobre os protótipos.                            | Alta ênfase em qualidade com TDD, integração contínua e pair programming.   |
| **Práticas de Desenvolvimento**     | Foco em ciclos rápidos de prototipagem e testes, com menos práticas estruturadas.     | TDD, refatoração contínua, integração contínua e pair programming.          |
| **Adaptação ao Projeto AdvogaAI**   | Útil para gerar protótipos rápidos da interface e validar ideias com usuários.        | Ideal para evolução contínua da plataforma com qualidade e feedbacks.       |
| **Documentação**                    | Documentação mínima, focada em protótipos e requisitos emergentes.                    | Documentação reduzida, centrada no essencial e comunicação ágil.            |
| **Controle de Qualidade**           | Baseado em revisões de protótipos e feedback do cliente.                              | Embutido com testes automatizados e práticas ágeis de qualidade.            |
| **Escalabilidade**                  | Limitado a projetos de menor escala e com menos complexidade técnica.                 | Escalável, indicado para equipes pequenas e médias com foco em colaboração. |
| **Suporte a Equipes de Desenvolvimento** | Adequado para equipes pequenas com foco em entrega rápida.                     | Ideal para equipes colaborativas, com papéis flexíveis e alta comunicação.  |


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

O projeto exige uma abordagem ágil, leve e centrada na entrega de valor real. O ScrumXP foca na entrega contínua de partes úteis da aplicação, mantendo a cliente sempre no centro do processo.


O RAD, embora ágil, carece de práticas voltadas à evolução estruturada do software e não prioriza qualidade técnica e escalabilidade a longo prazo, pontos essenciais para o sucesso do AdvogaAI.


