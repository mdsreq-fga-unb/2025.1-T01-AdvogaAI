# **Tema 3: Processos e movimentações**

## **Épico 3.1: Vinculação e notificação de movimentações**

### US12 - Vincular OAB à conta do advogado

#### História de usuário

- Como advogado, quero vincular meu número de OAB à minha conta, para evitar atrasos nos prazos processuais.

#### Critérios de aceitação
- O advogado consegue acessar a seção de perfil para vincular a OAB.
- O formulário para inserir a OAB e o estado de registro está disponível e funcional.
- A OAB válida é corretamente associada à conta do advogado.


#### Notas técnicas (opcional)
- Após a vinculação bem-sucedida, o sistema deve exibir uma mensagem de sucesso ao usuário.
- Em caso de falha na validação ou vinculação (ex: OAB inválida, OAB já vinculada a outra conta), o sistema deve exibir mensagens de erro claras e informativas.

#### Análise de Risco
- Valor: 5 - Urgência: 5 - Risco: 2 - Esforço: 3 - Dependência: 5 - Prioridade: 19

#### Protótipo relacionado a US

<img width="709" alt="Image" src="https://github.com/user-attachments/assets/af1da080-fbdf-49ff-9e2a-9fa8daf1dd21" />

### US13 - Listar processos vinculado a OAB

#### História de usuário

- Como advogado, quero visualizar os processos, para acompanhar os prazos de forma eficiente.

#### Critérios de aceitação

- O sistema deve permitir que o advogado visualize todos os processos.

#### Regras de Negócio

- O sistema deve exibir uma lista de todos os processos, incluindo Número do Processo, Classe, Última Movimentação, Prazo de Resposta, Tribunal
- É necessário implementar um endpoint na API para listar os processos do usuario.

#### Análise de Risco
Valor: 4 - Urgência: 3 - Risco: 2 - Esforço: 2 - Dependência: 3 - Prioridade: 14

#### Protótipo relacionado a US

<img width="2555" height="1245" alt="Image" src="https://github.com/user-attachments/assets/d2d1e3ec-3b8c-4f51-ad59-10fc55f1f190" />

### US14 - Notificar movimentações de processos

#### História de usuário
Como advogado, quero ser notificado por e-mail sobre movimentações em meus processos, para acompanhar atualizações em tempo real.

#### Critérios de aceitação
- O sistema envia e-mails ao detectar novas movimentações em processos vinculados à OAB do advogado.  
- O conteúdo do e-mail inclui resumo da movimentação e link para visualização detalhada.

#### Regras de negócio
- O envio de notificações só ocorre para processos vinculados ao usuário autenticado.  
- O sistema deve registrar a data e hora da notificação.

#### Análise de Risco
Valor: 5 - Urgência: 5 - Risco: 3 - Esforço: 3 - Dependência: 5 - Prioridade: 21

#### Protótipo relacionado a US

<img width="1001" height="1378" alt="image" src="https://github.com/user-attachments/assets/6657a20f-eb94-4a8d-ad9a-58391d54a6ac" />
