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
- 
## 9.2. Priorização do Backlog

### 9.2.1 Critérios Avaliados

Cada item do backlog foi avaliado de 1 (baixo) a 5 (alto) conforme os seguintes critérios:

| Critério            | Descrição                                                                 |
|---------------------|---------------------------------------------------------------------------|
| Valor de Negócio    | Impacto direto no usuário e nos objetivos do produto                      |
| Urgência             | Frequência e gravidade do problema que o item resolve                     |
| Risco / Incerteza   | Grau de desconhecimento técnico ou de negócio envolvido                   |
| Esforço Estimado    | Quantidade de trabalho necessário (quanto menor, maior a prioridade)      |
| Dependência         | Se o item habilita ou desbloqueia outros itens no backlog                 |

### 9.2.2 Fórmula de Prioridade

A fórmula aplicada para calcular a prioridade de cada item foi:

```text
Prioridade = (Valor de Negócio × 2) + Urgência + Risco - Esforço + Dependência
```
### 9.2.3 Exclusões do MVP
Foi acordado com a cliente que o módulo de Gestão Financeira não será incluído no MVP. Todas as User Stories desse módulo estão marcadas como "Não" na coluna No MVP.


## 9.3. Backlog Priorizado

| ID   | User Story                                 | No MVP? | Valor | Urgência | Risco | Esforço | Dependência | Prioridade |
| ---- | ------------------------------------------ | ------- | ----- | -------- | ----- | ------- | ----------- | ---------- |
| US01 | Gerar documentos jurídicos automaticamente | Sim     | 5     | 5        | 2     | 3       | 5           | 19         |
| US02 | Gerenciar modelos de documentos            | Sim     | 5     | 4        | 2     | 2       | 4           | 18         |
| US03 | Exportar documentos em PDF                 | Sim     | 4     | 3        | 1     | 2       | 3           | 13         |
| US04 | Listar documentos gerados                  | Não     | 4     | 3        | 1     | 2       | 3           | 13         |
| US05 | Buscar documentos por filtros              | Não     | 4     | 4        | 2     | 3       | 3           | 14         |
| US06 | Cadastrar novos clientes                   | Sim     | 5     | 5        | 1     | 2       | 5           | 19         |
| US07 | Atualizar dados dos clientes               | Sim     | 4     | 4        | 2     | 2       | 4           | 16         |
| US08 | Excluir registros de clientes              | Sim     | 3     | 3        | 2     | 2       | 3           | 12         |
| US09 | Listar clientes                            | Sim     | 4     | 3        | 1     | 1       | 3           | 14         |
| US10 | Buscar clientes por nome/CPF/CNPJ          | Sim     | 4     | 4        | 1     | 2       | 3           | 14         |
| US11 | Buscar processos pela OAB                  | Sim     | 5     | 5        | 2     | 3       | 5           | 19         |
| US12 | Buscar processo específico                 | Sim     | 4     | 4        | 2     | 2       | 4           | 16         |
| US13 | Listar documentos do processo              | Não     | 4     | 3        | 2     | 2       | 3           | 14         |
| US14 | Notificar movimentações processuais        | Sim     | 5     | 5        | 3     | 3       | 5           | 20         |
| US15 | Registrar honorários contratuais           | Não     | 4     | 3        | 3     | 3       | 3           | 17         |
| US16 | Registrar honorários de êxito              | Não     | 4     | 3        | 3     | 3       | 3           | 17         |
| US17 | Controlar pagamento de parcelas            | Não     | 4     | 3        | 3     | 3       | 3           | 17         |
| US18 | Visualizar status de parcelas              | Não     | 4     | 3        | 2     | 2       | 3           | 17         |
| US19 | Visualizar histórico de pagamentos         | Não     | 4     | 3        | 2     | 2       | 3           | 17         |
| US20 | Buscar histórico por filtros               | Não     | 4     | 3        | 3     | 3       | 3           | 17         |
| US21 | Gerar relatório financeiro                 | Não     | 3     | 2        | 2     | 2       | 2           | 13         |
| US22 | Modificar registros de pagamento           | Não     | 3     | 2        | 3     | 3       | 2           | 12         |
| US23 | Categorizar pagamentos                     | Não     | 2     | 2        | 1     | 2       | 1           | 7          |
| US24 | Gerar links de pagamento                   | Não     | 3     | 3        | 2     | 3       | 2           | 13         |
| US25 | Efetuar pagamento via gateway              | Não     | 4     | 3        | 2     | 3       | 3           | 16         |
| US26 | Gerenciar links de pagamento               | Não     | 3     | 3        | 2     | 2       | 2           | 13         |
| US27 | Cadastrar usuário no sistema                       | Sim     | 5     | 5        | 2     | 2       | 5           | 20         |
| US28 | Realizar login                             | Sim     | 5     | 5        | 1     | 2       | 5           | 19         |
| US29 | Recuperar senha                            | Não     | 4     | 3        | 2     | 2       | 3           | 14         |
| US30 | Confirmar e-mail                           | Não     | 4     | 3        | 2     | 2       | 3           | 14         |
| US31 | Editar dados do perfil                     | Sim     | 3     | 3        | 1     | 2       | 3           | 11         |
| US32 | Visualizar dados do perfil                 | Sim     | 3     | 2        | 1     | 1       | 2           | 10         |
| US33 | Alterar senha                              | Sim     | 3     | 3        | 1     | 1       | 2           | 11         |
| US34 | Logout                                     | Sim     | 3     | 2        | 1     | 1       | 2           | 10         |

---

## 9.4. Observações

* O backlog será reavaliado a cada sprint, conforme orienta o modelo **DEEP** (Detalhado, Estimado, Emergente, Priorizado).
* As pontuações podem ser ajustadas conforme novos aprendizados e validações com a cliente.


