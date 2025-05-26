# 7.1 Levantamento dos Requisitos

Os **requisitos funcionais e não funcionais** deste sistema foram levantados em conjunto com o cliente por meio das técnicas de **brainstorming** e **entrevistas** com a cliente.
Essas abordagens permitiram identificar tanto as necessidades explícitas quanto os desejos latentes da usuária principal, proporcionando uma visão abrangente sobre os fluxos de trabalho, problemas enfrentados no dia a dia e oportunidades de melhoria que o sistema pode proporcionar.

---

# Requisitos Funcionais

| Código | Nome                                                                                                     | Objetivo Específico                                                            |
| ------ | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| RF01   | Gerar documentos jurídicos                                                                               | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos |
| RF02   | Gerenciar modelos de documentos                                                                          | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos |
| RF03   | Cadastrar clientes                                                                                       | Agilizar a triagem e o processamento de informações dos clientes               |
| RF04   | Atualizar dados de clientes                                                                              | Agilizar a triagem e o processamento de informações dos clientes               |
| RF05   | Excluir registros de clientes                                                                            | Agilizar a triagem e o processamento de informações dos clientes               |
| RF06   | Listar clientes                                                                                          | Agilizar a triagem e o processamento de informações dos clientes               |
| RF07   | Buscar clientes (com filtros por nome, CPF/CNPJ e outros atributos relevantes)                           | Agilizar a triagem e o processamento de informações dos clientes               |
| RF08   | Exportar documentos em PDF                                                                               | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos |
| RF09   | Listar documentos gerados                                                                                | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos |
| RF10   | Buscar documentos gerados (com filtros por título, conteúdo, cliente, tipo, status e intervalo de datas) | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos |
| RF11   | Buscar processos por OAB                                                                                 | Evitar atrasos nos de prazos processuais                                       |
| RF12   | Buscar processo específico                                                                               | Evitar atrasos nos de prazos processuais                                       |
| RF13   | Listar documentos de processo                                                                            | Evitar atrasos nos de prazos processuais                                       |
| RF14   | Notificar movimentações de processos                                                                     | Evitar atrasos nos de prazos processuais                                       |
| RF15   | Registrar honorários contratuais                                                                         | Automatizar a gestão de pagamentos de honorários                               |
| RF16   | Registrar honorários de êxito                                                                            | Automatizar a gestão de pagamentos de honorários                               |
| RF17   | Controlar pagamento de parcelas                                                                          | Automatizar a gestão de pagamentos de honorários                               |
| RF18   | Visualizar status de parcelas                                                                            | Automatizar a gestão de pagamentos de honorários                               |
| RF19   | Visualizar histórico de pagamentos                                                                       | Automatizar a gestão de pagamentos de honorários                               |
| RF20   | Buscar histórico de pagamentos (filtrado por cliente, status e valores correspondentes)                  | Automatizar a gestão de pagamentos de honorários                               |
| RF21   | Gerar relatório financeiro                                                                               | Automatizar a gestão de pagamentos de honorários                               |
| RF22   | Modificar registros de pagamento                                                                         | Automatizar a gestão de pagamentos de honorários                               |
| RF23   | Categorizar pagamentos                                                                                   | Automatizar a gestão de pagamentos de honorários                               |
| RF24   | Gerar links de pagamento                                                                                 | Automatizar a gestão de pagamentos de honorários                               |
| RF25   | Efetuar pagamento via gateway                                                                            | Automatizar a gestão de pagamentos de honorários                               |
| RF26   | Gerenciar links de pagamento                                                                             | Automatizar a gestão de pagamentos de honorários                               |
| RF27   | Cadastrar usuário                                                                                        | Agilizar a triagem e o processamento de informações dos clientes               |
| RF28   | Realizar login                                                                                           | Agilizar a triagem e o processamento de informações dos clientes               |
| RF29   | Recuperar senha                                                                                          | Agilizar a triagem e o processamento de informações dos clientes               |
| RF30   | Confirmar e-mail                                                                                         | Agilizar a triagem e o processamento de informações dos clientes               |
| RF31   | Editar dados do perfil                                                                                   | Agilizar a triagem e o processamento de informações dos clientes               |
| RF32   | Visualizar dados do perfil                                                                               | Agilizar a triagem e o processamento de informações dos clientes               |
| RF33   | Alterar senha                                                                                            | Agilizar a triagem e o processamento de informações dos clientes               |
| RF34   | Encerrar sessão (logout)                                                                                 | Agilizar a triagem e o processamento de informações dos clientes               |

# Requisitos Não Funcionais

| Código | Descrição                                                                                                                                                                                        | Categoria URPS+                        |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| RNF01  | O sistema deve permitir compatibilidade com as seguintes resoluções de tela: 1920×1080, 1366×768, 1536×864, 1280×720, 360×800, 390×844, 393×873, 412×915, 768×1024, 1280×800, 800×1280, 820×1180 | R – Requisitos de Interface            |
| RNF02  | O sistema deve conter uma arquitetura dividida em módulos                                                                                                                                        | P – Suportabilidade (manutenibilidade) |
| RNF03  | O sistema deve fazer o uso de chamadas HTTPS apenas                                                                                                                                              | S – Suportabilidade (segurança)        |
| RNF04  | O sistema deve conter testes automatizados com cobertura maior que 80% para o módulo de integração com o PJe                                                                                     | R – Requisitos de Implementação        |
| RNF05  | O sistema deve adotar o padrão RESTFULL em todas as suas integrações                                                                                                                             | R – Requisitos de Implementação        |
| RNF06  | O código do sistema deve conter formatação uniforme estabelecida nos arquivos de formatação                                                                                                      | R – Requisitos de Implementação        |
| RNF07  | O código do sistema deve conter formatação uniforme estabelecida nos arquivos de formatação                                                                                                      | R – Requisitos de Implementação        |
