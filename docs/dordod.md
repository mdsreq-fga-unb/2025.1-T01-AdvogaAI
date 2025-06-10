# 8. DoR e DoD

## 8.1 Definition of Ready (DoR)

A **Definition of Ready (DoR)** estabelece os critérios mínimos que uma **User Story** deve atender para ser considerada pronta para entrar em uma sprint. O objetivo é garantir clareza, viabilidade e alinhamento com o valor de negócio.

### Critérios:

- A história está escrita claramente no formato:  
  **"Como [papel do usuário], quero [ação], para que [valor de negócio]"**  
  _→ Técnica: User Story Pattern (INVEST)_

- Os critérios de aceitação foram definidos e revisados pelo Product Owner e pela equipe.  
  _→ Técnica: Revisão Colaborativa_

- O tamanho da história permite execução completa dentro de uma única sprint.  
  _→ Avaliado em Planning Poker_

- O valor e a relevância da história para o negócio são claramente compreendidos pela equipe.  
  _→ Validado em reuniões de refinamento_

- Possui riscos técnicos claramente identificados e discutidos.  
  _→ Técnica: Análise de Riscos_

- Todas as informações e recursos necessários para execução estão disponíveis: protótipo, documentação de integrações externas, critérios de aceitação.  
  _→ Técnica: Checklist de Pré-requisitos_

- O entendimento sobre o que deve ser entregue é claro e compartilhado pela equipe.  
  _→ Técnica: Refinamento com validação do entendimento por todos os membros_

- Garantir alinhamento de expectativas com a cliente.
  _→ Protótipação: Validação com a cliente sobre o protótipo de cada user story_

---

## 8.2. Definition of Done (DoD)

A **Definition of Done (DoD)** define os critérios obrigatórios para considerar uma história completamente finalizada, garantindo qualidade, completude técnica e alinhamento com o que foi acordado.

### Critérios:

- Todos os critérios de aceitação foram cumpridos e validados pela cliente.  
  _→ Técnica: Confirmação da cliente_

- O código desenvolvido está integrado à branch principal do repositório (main).  
  _→ Técnica: Integração Contínua_

- O incremento está de acordo com o seu respectivo requisito.

- O incremento atende aos padrões de qualidade e usabilidade definidos pela equipe.  
  _→ Fonte: Documentos de Requisitos Não Funcionais (RNF01 a RNF19)_

- Não há bugs conhecidos relacionados à história implementada.  
  _→ Técnica: Testes manuais, automatizados e verificação de issues abertas._

- A funcionalidade está disponível em ambiente de testes ou homologação para verificação.  
  _→ Técnica: Deploy automatizado com pipeline configurada._
