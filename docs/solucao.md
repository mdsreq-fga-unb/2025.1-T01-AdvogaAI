| Data       | Versão | Descrição                          | Autor                    |
|------------|--------|------------------------------------|--------------------------|
| 07/04/2025 | *1.0* | Preenchimento da sessão de produto | Ana Luiza Pfeilsticker   |
| 17/04/2025 | *1.1* | Melhoria do texto                  | Mateus Magno             |

# II SOLUÇÃO PROPOSTA

### 2.1 Objetivos do Produto

A solução proposta tem como objetivos principais:

 - *Agilizar a triagem e o processamento de informações dos clientes*: A plataforma visa otimizar a forma como o advogado lida com as informações e documentos dos clientes, diminuindo o tempo do processo de coleta de dados e organização. Isso inclui a junção de informações essenciais e a integração de documentos, economizando tempo e evitando erros manuais.


 - *Reduzir tempo  para elaboração dos documentos iniciais, procurações e contratos*: O produto permitirá que o advogado crie documentos jurídicos essenciais, como contratos, procurações e petições iniciais, de forma automatizada e baseada em modelos registrados, com preenchimento dinâmico das informações, reduzindo o tempo gasto na elaboração manual desses documentos.


 - *Evitar atrasos nos de prazos processuais*: A plataforma integrará as movimentações dos processos com as APIs dos tribunais, permitindo que o advogado acompanhe os prazos de seus processos de forma automatizada e receba notificações em tempo real, evitando a necessidade de verificação manual e garantindo que nenhum prazo seja perdido.


 - *Automatizar a gestão de pagamentos de honorários*: A solução também facilitará o controle e a gestão dos pagamentos de honorários advocatícios, tanto de entrada quanto de êxito, garantindo que as datas de pagamento sejam registradas e monitoradas automaticamente, evitando que o advogado tenha que cobrar manualmente ou depender da memória para controlar os parcelamentos ou valores a serem recebidos. Relatórios detalhados ajudarão na visualização da situação financeira de cada cliente, proporcionando mais organização e controle.

### 2.2 Características principais da solução

- *Automação de documentos*: Criação automática de documentos como contratos e procurações.
- *Integração com o PJe*: Acompanhamento de prazos e movimentações processuais.
- *Gestão financeira de honorários*: Controle detalhado de pagamentos e relatórios financeiros.
- *Interface intuitiva e acessível*: Foco em usabilidade para advogados e clientes com pouca experiência digital.
- *Escalabilidade*: Plataforma modular, capaz de crescer junto com o escritório e ser comercializada no futuro.

### 2.3 Tecnologias Utilizadas

A plataforma será desenvolvida com as seguintes tecnologias:

- *Frontend*: Next.js, Tailwind CSS.
- *Backend*: NestJS, Prisma ORM, PostgreSQL.
- *Integração com o PJe*: API do PJe para monitoramento de processos.
- *Gestão de E-mails*: Amazon SES para envio de notificações.
- *Infraestrutura*: Vercel para deploy do frontend e Heroku para backend, com planos para migração para AWS no futuro.

### 2.4 Pesquisas de Mercado e Análise Competitiva

A análise competitiva mostra que soluções como *ProJuris* e *CPJ-3C* já atendem ao mercado jurídico, mas a *AdvogaAI* se diferencia por:

- Foco em escritórios unipessoais, com uma plataforma adaptada às necessidades específicas desses profissionais.
- Capacidade de *personalização de modelos de documentos*.
- Integração com o *PJe* para acompanhamento automatizado de prazos.
- Interface *intuitiva e acessível*, garantindo facilidade de uso mesmo para clientes com pouca experiência tecnológica.

### 2.5 Análise de Viabilidade

A viabilidade técnica do projeto é alta, pois a plataforma será construída utilizando tecnologias consolidadas (NEXT, NEST, e PostgreSQL) no mercado e dominadas pela equipe de desenvolvimento.
Do ponto de vista financeiro também é sólido, pois o desenvolvimento será feito em fases, com um investimento inicial baixo e a possibilidade de monetização da aplicação futuramente. A comercialização futura para outros escritórios unipessoais representará uma fonte adicional de receita.
Em termos do mercado é favorável, considerando a demanda crescente por soluções de automação e organização para advogados individuais e pequenos escritórios, especialmente no contexto da digitalização do Judiciário e da necessidade de melhoria na gestão de prazos e documentos.

### 2.6 Impacto da Solução

A solução proposta terá um impacto significativo nos processos operacionais do escritório de Hermínia Oliveira Sociedade Unipessoal de Advocacia, promovendo melhorias em várias áreas cruciais:

 - *Facilidade e agilidade na triagem de clientes*: A plataforma permitirá agilizar a triagem de novos clientes, centralizando o processo de coleta e organização de informações essenciais, reduzindo o tempo gasto em tarefas administrativas e permitindo que o advogado se concentre mais na parte estratégica e jurídica do trabalho. O atendimento será mais ágil desde o primeiro contato até o início do acompanhamento processual.


 - *Mitigação de erros na cobrança de pagamentos*: Com a gestão automatizada dos honorários e dos parcelamentos, a plataforma eliminará a necessidade de controle manual ou mental dos pagamentos. Isso evitará omissões, duplicidades ou esquecimentos, oferecendo ao escritório um controle financeiro mais confiável e sistemático.


 - *Mitigação de perda de prazos processuais*: A integração com as APIs dos tribunais e a geração automática de alertas de prazos ajudarão a mitigar o risco de perda de prazos. O advogado será notificado automaticamente sobre movimentações processuais e prazos importantes, garantindo que nenhuma data crítica seja esquecida. Isso aumenta a segurança jurídica do escritório e melhora a confiança dos clientes no atendimento oferecido.


 - *Aprimoramento da experiência do cliente*: A solução proporcionará um atendimento mais rápido, com um processo mais ágil desde a triagem até a entrega dos documentos e o acompanhamento dos prazos. A transparência no controle de pagamentos e prazos também aumentará a confiança dos clientes, que se sentirão mais informados e acompanhados ao longo do andamento de seus processos. A interface simples garantirá que clientes de diferentes perfis, incluindo os mais idosos, possam utilizar a plataforma com facilidade, melhorando a experiência geral.
