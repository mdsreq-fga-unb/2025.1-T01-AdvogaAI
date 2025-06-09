# 7.1 Levantamento dos Requisitos

Os **requisitos funcionais e não funcionais** deste sistema foram levantados em conjunto com o cliente por meio das técnicas de **brainstorming** e **entrevistas** com a cliente.
Essas abordagens permitiram identificar tanto as necessidades explícitas quanto os desejos latentes da usuária principal, proporcionando uma visão abrangente sobre os fluxos de trabalho, problemas enfrentados no dia a dia e oportunidades de melhoria que o sistema pode proporcionar.

---

## Requisitos Funcionais

| Código | Nome                                       | Objetivo Específico                                                                 |
|--------|--------------------------------------------|--------------------------------------------------------------------------------------|
| RF01   | Preencher documentos jurídicos             | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos      |
| RF02   | Criar modelos de documentos jurídicos              | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos      |
| RF03   | Editar modelos de documentos jurídicos              | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos      |
| RF04   | Deletar modelos de documentos jurídicos             | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos      |
| RF05   | Listar modelos de documentos jurídicos              | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos      |
| RF06   | Cadastrar clientes                         | Agilizar a triagem e o processamento de informações dos clientes |
| RF07   | Atualizar dados de clientes                | Agilizar a triagem e o processamento de informações dos clientes                     |
| RF08   | Excluir registros de clientes              | Agilizar a triagem e o processamento de informações dos clientes                     |
| RF09   | Listar clientes                            | Agilizar a triagem e o processamento de informações dos clientes                     |
| RF10   | Gerar arquivo PDF do documento jurídico    | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos      |
| RF11   | Listar documentos jurídicos gerados                  | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos      |
| RF12   | Vincular OAB à conta do advogado           | Evitar atrasos nos prazos processuais                                                 |
| RF13   | Listar documentos vinculados a processo    | Evitar atrasos nos prazos processuais                                                 |
| RF14   | Notificar movimentações de processos       | Evitar atrasos nos prazos processuais                                                 |
| RF15   | Registrar honorários contratuais de processo| Automatizar a gestão de pagamentos de honorários                                      |
| RF16   | Registrar honorários de êxito de processo  | Automatizar a gestão de pagamentos de honorários                                      |
| RF17   | Visualizar status de parcelas pendentes    | Automatizar a gestão de pagamentos de honorários                                      |
| RF18   | Visualizar histórico de pagamentos         | Automatizar a gestão de pagamentos de honorários                                      |
| RF19   | Gerar relatório financeiro                 | Automatizar a gestão de pagamentos de honorários                                      |
| RF20   | Editar registros de pagamento              | Automatizar a gestão de pagamentos de honorários                                      |
| RF21   | Efetuar pagamento                          | Automatizar a gestão de pagamentos de honorários                                      |
| RF22   | Gerenciar links de pagamento               | Automatizar a gestão de pagamentos de honorários                                      |
| RF23   | Cadastrar usuário                          | Agilizar a triagem e o processamento de informações dos clientes                     |
| RF24   | Realizar login                             | Agilizar a triagem e o processamento de informações dos clientes                     |
| RF25   | Recuperar senha                            | Agilizar a triagem e o processamento de informações dos clientes                     |
| RF26   | Editar dados do perfil                     | Agilizar a triagem e o processamento de informações dos clientes                     |
| RF27   | Visualizar dados do perfil                 | Agilizar a triagem e o processamento de informações dos clientes                     |
| RF28   | Alterar senha                              | Agilizar a triagem e o processamento de informações dos clientes                     |
| RF29   | Encerrar sessão (logout)                   | Agilizar a triagem e o processamento de informações dos clientes                     |

## Requisitos Não Funcionais

| Código | Descrição                                                                      | Categoria URPS+               |
|--------|--------------------------------------------------------------------------------|--------------------------------|
| RNF01  | O sistema deve permitir compatibilidade com as seguintes resoluções de tela: 1920×1080, 1366×768, 1536×864, 1280×720, 360×800, 390×844, 393×873, 412×915, 768×1024, 1280×800, 800×1280, 820×1180 | R – Requisitos de Interface   |
| RNF02  | O sistema deve conter uma arquitetura dividida em módulos                      | P – Suportabilidade (manutenibilidade) |
| RNF03  | O sistema deve fazer o uso de chamadas HTTPS apenas                           | S – Suportabilidade (segurança) |
| RNF04  | O sistema deve conter testes automatizados em todo o MVP (exceto nas partes relacionadas ao login cadastro e recuperação de senha) com cobertura maior que 80% para o módulo de integração com o PJe | R – Requisitos de Implementação |
| RNF05  | O sistema deve adotar o padrão RESTFULL em todas as suas integrações          | R – Requisitos de Implementação |
| RNF06  | O código do sistema deve conter formatação uniforme estabelecida nos arquivos de formatação: .prettierrc e eslint.config.mjs | R – Requisitos de Implementação |
