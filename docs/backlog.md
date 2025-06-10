# 9. Backlog do Produto

## 9.1. Abordagem Híbrida

Este projeto adota uma abordagem híbrida que combina o uso do **RAD (Rapid Application Development)** na fase de levantamento e prototipação com práticas do **ScrumXP** na fase de construção.

Durante o RAD:

- Utilizamos **brainstorming** e **entrevistas com a cliente** para levantar requisitos;
- Construimos em conjunto com a cliente as user stories;
- Construímos protótipos para validar os fluxos e funcionalidades;
- Refinamos as ideias com feedback rápido da usuária principal.

Durante o desenvolvimento com ScrumXP:

- Vamos refinar as US já desenvolvidas, fazer estimativas com Poker Planning e definir os critérios de aceitação, para que estejam de acordo com o DoR;
- Vamos desenvolver cada item do backlog utilizando estratégias de pair programming, code review e construção de testes automatizados;
- Vamos testar e validar o desenvolvimento com a cliente, seguindo o DoD;

## 9.2. Priorização do Backlog

### 9.2.1 Critérios Avaliados

Cada item do backlog foi avaliado de 1 (baixo) a 5 (alto) conforme os seguintes critérios:

| Critério          | Descrição                                                            |
| ----------------- | -------------------------------------------------------------------- |
| Valor de Negócio  | Impacto direto no usuário e nos objetivos do produto                 |
| Urgência          | Frequência e gravidade do problema que o item resolve                |
| Risco / Incerteza | Grau de desconhecimento técnico ou de negócio envolvido              |
| Esforço Estimado  | Quantidade de trabalho necessário (quanto menor, maior a prioridade) |
| Dependência       | Se o item habilita ou desbloqueia outros itens no backlog            |

### 9.2.2 Fórmula de Prioridade

A fórmula aplicada para calcular a prioridade de cada item foi:

```text
Prioridade = (Valor de Negócio × 2) + Urgência + Risco - Esforço + Dependência
```

### 9.2.3 Exclusões do MVP

Foi acordado com a cliente que o módulo de Gestão Financeira não será incluído no MVP. Todas as User Stories desse módulo estão marcadas como "Não" na coluna No MVP.

## 9.3. Backlog Priorizado

| ID   | Nome do Requisito                            | No MVP? | Declaração da User Story                                                                                    | Valor | Urgência | Risco | Esforço | Dependência | Prioridade |
| ---- | -------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------- | ----- | -------- | ----- | ------- | ----------- | ---------- |
| US01 | Preencher documentos jurídicos               | Sim     | Como advogado, quero preencher documentos jurídicos automaticamente, para reduzir o tempo na elaboração.    | 5     | 5        | 2     | 3       | 5           | 19         |
| US02 | Criar modelos de documentos                  | Sim     | Como advogado, quero criar modelos de documentos, para agilizar a produção de documentos recorrentes.       | 5     | 4        | 2     | 2       | 4           | 18         |
| US03 | Editar modelos de documentos                 | Sim     | Como advogado, quero editar modelos de documentos, para mantê-los atualizados conforme as necessidades.     | 5     | 4        | 2     | 2       | 4           | 18         |
| US04 | Deletar modelos de documentos                | Sim     | Como advogado, quero excluir modelos de documentos, para manter minha base de modelos organizada.           | 5     | 4        | 2     | 2       | 4           | 18         |
| US05 | Visualizar modelos de documentos             | Sim     | Como advogado, quero visualizar os modelos de documentos disponíveis, para selecionar o mais adequado.      | 5     | 4        | 2     | 2       | 4           | 18         |
| US06 | Cadastrar clientes                           | Sim     | Como advogado, quero cadastrar meus clientes no sistema, para agilizar o atendimento e organização.         | 5     | 5        | 1     | 2       | 5           | 19         |
| US07 | Atualizar dados de clientes                  | Sim     | Como advogado, quero atualizar os dados dos meus clientes, para manter as informações sempre corretas.      | 4     | 4        | 2     | 2       | 4           | 16         |
| US08 | Excluir registros de clientes                | Sim     | Como advogado, quero excluir registros de clientes, para remover dados obsoletos do sistema.                | 3     | 3        | 2     | 2       | 3           | 12         |
| US09 | Visualizar clientes                          | Sim     | Como advogado, quero visualizar todos os clientes cadastrados, para facilitar a visualização e busca.       | 4     | 3        | 1     | 1       | 3           | 14         |
| US10 | Gerar PDF de documentos                      | Sim     | Como advogado, quero exportar os documentos preenchidos em PDF, para compartilhamento e arquivamento.       | 4     | 3        | 1     | 2       | 3           | 13         |
| US11 | Visualizar documentos gerados                | Não     | Como advogado, quero visualizar a lista de documentos gerados, para localizar e gerenciar meus arquivos.    | 4     | 3        | 1     | 2       | 3           | 13         |
| US12 | Vincular OAB à conta                         | Sim     | Como advogado, quero vincular meu número da OAB à conta, para integrar processos e evitar atrasos.          | 5     | 5        | 2     | 3       | 5           | 19         |
| US13 | Visualizar documentos vinculados ao processo | Sim     | Como advogado, quero visualizar os documentos de um processo, para acompanhar os anexos de forma eficiente. | 4     | 3        | 2     | 2       | 3           | 14         |
| US14 | Notificar movimentações de processos         | Sim     | Como advogado, quero ser notificado sobre movimentações processuais, para não perder prazos importantes.    | 5     | 5        | 3     | 3       | 5           | 20         |
| US15 | Registrar honorários contratuais             | Não     | Como advogado, quero registrar os honorários contratuais, para facilitar o controle financeiro do processo. | 4     | 3        | 3     | 3       | 3           | 17         |
| US16 | Registrar honorários de êxito                | Não     | Como advogado, quero registrar honorários de êxito, para automatizar o cálculo de recebíveis por resultado. | 4     | 3        | 3     | 3       | 3           | 17         |
| US17 | Visualizar status de parcelas pendentes      | Não     | Como advogado, quero visualizar o status das parcelas pendentes, para acompanhar pagamentos a receber.      | 4     | 3        | 2     | 2       | 3           | 17         |
| US18 | Visualizar histórico de pagamentos           | Não     | Como advogado, quero visualizar o histórico de pagamentos, para ter controle completo das finanças.         | 4     | 3        | 2     | 2       | 3           | 17         |
| US19 | Gerar relatório financeiro                   | Não     | Como advogado, quero gerar relatórios financeiros, para ter visão consolidada da receita e dos pagamentos.  | 3     | 2        | 2     | 2       | 2           | 13         |
| US20 | Editar registros de pagamento                | Não     | Como advogado, quero editar os registros de pagamento, para corrigir ou atualizar informações financeiras.  | 3     | 2        | 3     | 3       | 2           | 12         |
| US21 | Efetuar pagamento                            | Não     | Como cliente, quero efetuar pagamentos pelo sistema, para facilitar o acerto dos honorários.                | 4     | 3        | 2     | 3       | 3           | 16         |
| US22 | Gerenciar links de pagamento                 | Não     | Como advogado, quero gerenciar os links de pagamento, para oferecer opções seguras aos meus clientes.       | 3     | 3        | 2     | 2       | 2           | 13         |
| US23 | Cadastrar usuário                            | Sim     | Como novo usuário, quero me cadastrar no sistema, para poder utilizar todas as funcionalidades disponíveis. | 5     | 5        | 2     | 2       | 5           | 20         |
| US24 | Realizar login                               | Sim     | Como usuário, quero fazer login no sistema, para acessar minha conta e recursos personalizados.             | 5     | 5        | 1     | 2       | 5           | 19         |
| US25 | Recuperar senha                              | Não     | Como usuário, quero recuperar minha senha, para acessar minha conta mesmo se esquecê-la.                    | 4     | 3        | 2     | 2       | 3           | 14         |
| US26 | Editar dados do perfil                       | Sim     | Como usuário, quero editar os dados do meu perfil, para manter minhas informações atualizadas.              | 3     | 3        | 1     | 2       | 3           | 11         |
| US27 | Visualizar dados do perfil                   | Sim     | Como usuário, quero visualizar meus dados de perfil, para conferir e acompanhar minhas informações.         | 3     | 2        | 1     | 1       | 2           | 10         |
| US28 | Alterar senha                                | Sim     | Como usuário, quero alterar minha senha, para garantir maior segurança à minha conta.                       | 3     | 3        | 1     | 1       | 2           | 11         |
| US29 | Encerrar sessão (logout)                     | Sim     | Como usuário, quero encerrar minha sessão, para manter minha conta segura ao sair do sistema.               | 3     | 2        | 1     | 1       | 2           | 10         |

---

## Divisão em Temas e Épicos

## Tema 1: Gestão de Documentos Jurídicos

| Épico                                                          | ID   | Nome do Requisito              | No MVP? | Declaração da User Story                                                                                 | Prioridade |
| -------------------------------------------------------------- | ---- | ------------------------------ | ------- | -------------------------------------------------------------------------------------------------------- | ---------- |
| **Épico 1.1: Criação e Manipulação de Modelos de Documentos**  | US02 | Criar modelos de documentos    | Sim     | Como advogado, quero criar modelos de documentos, para agilizar a produção de documentos recorrentes.    | 18         |
|                                                                | US03 | Editar modelos de documentos   | Sim     | Como advogado, quero editar modelos de documentos, para mantê-los atualizados conforme as necessidades.  | 18         |
|                                                                | US04 | Deletar modelos de documentos  | Sim     | Como advogado, quero excluir modelos de documentos, para manter minha base de modelos organizada.        | 18         |
|                                                                | US05 | Listar modelos de documentos   | Sim     | Como advogado, quero listar os modelos de documentos disponíveis, para selecionar o mais adequado.       | 18         |
| **Épico 1.2: Preenchimento e Geração de Documentos Jurídicos** | US01 | Preencher documentos jurídicos | Sim     | Como advogado, quero preencher documentos jurídicos automaticamente, para reduzir o tempo na elaboração. | 19         |
|                                                                | US10 | Gerar PDF de documentos        | Sim     | Como advogado, quero exportar os documentos preenchidos em PDF, para compartilhamento e arquivamento.    | 13         |
|                                                                | US11 | Listar documentos gerados      | Não     | Como advogado, quero visualizar a lista de documentos gerados, para localizar e gerenciar meus arquivos. | 13         |

## Tema 2: Gestão de Clientes

| Épico                                             | ID   | Nome do Requisito             | No MVP? | Declaração da User Story                                                                               | Prioridade |
| ------------------------------------------------- | ---- | ----------------------------- | ------- | ------------------------------------------------------------------------------------------------------ | ---------- |
| **Épico 2.1: Cadastro e Atualização de Clientes** | US06 | Cadastrar clientes            | Sim     | Como advogado, quero cadastrar meus clientes no sistema, para agilizar o atendimento e organização.    | 19         |
|                                                   | US07 | Atualizar dados de clientes   | Sim     | Como advogado, quero atualizar os dados dos meus clientes, para manter as informações sempre corretas. | 16         |
|                                                   | US08 | Excluir registros de clientes | Sim     | Como advogado, quero excluir registros de clientes, para remover dados obsoletos do sistema.           | 12         |
| **Épico 2.2: Visualização de Clientes**           | US09 | Listar clientes               | Sim     | Como advogado, quero listar todos os clientes cadastrados, para facilitar a visualização e busca.      | 14         |

## Tema 3: Integração com OAB e Movimentação Processual

| Épico                                                    | ID   | Nome do Requisito                        | No MVP? | Declaração da User Story                                                                                 | Prioridade |
| -------------------------------------------------------- | ---- | ---------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------- | ---------- |
| **Épico 3.1: Vinculação e Notificação de Movimentações** | US12 | Vincular OAB à conta do advogado         | Sim     | Como advogado, quero vincular meu número da OAB à conta, para integrar processos e evitar atrasos.       | 19         |
|                                                          | US14 | Notificar movimentações de processos     | Sim     | Como advogado, quero ser notificado sobre movimentações processuais, para não perder prazos importantes. | 20         |
|                                                          | US13 | Listar documentos vinculados ao processo | Não     | Como advogado, quero listar os documentos de um processo, para acompanhar os anexos de forma eficiente.  | 14         |

## Tema 4: Gestão de Honorários e Pagamentos

| Épico                                                   | ID   | Nome do Requisito                       | No MVP? | Declaração da User Story                                                                                    | Prioridade |
| ------------------------------------------------------- | ---- | --------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------- | ---------- |
| **Épico 4.1: Gestão de Honorários Contratuais e Êxito** | US15 | Registrar honorários contratuais        | Não     | Como advogado, quero registrar os honorários contratuais, para facilitar o controle financeiro do processo. | 17         |
|                                                         | US16 | Registrar honorários de êxito           | Não     | Como advogado, quero registrar honorários de êxito, para automatizar o cálculo de recebíveis por resultado. | 17         |
| **Épico 4.2: Pagamentos e Relatórios Financeiros**      | US17 | Visualizar status de parcelas pendentes | Não     | Como advogado, quero visualizar o status das parcelas pendentes, para acompanhar pagamentos a receber.      | 17         |
|                                                         | US18 | Visualizar histórico de pagamentos      | Não     | Como advogado, quero visualizar o histórico de pagamentos, para ter controle completo das finanças.         | 17         |
|                                                         | US19 | Gerar relatório financeiro              | Não     | Como advogado, quero gerar relatórios financeiros, para ter visão consolidada da receita e dos pagamentos.  | 13         |
|                                                         | US20 | Editar registros de pagamento           | Não     | Como advogado, quero editar os registros de pagamento, para corrigir ou atualizar informações financeiras.  | 12         |
|                                                         | US21 | Efetuar pagamento                       | Não     | Como cliente, quero efetuar pagamentos pelo sistema, para facilitar o acerto dos honorários.                | 16         |
|                                                         | US22 | Gerenciar links de pagamento            | Não     | Como advogado, quero gerenciar os links de pagamento, para oferecer opções seguras aos meus clientes.       | 13         |

## Tema 5: Gestão de Acesso e Perfil de Usuário

| Épico                                       | ID   | Nome do Requisito          | No MVP? | Declaração da User Story                                                                                    | Prioridade |
| ------------------------------------------- | ---- | -------------------------- | ------- | ----------------------------------------------------------------------------------------------------------- | ---------- |
| **Épico 5.1: Cadastro e Acesso ao Sistema** | US23 | Cadastrar usuário          | Sim     | Como novo usuário, quero me cadastrar no sistema, para poder utilizar todas as funcionalidades disponíveis. | 20         |
|                                             | US24 | Realizar login             | Sim     | Como usuário, quero fazer login no sistema, para acessar minha conta e recursos personalizados.             | 19         |
|                                             | US25 | Recuperar senha            | Não     | Como usuário, quero recuperar minha senha, para acessar minha conta mesmo se esquecê-la.                    | 14         |
| **Épico 5.2: Gestão do Perfil de Usuário**  | US26 | Editar dados do perfil     | Sim     | Como usuário, quero editar os dados do meu perfil, para manter minhas informações atualizadas.              | 11         |
|                                             | US27 | Visualizar dados do perfil | Sim     | Como usuário, quero visualizar meus dados de perfil, para conferir e acompanhar minhas informações.         | 10         |
|                                             | US28 | Alterar senha              | Sim     | Como usuário, quero alterar minha senha, para garantir maior segurança à minha conta.                       | 11         |
|                                             | US29 | Encerrar sessão (logout)   | Sim     | Como usuário, quero encerrar minha sessão, para manter minha conta segura ao sair do sistema.               | 10         |

## 9.4. Observações

- O backlog será reavaliado a cada sprint, conforme orienta o modelo **DEEP** (Detalhado, Estimado, Emergente, Priorizado).
- As pontuações podem ser ajustadas conforme novos aprendizados e validações com a cliente.
