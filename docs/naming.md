# Guia de Nomenclatura - Projeto AdvogaAI

Este guia define os padrões de nomenclatura para issues, branches, pull requests e commits com o objetivo de manter a consistência, rastreabilidade e clareza no repositório do projeto.


## 1. Issues

As issues são categorizadas em quatro tipos principais:

| Tipo                        | Prefixo | Exemplo  | Descrição                                                                  |   |
| --------------------------- | ------- | -------- | -------------------------------------------------------------------------- | - |
| Épico                       | `EP`    | `EP001`  | Funcionalidades maiores compostas por várias user stories (subissues).     |   |
| Funcionalidade (User Story) | `US`    | `US001`  | Novas funcionalidades voltadas à experiência ou objetivo do usuário final. |   |
| Bug                         | `BUG`   | `BUG002` | Correção de defeitos que impedem o comportamento esperado do sistema.      |   |
| Chore (Tarefa técnica)      | `CH`    | `CH003`  | Tarefas internas como configuração de ambiente, CI/CD ou refatoramentos.   |   |

### 1.1 User Stories (US)

Devem seguir o padrão:

```
Como [persona ou tipo de usuário],
quero [realizar uma ação ou objetivo],
para que [benefício ou valor entregue].
```

**Exemplo:**

```
US004 - Como advogada, quero cadastrar um novo cliente, para que eu possa iniciar um processo com seus dados corretamente registrados.
```

As US devem ser pequenas e entregáveis em um único ciclo de desenvolvimento. Caso contrário, devem ser desmembradas ou agrupadas sob um Épico.

### 1.2 Bugs (BUG)

**Exemplo:**

```
BUG002 - O campo "prazo processual" não salva a data corretamente
```

### 1.3 Chores (CH)

**Exemplo:**

```
CH003 - Configurar pipeline de deploy automático para ambiente de staging
```

### 1.4 Épicos

Épicos agrupam diversas user stories que fazem parte de uma funcionalidade maior.

**Prefixo:** `EP`\
**Exemplo:**

```
EP001 - Cadastro e gestão de clientes
```

Cada Épico deve possuir:

- Uma descrição geral do fluxo
- Uma lista ou checklist com links para as user stories relacionadas
- Rótulo `epic` para organização visual

**Exemplo de vinculação de subissues:**

```
- [ ] US004 - Cadastro de novo cliente
- [ ] US005 - Edição de dados do cliente
- [ ] US006 - Visualização de clientes cadastrados
```


## 2. Branches

As branches devem seguir a estrutura:

```
<tipo>/<identificador>-<slug-descritivo>
```

| Tipo    | Descrição                            | Exemplo                       |
| ------- | ------------------------------------ | ----------------------------- |
| `feat`  | Funcionalidades novas (User Stories) | `feat/US004-cadastro-cliente` |
| `fix`   | Correções de bugs                    | `fix/BUG002-campo-prazo`      |
| `chore` | Tarefas técnicas                     | `chore/CH003-pipeline-deploy` |


## 3. Pull Requests

Os títulos de PR devem manter o mesmo prefixo e descrição da issue, respeitando o tipo.

**Exemplos:**

```
US004 - Implementa cadastro de cliente com upload de documentos
BUG002 - Corrige bug na data do campo "prazo processual"
CH003 - Adiciona pipeline de deploy automático para staging
```

Todo PR deve:

- Estar vinculado a uma issue usando `Closes #ID` ou `Resolves #ID`
- Conter uma descrição clara das mudanças
- Ser revisado antes de merge

---

## 4. Commits

Utilizamos o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/).

### Exemplos:

```
feat: adiciona tela de cadastro de cliente
fix: corrige erro no campo de data do prazo
chore: configura CI com GitHub Actions
```

### Tipos comuns:

| Tipo       | Uso comum                                              |
| ---------- | ------------------------------------------------------ |
| `feat`     | Nova funcionalidade                                    |
| `fix`      | Correção de bug                                        |
| `chore`    | Tarefa técnica (infraestrutura, configuração, scripts) |
| `refactor` | Refatoramento de código sem mudança de comportamento   |
| `docs`     | Mudanças na documentação                               |
| `test`     | Adição ou modificação de testes                        |
| `style`    | Mudanças de formatação, espaço, ponto e vírgula, etc.  |

Mais detalhes em: [https://www.conventionalcommits.org/pt-br/v1.0.0/](https://www.conventionalcommits.org/pt-br/v1.0.0/)

---

## 5. Boas Práticas

- Utilize rótulos (labels) nas issues: `user-story`, `bug`, `chore`, `epic`
- Relacione issues com PRs: `Closes #ID`
- Crie branches com nomes claros e legíveis
- Commits pequenos, frequentes e significativos
- Nunca dê merge diretamente nas branches `main`, `dev` e `stg`, sempre abra PR antes


