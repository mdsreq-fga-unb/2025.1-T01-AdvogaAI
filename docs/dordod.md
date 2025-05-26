# 8. DoR e DoD

## 8.1 Definition of Ready (DoR)

A **Definition of Ready (DoR)** estabelece os critérios mínimos que uma **User Story** deve atender para ser considerada pronta para entrar em uma sprint. O objetivo é garantir clareza, viabilidade e alinhamento com o valor de negócio.

### Critérios:

- [x] A história está escrita claramente no formato:  
  **"Como [papel do usuário], quero [ação], para que [valor de negócio]"**  
  *→ Técnica: User Story Pattern (INVEST)*

- [x] Os critérios de aceitação foram definidos e revisados pelo Product Owner e pela equipe.  
  *→ Técnica: Revisão Colaborativa*

- [x] O tamanho da história permite execução completa dentro de uma única sprint.  
  *→ Avaliado em Planning Poker*

- [x] O valor e a relevância da história para o negócio são claramente compreendidos pela equipe.  
  *→ Validado em reuniões de refinamento*

- [x] Possui riscos técnicos claramente identificados e discutidos.  
  *→ Técnica: Análise de Riscos*

- [x] Todas as informações e recursos necessários para execução estão disponíveis: protótipo, documentação de integrações externas, critérios de aceitação.  
  *→ Técnica: Checklist de Pré-requisitos*

- [x] O entendimento sobre o que deve ser entregue é claro e compartilhado pela equipe.  
  *→ Técnica: Refinamento com validação do entendimento por todos os membros*

---

## 8.2. Definition of Done (DoD)

A **Definition of Done (DoD)** define os critérios obrigatórios para considerar uma história completamente finalizada, garantindo qualidade, completude técnica e alinhamento com o que foi acordado.

### Critérios:

- [x] Todos os critérios de aceitação foram cumpridos e validados pela cliente.  
  *→ Técnica: Confirmação da cliente*

- [x] O código desenvolvido está integrado à branch principal do repositório (main).  
  *→ Técnica: Integração Contínua*

- [x] O incremento está de acordo com o seu respectivo requisito.  

- [x] O incremento atende aos padrões de qualidade e usabilidade definidos pela equipe.  
  *→ Fonte: Documentos de Requisitos Não Funcionais (RNF01 a RNF19)*

- [x] Não há bugs conhecidos relacionados à história implementada.  
  *→ Técnica: Testes manuais, automatizados e verificação de issues abertas.*

- [x] A funcionalidade está disponível em ambiente de testes ou homologação para verificação.  
  *→ Técnica: Deploy automatizado com pipeline configurada.*

