
# **Tema 5: Gestão de Acesso e Perfil de Usuário**

## **Épico 5.1: Cadastro e Acesso ao Sistema**

###   **US06: US23 - Cadastrar usuário**
Como advogado(a), quero cadastrar minhas informações no sistema, para que eu possa acessar as funcionalidades do AdvogaAI.

#### Critérios de aceitação

- O usuário deve conseguir informar nome completo, e-mail e senha.
- A senha deve ter um mínimo de 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.
- O AdvogaAI deve exibir uma mensagem de sucesso após o cadastro.
- O AdvogaAI deve exibir mensagens de erro claras em caso de falha no cadastro (ex: e-mail já cadastrado, senha inválida).

#### Notas técnicas (opcional)

- O sistema deve validar o formato do e-mail.

#### Protótipo Associado a US

![Register](https://github.com/user-attachments/assets/69e91f42-ef36-4aec-ac13-a79a2de2cfac)


###   **US24 - Realizar login**
- Como um usuário cadastrado, quero fazer login no sistema, para que eu possa acessar minha conta e utilizar o AdvogaAI.

#### Critérios de aceitação

- O usuário deve conseguir informar e-mail e senha para login.
- O sistema deve ter uma opção de "Esqueci minha senha".


#### Regras de Negócio

- O sistema deve validar as credenciais informadas.
- Em caso de credenciais corretas, o usuário deve ser redirecionado para a página inicial do sistema.
- Em caso de credenciais incorretas, o sistema deve exibir uma mensagem de erro clara (ex: "E-mail ou senha inválidos").

  #### Protótipo Associado a US
![Login](https://github.com/user-attachments/assets/a6e9f935-0654-4eb8-a9c3-d4a037bf131f)

### US29 - Encerrar sessão (logout)

#### História de usuário
Como usuário, quero encerrar minha sessão com segurança, para proteger meus dados.

#### Critérios de aceitação
- O sistema possui botão de logout visível e funcional.  
- Após logout, o usuário é redirecionado à tela de login.  
- O token de autenticação é invalidado.

#### Análise de Risco
Valor: 4 - Urgência: 4 - Risco: 1 - Esforço: 1 - Dependência: 3 - Prioridade: 13

#### Protótipo relacionado a US

<img width="1893" height="913" alt="image" src="https://github.com/user-attachments/assets/4560891c-ceb0-4b9d-a8c8-0c9d47044574" />

## **Épico 5.2: Gestão do perfil de usuário**

### US26 - Editar dados do perfil

#### História de usuário
Como usuário, quero editar meus dados de perfil, para manter minhas informações atualizadas.

#### Critérios de aceitação
- O sistema permite editar nome, telefone, e-mail e OAB.  
- As alterações são validadas e salvas corretamente.  
- O sistema exibe mensagem de sucesso ou erro após tentativa de edição.

#### Regras de negócio
- Os campos devem ser validados conforme formato (e-mail, OAB).  
- O e-mail não pode ser duplicado no sistema.

#### Análise de Risco
Valor: 3 - Urgência: 3 - Risco: 1 - Esforço: 1 - Dependência: 3 - Prioridade: 11

#### Protótipo relacionado a US

<img width="702" height="449" alt="image" src="https://github.com/user-attachments/assets/ee3136cf-5ddf-41c8-9b92-f57e1177145e" />

### US27 - Visualizar dados do perfil

#### História de usuário
- Como usuário, quero visualizar meus dados de perfil, para conferir e acompanhar minhas informações.

#### Critérios de aceitação

- O usuário consegue navegar até a tela de visualização de perfil.
- A tela de perfil exibe corretamente as informações cadastradas do usuário.
- Os dados são apresentados de maneira legível e sem distorções.

#### Regras de negócio

- As informações exibidas devem incluir, mas não se limitar a, nome completo, e-mail, OAB e telefone.

#### Análise de Risco
- Valor: 3 - Urgência: 2 - Risco: 1 - Esforço: 1 - Dependência: 2 - Prioridade: 10

#### Protótipo relacionado a US

<img width="785" alt="Image" src="https://github.com/user-attachments/assets/498cc7f9-4ef1-455b-a99c-14e84824f84f" />

### US28 - Alterar senha

#### História de usuário
Como usuário, quero alterar minha senha, para garantir a segurança do meu acesso ao sistema.

#### Critérios de aceitação
- O usuário consegue acessar a opção de alterar senha via perfil ou menu de configurações.  
- O sistema exige senha atual e confirmação da nova senha.  
- Em caso de sucesso ou falha, o sistema exibe mensagens adequadas.

#### Regras de negócio
- A nova senha deve atender aos critérios mínimos de segurança (tamanho, caracteres especiais etc.).  
- A senha atual deve ser validada antes da alteração.

#### Análise de Risco
Valor: 4 - Urgência: 4 - Risco: 2 - Esforço: 2 - Dependência: 4 - Prioridade: 16

#### Protótipo relacionado a US

<img width="1905" height="919" alt="image" src="https://github.com/user-attachments/assets/8ce6c1ed-b1cd-4c66-9ec3-4b955ba307e2" />

