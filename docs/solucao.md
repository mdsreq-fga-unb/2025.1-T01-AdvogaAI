| Data       | Versão | Descrição                          | Autor                    |
|------------|--------|------------------------------------|--------------------------|
| 07/04/2025 | *1.0* | Preenchimento da sessão de produto | Ana Luiza Pfeilsticker   |
| 17/04/2025 | *1.1* | Melhoria do texto                  | Mateus Magno             |
| 29/04/2025 | *1.2* | Melhora na relação entre objetivos de produto e causas do problema | Nathan Batista Santos |

# II SOLUÇÃO PROPOSTA

### 2.1 Objetivos do Produto

A solução proposta tem como objetivos principais:

 - *Agilizar a triagem e o processamento de informações dos clientes*: A coleta e organização manual de dados e documentos dos clientes é um processo que consome tempo e está sujeito a erros. A automação dessa etapa reduz o tempo necessário para reunir as informações essenciais e padroniza o armazenamento de documentos, diminuindo retrabalhos e falhas no registro de dados.


 - *Reduzir tempo  para elaboração dos documentos iniciais, procurações e contratos*: A elaboração manual de documentos jurídicos demanda esforço repetitivo e aumenta o tempo total de atendimento. A geração automatizada de documentos a partir de modelos pré-definidos com preenchimento dinâmico de dados elimina a necessidade de redigir documentos do zero, o que reduz o tempo total do processo e melhora o fluxo de trabalho.


 - *Evitar atrasos nos de prazos processuais*: 
A verificação manual de movimentações processuais e prazos é uma fonte de risco para o não cumprimento de prazos. A integração com APIs dos tribunais permite o acompanhamento contínuo e automático dos processos, garantindo que os prazos sejam monitorados em tempo real e que o advogado seja alertado sobre atualizações relevantes.


 - *Automatizar a gestão de pagamentos de honorários*:     O controle de recebimentos e parcelamentos feito manualmente pode gerar esquecimentos e atrasos na cobrança. A automatização do registro e monitoramento dos pagamentos reduz a necessidade de controle direto por parte do advogado e permite acesso a relatórios financeiros organizados, contribuindo para a gestão financeira dos casos.


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
