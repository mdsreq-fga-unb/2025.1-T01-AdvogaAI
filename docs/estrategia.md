| Data       | Versão | Descrição                          | Autor                    |
|------------|--------|------------------------------------|--------------------------|
| 21/04/2025 | *1.1*  | Adição sessão 3 - Estratégia        | Ana Luiza Pfeilsticker   |
| 29/04/2025 | *1.2*  | Atualização da estratégia da equipe        | Nathan Batista Santos   |

# III. ESTRATÉGIAS DE ENGENHARIA DE SOFTWARE

### 3.1 Estratégia priorizada

**Abordagem**: Híbrida    
**Ciclo de vida**: Adaptativo  
**Processo de engenharia de software**: RAD e ScrumXP

---
### 3.2 Quadro comparativo

O quadro a seguir apresenta características comparativas entre os processos: **RAD** e **ScrumXP**, visando auxiliar o entendimento da escolha mais adequada de processo ao caso do **AdvogaAI**.

| *Características*                      | *RAD (Rapid Application Development)*                                               | *ScrumXP*                                                                       |
|---------------------------------------|-------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| **Abordagem Geral**                   | Focado em desenvolvimento rápido com uso intensivo de prototipação.                | Ágil com foco em entregas rápidas e feedback contínuo.                          |
| **Foco em Arquitetura**               | Baixo foco em arquitetura no início, priorizando entregas rápidas com protótipos.  | Evolução da arquitetura ao longo do tempo e conforme a necessidade.            |
| **Estrutura de Processos**            | Baseado em fases como modelagem, prototipação, testes e iteração rápida.           | Focado em sprints curtos e flexíveis (2-4 semanas) com entregas incrementais.   |
| **Flexibilidade de Requisitos**       | Alta flexibilidade, com requisitos evoluindo conforme os protótipos são testados.  | Alta flexibilidade com adaptação contínua dos requisitos a cada sprint.         |
| **Colaboração com Cliente**           | Envolvimento frequente durante as fases de prototipação e testes.                  | Envolvimento constante, com feedback ao final de cada sprint.                   |
| **Complexidade do Processo**          | Processo simples e rápido, com pouca formalidade e foco na velocidade.             | Leve e ágil, com foco na entrega funcional e adaptação contínua.                |
| **Qualidade Técnica**                 | Qualidade validada com testes rápidos sobre os protótipos.                         | Alta ênfase em qualidade com TDD, integração contínua e pair programming.       |
| **Práticas de Desenvolvimento**       | Foco em ciclos rápidos de prototipagem e testes, com menos práticas estruturadas.  | TDD, refatoração contínua, integração contínua e pair programming.              |
| **Adaptação ao Projeto AdvogaAI**     | Útil para gerar protótipos rápidos da interface e validar ideias com usuários.     | Ideal para evolução contínua da plataforma com qualidade e feedbacks.           |
| **Documentação**                      | Documentação mínima, focada em protótipos e requisitos emergentes.                 | Documentação reduzida, centrada no essencial e comunicação ágil.                |
| **Controle de Qualidade**             | Baseado em revisões de protótipos e feedback do cliente.                           | Embutido com testes automatizados e práticas ágeis de qualidade.                |
| **Escalabilidade**                    | Limitado a projetos de menor escala e com menos complexidade técnica.              | Escalável, indicado para equipes pequenas e médias com foco em colaboração.     |
| **Suporte a Equipes de Desenvolvimento** | Adequado para equipes pequenas com foco em entrega rápida.                   | Ideal para equipes colaborativas, com papéis flexíveis e alta comunicação.      |

---

### 3.3 Apoio na Escolha: Análise com Base no Framework de Gupta (2008)

###  REQUISITOS

| Pergunta                                                                 | CASCATA | ESPIRAL | RAD  | PROCESSO UNIFICADO | SCRUM / XP | OPEN UP | SAFE | PROJETO |
|--------------------------------------------------------------------------|---------|---------|------|---------------------|-------------|---------|------|---------|
| Os requisitos são fáceis de entender e definir?                         | SIM     | NÃO     | NÃO  | NÃO                 | NÃO         | NÃO     | SIM  | NÃO      |
| Nos iremos mudar os requisitos com bastante frequência?                 | NÃO     | SIM     | SIM  | SIM                 | SIM         | SIM     | NÃO  | SIM       |
| Podemos definir os requisitos no início de cada ciclo?                    | NÃO     | SIM     | SIM  | SIM                 | SIM         | NÃO     | NÃO  | SIM       |
| Os requisitos estão indicando um sistema complexo para se construir?    | SIM     | NÃO     | NÃO  | NÃO                 | NÃO         | NÃO     | SIM  | NÃO       |

---

###  EQUIPE DE DESENVOLVIMENTO

| Pergunta                                                                 | CASCATA | ESPIRAL | RAD  | PROCESSO UNIFICADO | SCRUM / XP | OPEN UP | SAFE | PROJETO |
|--------------------------------------------------------------------------|---------|---------|------|---------------------|-------------|---------|------|---------|
| Pouca experiência em projetos similares?                                 | SIM     | NÃO     | SIM  | NÃO                 | NÃO         | NÃO     | NÃO  | NÃO       |
| Pouco conhecimento de domínio (novato na tecnologia)?                    | SIM     | SIM     | SIM  | NÃO                 | NÃO         | NÃO     | NÃO  | NÃO       |
| Pouca experiência com as ferramentas utilizadas?                         | SIM     | SIM     | SIM  | NÃO                 | NÃO         | NÃO     | NÃO  | NÃO       |
| Disponibilidade para treinamento, se necessário?                         | NÃO     | NÃO     | SIM  | SIM                 | SIM         | SIM     | SIM  | SIM       |

---

###  STAKEHOLDERS

| Pergunta                                                                 | CASCATA | ESPIRAL | RAD  | PROCESSO UNIFICADO | SCRUM / XP | OPEN UP | SAFE | PROJETO |
|--------------------------------------------------------------------------|---------|---------|------|---------------------|-------------|---------|------|---------|
| Usuário está envolvido em todas as fases?                                | NÃO     | SIM     | NÃO  | SIM                 | SIM         | SIM     | SIM  | SIM       |
| Participação limitada do usuário?                                        | SIM     | NÃO     | SIM  | NÃO                 | NÃO         | NÃO     | NÃO  | NÃO       |
| Usuário não tem experiência anterior em projetos semelhantes?            | NÃO     | SIM     | SIM  | SIM                 | SIM         | SIM     | NÃO  | NÃO       |
| Usuário é especialista no domínio do problema?                           | SIM     | SIM     | NÃO  | SIM                 | SIM         | SIM     | SIM  | SIM       |

---

###  TIPO DE PROJETO E RISCO ASSOCIADO

| Pergunta                                                                 | CASCATA | ESPIRAL | RAD  | PROCESSO UNIFICADO | SCRUM / XP | OPEN UP | SAFE | PROJETO |
|--------------------------------------------------------------------------|---------|---------|------|---------------------|-------------|---------|------|---------|
| O financiamento estável para o projeto?                                  | SIM     | NÃO     | SIM  | NÃO                 | NÃO         | NÃO     | SIM  | SIM       |
| Requisitos de alta confiabilidade?                                       | NÃO     | SIM     | NÃO  | SIM                 | SIM         | SIM     | SIM  | SIM       |
| Cronograma do projeto é apertado?                                        | NÃO     | SIM     | SIM  | SIM                 | SIM         | SIM     | SIM  | SIM       |
| Os recursos (tempo, dinheiro, pessoas etc.) estão escassos?              | NÃO     | SIM     | NÃO  | NÃO                 | SIM         | SIM     | SIM  | SIM       |

---

##  MELHORES PROCESSOS — Soma de Pontos

| Processo             | Pontuação |
|----------------------|-----------|
| **CASCATA**          | 5         |
| **ESPIRAL**          | 11        |
| **RAD**              | 9         |
| **PROCESSO UNIFICADO** | 11      |
| **SCRUM / XP**       | **13**    |
| **OPEN UP**          | 12        |
| **SAFe**             | 12        |

---

##  Conclusão

Com base na aplicação do **Framework de Gupta (2008)** ao projeto **AdvogaAI**, o processo com maior compatibilidade foi o **Scrum / XP**, com 13 pontos. Essa abordagem oferece:

- Alta adaptabilidade a mudanças nos requisitos,
- Valorização da colaboração com o cliente,
- Práticas de alta qualidade técnica,
- E ciclos de entrega contínua com foco em valor.

# Justificativa para a Escolha do Modelo Híbrido entre RAD e ScrumXP

A combinação dos processos **RAD (Rapid Application Development)** e **ScrumXP** foi adotada para o projeto pelas seguintes razões:

- **RAD**: No início do projeto, utilizamos protótipos rápidos para validar ideias com a cliente, que não possui experiência em programação. Isso facilita o entendimento e o feedback rápido.
- **ScrumXP**: Após a validação inicial, o processo **ScrumXP** é utilizado para garantir flexibilidade, entregas contínuas e qualidade técnica, permitindo que a equipe evolua o projeto de forma eficiente, com foco em melhorias constantes e adaptadas às necessidades do cliente.

Com a combinação desses dois processos, iniciando com **RAD** para protótipos rápidos e seguindo com **ScrumXP** para desenvolvimento ágil e contínuo, o **ciclo de vida adaptativo** se torna a escolha mais adequada para o **AdvogaAI**, garantindo eficiência, flexibilidade e qualidade ao longo de todo o projeto.

