
# **Tema 2: Gestão de Clientes**

## **Épico 2.1: Cadastro e Atualização de Clientes**

### **US06: Cadastrar clientes**
- Como advogado, quero cadastrar meus clientes no sistema, para agilizar o atendimento e organização.

#### Critérios de aceitação

- O advogado deve conseguir acessar o formulário de cadastro de clientes.
- O preenchimento e submissão do formulário com dados válidos resulta no registro do novo cliente no sistema.

#### Regras de negócio 

- O sistema deve permitir o cadastro de nome completo, CPF/CNPJ, endereço, telefone, e-mail do cliente e estado civil.
- O sistema deve validar o formato do CPF/CNPJ e do e-mail informados.
- Após o cadastro bem-sucedido, o sistema deve exibir uma mensagem de sucesso ao usuário.
- Em caso de falha no cadastro (ex: CPF/CNPJ já cadastrado, formato inválido dos dados), o sistema deve exibir mensagens de erro claras e informativas.

#### Análise de Risco

- Valor: 5 - Urgência: 5 - Risco: 1 - Esforço: 2 - Dependência: 5 - Prioridade: 19
- Depende de registro de advogado.
- Poker planning: 3.2 pts
#### Prototipo relacionado a US
<img width="926" alt="Image" src="https://github.com/user-attachments/assets/ba7323e2-56bf-4a46-ac5c-d6a195f53b43" />


###   **US07: Atualizar dados de clientes**
- Como advogado, quero atualizar os dados dos clientes, para mantê-los atualizados conforme as necessidades.

#### Critérios de aceitação

-O advogado consegue buscar e selecionar um cliente existente para edição.
- Os campos de dados do cliente são preenchidos com as informações atuais para edição.
- O advogado consegue modificar os dados do cliente e salvar as alterações.

#### Regras de negócios
- O sistema deve validar o formato do CPF/CNPJ e e-mail no momento da atualização.
- O sistema deve exibir uma mensagem de sucesso após a atualização dos dados do cliente.
- O sistema deve exibir mensagens de erro claras em caso de falha na atualização (ex: cliente não encontrado, formato inválido dos dados).

#### Análise de Risco
Valor: 4 - Urgência: 4 - Risco: 2 - Esforço: 2 - Dependência: 4 - Prioridade: 16
Poker Planning: 2.8 pts

#### Protótipo relacionado a US

<img width="927" alt="Image" src="https://github.com/user-attachments/assets/59b3663d-09fe-4e1c-8b25-763f7a923b8c" />


### **US08: Excluir registros de clientes**
- Como advogado, quero excluir registros de clientes, para remover dados obsoletos do sistema.

#### Critérios de aceitação

- O sistema deve permitir a seleção de um cliente para exclusão.
- Após a confirmação, o registro do cliente é removido com sucesso do sistema.

#### Regras de negócio
- O sistema deve solicitar uma confirmação antes de efetivar a exclusão (ex: "Tem certeza que deseja excluir este cliente?").
- O sistema deve exibir uma mensagem de sucesso após a exclusão.
- O sistema deve exibir mensagens de erro claras em caso de falha na exclusão (ex: cliente não encontrado, erro de permissão).

#### Análise de Risco
- Valor: 3- Urgência: 3 - Risco: 2 - Esforço: 2 - Dependência: 3 - Prioridade: 12
- Poker Planning: 2.2 pts

#### Prototipo relacionado a US

<img width="866" alt="Image" src="https://github.com/user-attachments/assets/cdb8ed66-033d-4486-b0a3-005d8d190954" />



## **Épico 2.2: Visualização de Clientes**

###   **US09: Listar clientes**
- Como advogado, quero visualizar todos os clientes cadastrados, para facilitar a visualização e busca.

#### Critérios de aceitação
- O sistema deve listar todos os clientes cadastrados com nome, e-mail e CPF/CNPJ.
- Deve haver opção de busca por nome ou número de documento.
- A lista deve ser paginada e filtrável.

#### Análise de Risco
Valor: 4 - Urgência: 3 - Risco: 1 - Esforço: 1 - Dependência: 0 - Prioridade: 16
Poker Planning: 2.2

#### Protótipo relacionado a US

![ClientList](https://github.com/user-attachments/assets/4bbf7a28-5be3-45eb-9abc-109eb5ec4f5c)
