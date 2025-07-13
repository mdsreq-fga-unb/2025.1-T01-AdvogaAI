### US12 - Vincular OAB à conta do advogado

- Como advogado, quero vincular meu número de OAB à minha conta, para evitar atrasos nos prazos processuais.

### Critérios de aceitação
- O advogado consegue acessar a seção de perfil para vincular a OAB.
- O formulário para inserir a OAB e o estado de registro está disponível e funcional.
- A OAB válida é corretamente associada à conta do advogado.


### Notas técnicas (opcional)
- Após a vinculação bem-sucedida, o sistema deve exibir uma mensagem de sucesso ao usuário.
- Em caso de falha na validação ou vinculação (ex: OAB inválida, OAB já vinculada a outra conta), o sistema deve exibir mensagens de erro claras e informativas.

### Análise de Risco
- Valor: 5 - Urgência: 5 - Risco: 2 - Esforço: 3 - Dependência: 5 - Prioridade: 19

### Protótipo relacionado a US

<img width="709" alt="Image" src="https://github.com/user-attachments/assets/af1da080-fbdf-49ff-9e2a-9fa8daf1dd21" />


### Épico vinculado

- Épico 3.1: Vinculação e Notificação de Movimentações

### US27 - Visualizar dados do perfil

- Como usuário, quero visualizar meus dados de perfil, para conferir e acompanhar minhas informações.

### Critérios de aceitação

- O usuário consegue navegar até a tela de visualização de perfil.
- A tela de perfil exibe corretamente as informações cadastradas do usuário.
- Os dados são apresentados de maneira legível e sem distorções.

### Regras de negócio

- As informações exibidas devem incluir, mas não se limitar a, nome completo, e-mail, OAB e telefone.

### Análise de Risco
- Valor: 3 - Urgência: 2 - Risco: 1 - Esforço: 1 - Dependência: 2 - Prioridade: 10

### Protótipo relacionado a US

<img width="785" alt="Image" src="https://github.com/user-attachments/assets/498cc7f9-4ef1-455b-a99c-14e84824f84f" />

### Épico vinculado

Épico 5.2: Gestão do Perfil de Usuário


### US13 - Listar processos vinculado a OAB

- Como advogado, quero visualizar os processos, para acompanhar os prazos de forma eficiente.

### Critérios de aceitação

- O sistema deve permitir que o advogado visualize todos os processos.

### Regras de Negócio

- O sistema deve exibir uma lista de todos os processos, incluindo Número do Processo, Classe, Última Movimentação, Prazo de Resposta, Tribunal
- É necessário implementar um endpoint na API para listar os processos do usuario.

### Análise de Risco
Valor: 4 - Urgência: 3 - Risco: 2 - Esforço: 2 - Dependência: 3 - Prioridade: 14

### Protótipo relacionado a US

<img width="2555" height="1245" alt="Image" src="https://github.com/user-attachments/assets/d2d1e3ec-3b8c-4f51-ad59-10fc55f1f190" />

### Épico vinculado

- Épico 3.1: Vinculação e Notificação de Movimentações

### US32 - Excluir documento gerado

Como advogado, quero excluir um documento gerado, para remover dados obsoletos do sistema. 

### Critérios de aceitação

- O documento exlcuido tambem deve ser excluido do minio

### Protótipo

<img width="2522" height="1312" alt="Image" src="https://github.com/user-attachments/assets/cee7da70-0709-4cca-82fe-5b4c980e074c" />


### US30 - Landing page do sistema

- Como usuário, quero entrar na ladning page do site, para ver informações gerais sobre o sistema e poder me redirecionar para o login. 

### Análise de Risco
- Valor: 5 - Urgência: 5 - Risco: 3 - Esforço: 3 - Dependência: 5 - Prioridade: 20


### Critérios de aceitação

- O sistema deve possuir uma landing page informativa sobre do que se trata o sistema
- Desejo clicar em um botão e ser redirecionado para a tela de login

<img width="2367" height="1238" alt="Image" src="https://github.com/user-attachments/assets/d998225d-80c4-433b-9047-7e6551ee0f9e" />

### US23 - Cadastrar usuário

- Como novo usuário, quero me cadastrar no sistema, para poder utilizar todas as funcionalidades disponíveis.

### Critérios de aceitação

- O usuário consegue acessar a tela de cadastro no sistema.
- O novo usuário cadastrado pode realizar login no sistema.

### Regras de negócio


- O formulário de cadastro inclui os campos obrigatórios (nome, e-mail, senha, Confirme sua senha).
- As validações de e-mail e senha são aplicadas corretamente, impedindo o cadastro com dados inválidos.
- Após preencher os dados corretamente e submeter o formulário, o usuário recebe uma confirmação de sucesso.

### Análise de Risco
- Valor: 5 - Urgência: 5 - Risco: 2 - Esforço: 2 - Dependência: 5 - Prioridade: 20

### Protótipo relacionado a US

<img width="753" alt="Image" src="https://github.com/user-attachments/assets/7643b0ef-04e7-4096-8372-cc3ef7a86b34" />


### Épico vinculado

Épico 5.1: Cadastro e Acesso ao Sistema

### US07 - Atualizar dados de clientes

- Como advogado, quero atualizar os dados dos clientes, para mantê-los atualizados conforme as necessidades.

### Critérios de aceitação

-O advogado consegue buscar e selecionar um cliente existente para edição.
- Os campos de dados do cliente são preenchidos com as informações atuais para edição.
- O advogado consegue modificar os dados do cliente e salvar as alterações.

### Regras de negócios
- O sistema deve validar o formato do CPF e-mail no momento da atualização.
- O sistema deve exibir uma mensagem de sucesso após a atualização dos dados do cliente.
- O sistema deve exibir mensagens de erro claras em caso de falha na atualização (ex: cliente não encontrado, formato inválido dos dados).

### Análise de Risco
Valor: 4 - Urgência: 4 - Risco: 2 - Esforço: 2 - Dependência: 4 - Prioridade: 16

### Protótipo relacionado a US

<img width="927" alt="Image" src="https://github.com/user-attachments/assets/59b3663d-09fe-4e1c-8b25-763f7a923b8c" />

### Épico vinculado

Épico 2.1: Cadastro e Atualização de Clientes


## US09 - Visualizar clientes

### História de usuário
- Como advogado, quero visualizar todos os clientes cadastrados, para facilitar a visualização e busca.

### Critérios de aceitação
- O advogado consegue acessar a tela de visualização de clientes.
- Deve haver opção de busca por nome ou cpf.
- A lista deve ser paginada e filtrável.

### Regras de negócio
- O sistema deve listar todos os clientes cadastrados exibindo as seguintes informações: nome, e-mail e CPF.
- Deve haver uma opção de busca que permita encontrar clientes por nome ou número de documento (CPF).
- Endpoint para busca e paginação deve ser implementado na API.

### Análise de Risco
- Valor: 4 - Urgência: 3 - Risco: 1 - Esforço: 1 - Dependência: 3 - Prioridade: 14

### Protótipo relacionado a US

<img width="898" alt="Image" src="https://github.com/user-attachments/assets/c14f0631-fb5a-426c-8417-bc039eede5cd" />

### Épico vinculado
- Épico 2.2: Visualização de Clientes

## US03 - Editar modelos de documentos

### História de usuário
- Como advogado, quero editar modelos de documentos, para mantê-los atualizados conforme as necessidades.

### Critérios de aceitação
- O advogado consegue navegar e selecionar um modelo de documento para edição.
- O sistema deve permitir abrir um modelo existente e alterá-lo.
- As alterações devem poder ser salvas e refletidas em futuros documentos gerados.

### Regras de negócio
- O sistema deve validar os campos na edição (campos vazio ou com caracteres invalidos)

### Análise de Risco
- Valor: 5 - Urgência: 4 - Risco: 2 - Esforço: 2 - Dependência: 4 - Prioridade: 18

### Protótipo relacionado a US

<img width="2538" height="1300" alt="Image" src="https://github.com/user-attachments/assets/d07b19d3-8e20-4871-bf4b-5b5ad3e47b6e" />

### Épico vinculado
- Épico 1.1: Criação e Manipulação de Modelos de Documentos


### US31 - Dashboard do sistema

Como advogado, quero entrar no dashboard, para ver informações gerais sobre meus clientes, documentos, processos e ultimas movimentações.

### Critérios de aceitação

- Contem a contagem de clientes, documentos gerados e processos vinculados a sua oab
- Possui a listagem de processos urgentes
- Possui a listagem de ultimas movimentações

### Análise de Risco
Valor: 5 - Urgência: 5 - Risco: 3 - Esforço: 3 - Dependência: 5 - Prioridade: 20

### Protótipo

<img width="982" height="631" alt="Image" src="https://github.com/user-attachments/assets/c23ade4d-c74b-44b1-b176-7d67464ce9bf" />


## US02 - Criar modelos de documentos

### História de usuário
- Como advogado, quero criar modelos de documentos, para agilizar a produção de documentos recorrentes.

### Critérios de aceitação
- O sistema deve permitir ao usuário criar um modelo de documento com campos dinâmicos.
- Deve haver opção de salvar e editar o modelo posteriormente.
- O modelo criado deve ser armazenado na base de dados do sistema.

### Regras de negócio
- O sistema deve identificar as tags no documento e relaciona-las com as tags existentes no banco
- Se nao existir tags que coincidem com o documento, alertar o usuário e pedir input desses dados na geração

### Análise de Risco
- Valor: 5 - Urgência: 4 - Risco: 2 - Esforço: 2 - Dependência: 4 - Prioridade: 18

### Protótipo relacionado a US

<img width="858" alt="Image" src="https://github.com/user-attachments/assets/55b3e30c-8589-4924-b650-1e03971b03b6" />

### Épico vinculado
- Épico 1.1: Criação e Manipulação de Modelos de Documentos


### US11 - Visualizar documentos gerados

Como advogado, quero visualizar a lista de documentos gerados, para localizar e gerenciar meus arquivos.


### Critérios de aceitação

- A listagem é paginada e pode ser filtrada por uma pesquisa

### Protótipo

<img width="2522" height="1312" alt="Image" src="https://github.com/user-attachments/assets/55a324f8-8223-42e0-a066-e34c139ded85" />
