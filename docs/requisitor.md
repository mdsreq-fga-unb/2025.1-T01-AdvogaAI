# 7.1 Levantamento dos Requisitos

Os **requisitos funcionais e não funcionais** deste sistema foram levantados em conjunto com o cliente por meio das técnicas de **brainstorming** e **entrevistas** com a cliente.
Essas abordagens permitiram identificar tanto as necessidades explícitas quanto os desejos latentes da usuária principal, proporcionando uma visão abrangente sobre os fluxos de trabalho, problemas enfrentados no dia a dia e oportunidades de melhoria que o sistema pode proporcionar.

---

## Requisitos Funcionais

# Requisitos Funcionais

| Código | Nome                                       | Objetivo Específico                                                                 |
|--------|--------------------------------------------|--------------------------------------------------------------------------------------|
| RF01   | Preencher documentos jurídicos             | Como advogado, quero preencher documentos jurídicos automaticamente, para reduzir o tempo na elaboração. |
| RF02   | Criar modelos de documentos                | Como advogado, quero criar modelos de documentos, para agilizar a produção de documentos recorrentes. |
| RF03   | Editar modelos de documentos               | Como advogado, quero editar modelos de documentos, para mantê-los atualizados conforme as necessidades. |
| RF04   | Deletar modelos de documentos              | Como advogado, quero excluir modelos de documentos, para manter minha base de modelos organizada. |
| RF05   | Listar modelos de documentos               | Como advogado, quero listar os modelos de documentos disponíveis, para selecionar o mais adequado. |
| RF06   | Cadastrar clientes                         | Como advogado, quero cadastrar meus clientes no sistema, para agilizar o atendimento e organização. |
| RF07   | Atualizar dados de clientes                | Como advogado, quero atualizar os dados dos meus clientes, para manter as informações sempre corretas. |
| RF08   | Excluir registros de clientes              | Como advogado, quero excluir registros de clientes, para remover dados obsoletos do sistema. |
| RF09   | Listar clientes                            | Como advogado, quero listar todos os clientes cadastrados, para facilitar a visualização e busca. |
| RF10   | Gerar arquivo PDF do documento jurídico    | Como advogado, quero exportar os documentos preenchidos em PDF, para compartilhamento e arquivamento. |
| RF11   | Listar documentos jurídicos gerados        | Como advogado, quero visualizar a lista de documentos gerados, para localizar e gerenciar meus arquivos. |
| RF12   | Vincular OAB à conta do advogado           | Como advogado, quero vincular meu número da OAB à conta, para integrar processos e evitar atrasos. |
| RF13   | Listar documentos vinculados a processo    | Como advogado, quero listar os documentos de um processo, para acompanhar os anexos de forma eficiente. |
| RF14   | Notificar movimentações de processos       | Como advogado, quero ser notificado sobre movimentações processuais, para não perder prazos importantes. |
| RF15   | Registrar honorários contratuais de processo| Como advogado, quero registrar os honorários contratuais, para facilitar o controle financeiro do processo. |
| RF16   | Registrar honorários de êxito de processo  | Como advogado, quero registrar honorários de êxito, para automatizar o cálculo de recebíveis por resultado. |
| RF17   | Visualizar status de parcelas pendentes    | Como advogado, quero visualizar o status das parcelas pendentes, para acompanhar pagamentos a receber. |
| RF18   | Visualizar histórico de pagamentos         | Como advogado, quero visualizar o histórico de pagamentos, para ter controle completo das finanças. |
| RF19   | Gerar relatório financeiro                 | Como advogado, quero gerar relatórios financeiros, para ter visão consolidada da receita e dos pagamentos. |
| RF20   | Editar registros de pagamento              | Como advogado, quero editar os registros de pagamento, para corrigir ou atualizar informações financeiras. |
| RF21   | Efetuar pagamento                          | Como cliente, quero efetuar pagamentos pelo sistema, para facilitar o acerto dos honorários. |
| RF22   | Gerenciar links de pagamento               | Como advogado, quero gerenciar os links de pagamento, para oferecer opções seguras aos meus clientes. |
| RF23   | Cadastrar usuário                          | Como novo usuário, quero me cadastrar no sistema, para poder utilizar todas as funcionalidades disponíveis. |
| RF24   | Realizar login                             | Como usuário, quero fazer login no sistema, para acessar minha conta e recursos personalizados. |
| RF26   | Editar dados do perfil                     | Como usuário, quero editar os dados do meu perfil, para manter minhas informações atualizadas. |
| RF27   | Visualizar dados do perfil                 | Como usuário, quero visualizar meus dados de perfil, para conferir e acompanhar minhas informações. |
| RF28   | Alterar senha                              | Como usuário, quero alterar minha senha, para garantir maior segurança à minha conta. |
| RF29   | Encerrar sessão (logout)                   | Como usuário, quero encerrar minha sessão, para manter minha conta segura ao sair do sistema. |
| RF30   | Landing page                               | Como usuário, quero entrar na landing page do site, para ver informações gerais sobre o sistema e poder me redirecionar para o login. |
| RF31   | Dashboard                                  | Como advogado, quero entrar no dashboard, para ver informações gerais sobre meus clientes, documentos, processos e últimas movimentações. |



## Requisitos Não Funcionais

| Código | Descrição                                                                      | Categoria URPS+               |
|--------|--------------------------------------------------------------------------------|--------------------------------|
| RNF01  | O sistema deve permitir compatibilidade com as seguintes resoluções de tela: 1920×1080, 1366×768, 1536×864, 1280×720, 360×800, 390×844, 393×873, 412×915, 768×1024, 1280×800, 800×1280, 820×1180 | R – Requisitos de Interface   |
| RNF02  | O sistema deve conter uma arquitetura dividida em módulos                      | P – Suportabilidade (manutenibilidade) |
| RNF03  | O sistema deve fazer o uso de chamadas HTTPS apenas                           | S – Suportabilidade (segurança) |
| RNF05  | O sistema deve adotar o padrão RESTFULL em todas as suas integrações          | R – Requisitos de Implementação |
| RNF06  | O código do sistema deve conter formatação uniforme estabelecida nos arquivos de formatação: .prettierrc e eslint.config.mjs | R – Requisitos de Implementação |
