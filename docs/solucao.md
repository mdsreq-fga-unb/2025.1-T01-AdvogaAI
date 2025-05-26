| Data       | Versão | Descrição                                                          | Autor                  |
| ---------- | ------ | ------------------------------------------------------------------ | ---------------------- |
| 07/04/2025 | _1.0_  | Preenchimento da sessão de produto                                 | Ana Luiza Pfeilsticker |
| 17/04/2025 | _1.1_  | Melhoria do texto                                                  | Mateus Magno           |
| 29/04/2025 | _1.2_  | Melhora na relação entre objetivos de produto e causas do problema | Nathan Batista Santos  |

# SOLUÇÃO PROPOSTA

### 2.1 Objetivos do Produto

A solução proposta tem como objetivos principais:

- _Agilizar a triagem e o processamento de informações dos clientes_: A coleta e organização manual de dados e documentos dos clientes é um processo que consome tempo e está sujeito a erros. A automação dessa etapa reduz o tempo necessário para reunir as informações essenciais e padroniza o armazenamento de documentos, diminuindo retrabalhos e falhas no registro de dados.

- _Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos_: A elaboração manual de documentos jurídicos demanda esforço repetitivo e aumenta o tempo total de atendimento. A geração automatizada de documentos a partir de modelos pré-definidos com preenchimento dinâmico de dados elimina a necessidade de redigir documentos do zero, o que reduz o tempo total do processo e melhora o fluxo de trabalho.

- _Evitar atrasos nos de prazos processuais_:
  A verificação manual de movimentações processuais e prazos é uma fonte de risco para o não cumprimento de prazos. A integração com APIs dos tribunais permite o acompanhamento contínuo e automático dos processos, garantindo que os prazos sejam monitorados em tempo real e que o advogado seja alertado sobre atualizações relevantes.

- _Automatizar a gestão de pagamentos de honorários_: O controle de recebimentos e parcelamentos feito manualmente pode gerar esquecimentos e atrasos na cobrança. A automatização do registro e monitoramento dos pagamentos reduz a necessidade de controle direto por parte do advogado e permite acesso a relatórios financeiros organizados, contribuindo para a gestão financeira dos casos.

### 2.2 Características principais da solução

- _Automação de documentos_: Criação automática de documentos como contratos e procurações.
- _Integração com o PJe_: Acompanhamento de prazos e movimentações processuais.
- _Gestão financeira de honorários_: Controle detalhado de pagamentos e relatórios financeiros.
- _Interface intuitiva e acessível_: Foco em usabilidade para advogados e clientes com pouca experiência digital.
- _Escalabilidade_: Plataforma modular, capaz de crescer junto com o escritório e ser comercializada no futuro.

### 2.3 Tecnologias Utilizadas

A plataforma será desenvolvida com as seguintes tecnologias:

- _Frontend_: Next.js, Tailwind CSS.
- _Backend_: NestJS, Prisma ORM, PostgreSQL.
- _Integração com o PJe_: API do PJe para monitoramento de processos.
- _Gestão de E-mails_: Amazon SES para envio de notificações.
- _Infraestrutura_: Vercel para deploy do frontend e Heroku para backend, com planos para migração para AWS no futuro.

### 2.4 Pesquisas de Mercado e Análise Competitiva

A análise competitiva mostra que soluções como _ProJuris_ e _CPJ-3C_ já atendem ao mercado jurídico, mas a _AdvogaAI_ se diferencia por:

- Foco em escritórios unipessoais, com uma plataforma adaptada às necessidades específicas desses profissionais.
- Capacidade de _personalização de modelos de documentos_.
- Integração com o _PJe_ para acompanhamento automatizado de prazos.
- Interface _intuitiva e acessível_, garantindo facilidade de uso mesmo para clientes com pouca experiência tecnológica.

### 2.5 Análise de Viabilidade

A viabilidade técnica do projeto é alta, pois a plataforma será construída utilizando tecnologias consolidadas (NEXT, NEST, e PostgreSQL) no mercado e dominadas pela equipe de desenvolvimento.
Do ponto de vista financeiro também é sólido, pois o desenvolvimento será feito em fases, com um investimento inicial baixo e a possibilidade de monetização da aplicação futuramente. A comercialização futura para outros escritórios unipessoais representará uma fonte adicional de receita.
Em termos do mercado é favorável, considerando a demanda crescente por soluções de automação e organização para advogados individuais e pequenos escritórios, especialmente no contexto da digitalização do Judiciário e da necessidade de melhoria na gestão de prazos e documentos.

### 2.6 Impacto da Solução

A solução proposta terá um impacto significativo nos processos operacionais do escritório de Hermínia Oliveira Sociedade Unipessoal de Advocacia, promovendo melhorias em várias áreas cruciais:

- _Facilidade e agilidade na triagem de clientes_: A plataforma permitirá agilizar a triagem de novos clientes, centralizando o processo de coleta e organização de informações essenciais, reduzindo o tempo gasto em tarefas administrativas e permitindo que o advogado se concentre mais na parte estratégica e jurídica do trabalho. O atendimento será mais ágil desde o primeiro contato até o início do acompanhamento processual.

- _Mitigação de erros na cobrança de pagamentos_: Com a gestão automatizada dos honorários e dos parcelamentos, a plataforma eliminará a necessidade de controle manual ou mental dos pagamentos. Isso evitará omissões, duplicidades ou esquecimentos, oferecendo ao escritório um controle financeiro mais confiável e sistemático.

- _Mitigação de perda de prazos processuais_: A integração com as APIs dos tribunais e a geração automática de alertas de prazos ajudarão a mitigar o risco de perda de prazos. O advogado será notificado automaticamente sobre movimentações processuais e prazos importantes, garantindo que nenhuma data crítica seja esquecida. Isso aumenta a segurança jurídica do escritório e melhora a confiança dos clientes no atendimento oferecido.

- _Aprimoramento da experiência do cliente_: A solução proporcionará um atendimento mais rápido, com um processo mais ágil desde a triagem até a entrega dos documentos e o acompanhamento dos prazos. A transparência no controle de pagamentos e prazos também aumentará a confiança dos clientes, que se sentirão mais informados e acompanhados ao longo do andamento de seus processos. A interface simples garantirá que clientes de diferentes perfis, incluindo os mais idosos, possam utilizar a plataforma com facilidade, melhorando a experiência geral.
