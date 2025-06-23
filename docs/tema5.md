
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
