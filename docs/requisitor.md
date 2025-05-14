

# Requisitos Funcionais

| Código | Nome                                                               | Objetivo Específico                                                    |
|--------|--------------------------------------------------------------------|------------------------------------------------------------------------|
| RF01   | Gerar documentos jurídicos                                         | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos |
| RF02   | Gerenciar modelos de documentos                                    | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos |
| RF03   | Cadastrar clientes                                                 | Agilizar a triagem e o processamento de informações dos clientes       |
| RF04   | Atualizar dados de clientes                                        | Agilizar a triagem e o processamento de informações dos clientes       |
| RF05   | Excluir registros de clientes                                      | Agilizar a triagem e o processamento de informações dos clientes       |
| RF06   | Listar clientes                                                    | Agilizar a triagem e o processamento de informações dos clientes       |
| RF07   | Buscar clientes (com filtros por nome, CPF/CNPJ e outros atributos relevantes) | Agilizar a triagem e o processamento de informações dos clientes       |
| RF08   | Exportar documentos em PDF                                         | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos |
| RF09   | Listar documentos gerados                                          | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos |
| RF10   | Buscar documentos gerados (com filtros por título, conteúdo, cliente, tipo, status e intervalo de datas) | Reduzir tempo para elaboração dos documentos iniciais, procurações e contratos |
| RF11   | Buscar processos por OAB                                           | Evitar atrasos nos de prazos processuais                               |
| RF12   | Buscar processo específico                                         | Evitar atrasos nos de prazos processuais                               |
| RF13   | Listar documentos de processo                                      | Evitar atrasos nos de prazos processuais                               |
| RF14   | Notificar movimentações de processos                               | Evitar atrasos nos de prazos processuais                               |
| RF15   | Registrar honorários contratuais                                   | Automatizar a gestão de pagamentos de honorários                       |
| RF16   | Registrar honorários de êxito                                      | Automatizar a gestão de pagamentos de honorários                       |
| RF17   | Controlar pagamento de parcelas                                    | Automatizar a gestão de pagamentos de honorários                       |
| RF18   | Visualizar status de parcelas                                      | Automatizar a gestão de pagamentos de honorários                       |
| RF19   | Visualizar histórico de pagamentos                                 | Automatizar a gestão de pagamentos de honorários                       |
| RF20   | Buscar histórico de pagamentos (filtrado por cliente, status e valores correspondentes) | Automatizar a gestão de pagamentos de honorários                       |
| RF21   | Gerar relatório financeiro                                         | Automatizar a gestão de pagamentos de honorários                       |
| RF22   | Modificar registros de pagamento                                   | Automatizar a gestão de pagamentos de honorários                       |
| RF23   | Categorizar pagamentos                                             | Automatizar a gestão de pagamentos de honorários                       |
| RF24   | Gerar links de pagamento                                           | Automatizar a gestão de pagamentos de honorários                       |
| RF25   | Efetuar pagamento via gateway                                      | Automatizar a gestão de pagamentos de honorários                       |
| RF26   | Gerenciar links de pagamento                                       | Automatizar a gestão de pagamentos de honorários                       |

# Requisitos Não Funcionais

| Código | Descrição                                                                                     | Categoria URPS+                            |
|--------|-----------------------------------------------------------------------------------------------|--------------------------------------------|
| RNF01  | Garantir segurança e conformidade com a LGPD, incluindo criptografia de dados e controle de acesso. | S – Suportabilidade (segurança e conformidade) |
| RNF02  | Seguir os padrões WCAG de acessibilidade                                                      | U – Usabilidade                             |
| RNF03  | Compatibilidade com os principais navegadores e dispositivos (desktop, tablet, smartphone).   | R – Requisitos de Interface                 |
| RNF04  | Arquitetura modular para facilitar manutenção e atualizações contínuas.                       | P – Suportabilidade (manutenibilidade)      |
| RNF05  | Chamadas via HTTPS, armazenamento criptografado de credenciais e logging com mascaramento.   | S – Suportabilidade (segurança)             |
| RNF06  | Módulo de integração PJe com cobertura de testes automatizados ≥ 80%.                         | R – Requisitos de Implementação             |
| RNF07  | Apresentação de erros da API ao usuário em português, com código e mensagem.                  | U – Usabilidade                             |
| RNF08  | Permitir configuração de endpoint e credenciais sem necessidade de novo deploy.               | R – Requisitos de Implementação             |
| RNF09  | Adoção do padrão RESTful em todas as integrações.                                             | R – Requisitos de Implementação             |
| RNF10  | Histórico de transações e documentos deve permanecer disponível após reinicializações ou falhas. | R – Confiabilidade (Reliability)            |
