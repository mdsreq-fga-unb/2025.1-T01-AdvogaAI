## US12 - Vincular OAB à conta do advogado

### História de usuário

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

## US27 - Visualizar dados do perfil

### História de usuário
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


## US13 - Listar processos vinculado a OAB

### História de usuário

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

## US32 - Excluir documento gerado

### História de usuário
Como advogado, quero excluir um documento gerado, para remover dados obsoletos do sistema. 

### Critérios de aceitação

- O documento exlcuido tambem deve ser excluido do minio

### Protótipo

<img width="2522" height="1312" alt="Image" src="https://github.com/user-attachments/assets/cee7da70-0709-4cca-82fe-5b4c980e074c" />


## US30 - Landing page do sistema

### História de usuário
- Como usuário, quero entrar na ladning page do site, para ver informações gerais sobre o sistema e poder me redirecionar para o login. 

### Análise de Risco
- Valor: 5 - Urgência: 5 - Risco: 3 - Esforço: 3 - Dependência: 5 - Prioridade: 20


### Critérios de aceitação

- O sistema deve possuir uma landing page informativa sobre do que se trata o sistema
- Desejo clicar em um botão e ser redirecionado para a tela de login

<img width="2367" height="1238" alt="Image" src="https://github.com/user-attachments/assets/d998225d-80c4-433b-9047-7e6551ee0f9e" />

## US23 - Cadastrar usuário

### História de usuário

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

## US07 - Atualizar dados de clientes

### História de usuário
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


## US31 - Dashboard do sistema

### História de usuário
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


## US11 - Visualizar documentos gerados

### História de usuário
Como advogado, quero visualizar a lista de documentos gerados, para localizar e gerenciar meus arquivos.


### Critérios de aceitação

- A listagem é paginada e pode ser filtrada por uma pesquisa

### Protótipo

<img width="2522" height="1312" alt="Image" src="https://github.com/user-attachments/assets/55a324f8-8223-42e0-a066-e34c139ded85" />

## US01 - Preencher documentos jurídicos

### História de usuário
Como advogado, quero preencher documentos jurídicos com dados dos clientes, para gerar documentos personalizados rapidamente.

### Critérios de aceitação
- O sistema permite selecionar um modelo e cliente para preenchimento.  
- Os campos dinâmicos são substituídos por dados reais.  
- O advogado pode revisar antes de salvar o documento gerado.

### Regras de negócio
- Todos os campos obrigatórios do modelo devem ser preenchidos.  
- O sistema deve validar a consistência do documento antes da geração.

### Análise de Risco
Valor: 5 - Urgência: 5 - Risco: 3 - Esforço: 3 - Dependência: 5 - Prioridade: 21

### Protótipo relacionado a US

<img width="836" height="540" alt="image" src="https://github.com/user-attachments/assets/f9ec91e7-b711-46ee-b7d6-4f84624b7d84" />

### Épico vinculado
Épico 1.2: Geração de Documentos Jurídicos

## US04 - Deletar modelos de documentos

### História de usuário
Como advogado, quero excluir modelos de documentos, para remover conteúdos obsoletos do sistema.

### Critérios de aceitação
- O advogado consegue selecionar e excluir um modelo de documento.  
- O sistema solicita confirmação da exclusão.  
- O sistema exibe mensagem de sucesso após exclusão.

### Regras de negócio
- O modelo só pode ser excluído se não estiver vinculado a documentos gerados.

### Análise de Risco
Valor: 3 - Urgência: 3 - Risco: 2 - Esforço: 2 - Dependência: 3 - Prioridade: 13

### Protótipo relacionado a US

<img width="653" height="423" alt="image" src="https://github.com/user-attachments/assets/f86d724b-5121-47d3-b280-3696e4d6e2df" />

### Épico vinculado
Épico 1.1: Criação e Manipulação de Modelos de Documentos

## US05 - Visualizar modelos de documentos

### História de usuário
Como advogado, quero visualizar os modelos de documentos cadastrados, para escolher qual utilizar ou editar.

### Critérios de aceitação
- O advogado consegue acessar a tela com a listagem de modelos.  
- Os modelos são exibidos com nome, data de criação e opções de ação.  
- A lista é paginada e permite busca por nome.

### Análise de Risco
Valor: 4 - Urgência: 3 - Risco: 1 - Esforço: 1 - Dependência: 3 - Prioridade: 12

### Protótipo relacionado a US

<img width="838" height="539" alt="image" src="https://github.com/user-attachments/assets/778d8118-4372-44b7-825d-923dc3bf0369" />

### Épico vinculado
Épico 1.1: Criação e Manipulação de Modelos de Documentos

## US06 - Cadastrar clientes

### História de usuário
Como advogado, quero cadastrar novos clientes, para gerenciar suas informações jurídicas no sistema.

### Critérios de aceitação
- O advogado consegue acessar a tela de cadastro de cliente.  
- Os campos obrigatórios são validados antes do envio (nome, e-mail, CPF).  
- O sistema confirma o cadastro com mensagem de sucesso.

### Regras de negócio
- O CPF e e-mail devem ser únicos e validados com formatos corretos.  
- O cadastro é vinculado ao advogado autenticado.

### Análise de Risco
Valor: 4 - Urgência: 4 - Risco: 2 - Esforço: 2 - Dependência: 4 - Prioridade: 16

### Épico vinculado
Épico 2.1: Cadastro e Atualização de Clientes

## US08 - Excluir registros de clientes

### História de usuário
Como advogado, quero excluir registros de clientes, para manter meu cadastro limpo e atualizado.

### Critérios de aceitação
- O advogado consegue acessar a lista de clientes e selecionar um para exclusão.  
- O sistema solicita confirmação da ação.  
- O cliente é removido da base de dados e o sistema exibe uma mensagem de sucesso.

### Regras de negócio
- O sistema deve impedir a exclusão de clientes vinculados a processos ou documentos, salvo se previamente desvinculados.

### Análise de Risco
Valor: 3 - Urgência: 3 - Risco: 2 - Esforço: 2 - Dependência: 3 - Prioridade: 13

### Protótipo relacionado a US

<img width="894" height="576" alt="image" src="https://github.com/user-attachments/assets/017894c0-f3cc-485e-990d-37316e927cf6" />

### Épico vinculado
Épico 2.1: Cadastro e Atualização de Clientes

## US10 - Gerar docx de documentos

### História de usuário
Como advogado, quero exportar documentos como arquivos `.docx`, para usá-los fora do sistema.

### Critérios de aceitação
- O sistema permite gerar um `.docx` tanto a partir de um modelo quanto de um documento gerado.  
- O conteúdo no arquivo gerado corresponde ao que foi preenchido no sistema.

### Regras de negócio
- O sistema deve validar se todos os campos foram preenchidos antes da exportação.  
- O arquivo deve estar disponível para download imediato.

### Análise de Risco
Valor: 4 - Urgência: 4 - Risco: 2 - Esforço: 2 - Dependência: 4 - Prioridade: 16

### Protótipo relacionado a US

<img width="1001" height="647" alt="image" src="https://github.com/user-attachments/assets/ce432b69-993c-457d-b946-7912d00cfd36" />

### Épico vinculado
Épico 1.2: Geração de Documentos Jurídicos

## US14 - Notificar movimentações de processos

### História de usuário
Como advogado, quero ser notificado por e-mail sobre movimentações em meus processos, para acompanhar atualizações em tempo real.

### Critérios de aceitação
- O sistema envia e-mails ao detectar novas movimentações em processos vinculados à OAB do advogado.  
- O conteúdo do e-mail inclui resumo da movimentação e link para visualização detalhada.

### Regras de negócio
- O envio de notificações só ocorre para processos vinculados ao usuário autenticado.  
- O sistema deve registrar a data e hora da notificação.

### Análise de Risco
Valor: 5 - Urgência: 5 - Risco: 3 - Esforço: 3 - Dependência: 5 - Prioridade: 21

### Protótipo relacionado a US

<img width="1001" height="1378" alt="image" src="https://github.com/user-attachments/assets/6657a20f-eb94-4a8d-ad9a-58391d54a6ac" />

### Épico vinculado
Épico 3.1: Vinculação e Notificação de Movimentações

## US24 - Realizar login

### História de usuário
Como usuário, quero realizar login no sistema, para acessar as funcionalidades disponíveis conforme meu perfil.

### Critérios de aceitação
- O usuário consegue acessar a tela de login do sistema.  
- Após fornecer credenciais válidas, o acesso ao sistema é liberado.  
- Em caso de falha, o sistema exibe mensagens de erro informativas.

### Regras de negócio
- O login exige e-mail e senha válidos previamente cadastrados.  
- A senha deve ser verificada com hash seguro.

### Análise de Risco
Valor: 5 - Urgência: 5 - Risco: 2 - Esforço: 2 - Dependência: 5 - Prioridade: 19

### Protótipo relacionado a US

<img width="595" height="387" alt="image" src="https://github.com/user-attachments/assets/022dbea6-2229-4110-add0-8b2b3729528c" />

### Épico vinculado
Épico 5.1: Cadastro e Acesso ao Sistema

## US26 - Editar dados do perfil

### História de usuário
Como usuário, quero editar meus dados de perfil, para manter minhas informações atualizadas.

### Critérios de aceitação
- O sistema permite editar nome, telefone, e-mail e OAB.  
- As alterações são validadas e salvas corretamente.  
- O sistema exibe mensagem de sucesso ou erro após tentativa de edição.

### Regras de negócio
- Os campos devem ser validados conforme formato (e-mail, OAB).  
- O e-mail não pode ser duplicado no sistema.

### Análise de Risco
Valor: 3 - Urgência: 3 - Risco: 1 - Esforço: 1 - Dependência: 3 - Prioridade: 11

### Protótipo relacionado a US

<img width="702" height="449" alt="image" src="https://github.com/user-attachments/assets/ee3136cf-5ddf-41c8-9b92-f57e1177145e" />

### Épico vinculado
Épico 5.2: Gestão do Perfil de Usuário

## US28 - Alterar senha

### História de usuário
Como usuário, quero alterar minha senha, para garantir a segurança do meu acesso ao sistema.

### Critérios de aceitação
- O usuário consegue acessar a opção de alterar senha via perfil ou menu de configurações.  
- O sistema exige senha atual e confirmação da nova senha.  
- Em caso de sucesso ou falha, o sistema exibe mensagens adequadas.

### Regras de negócio
- A nova senha deve atender aos critérios mínimos de segurança (tamanho, caracteres especiais etc.).  
- A senha atual deve ser validada antes da alteração.

### Análise de Risco
Valor: 4 - Urgência: 4 - Risco: 2 - Esforço: 2 - Dependência: 4 - Prioridade: 16

### Protótipo relacionado a US

<img width="1905" height="919" alt="image" src="https://github.com/user-attachments/assets/8ce6c1ed-b1cd-4c66-9ec3-4b955ba307e2" />

### Épico vinculado
Épico 5.2: Gestão do Perfil de Usuário

## US29 - Encerrar sessão (logout)

### História de usuário
Como usuário, quero encerrar minha sessão com segurança, para proteger meus dados.

### Critérios de aceitação
- O sistema possui botão de logout visível e funcional.  
- Após logout, o usuário é redirecionado à tela de login.  
- O token de autenticação é invalidado.

### Análise de Risco
Valor: 4 - Urgência: 4 - Risco: 1 - Esforço: 1 - Dependência: 3 - Prioridade: 13

### Protótipo relacionado a US

<img width="1893" height="913" alt="image" src="https://github.com/user-attachments/assets/4560891c-ceb0-4b9d-a8c8-0c9d47044574" />

### Épico vinculado
Épico 5.1: Cadastro e Acesso ao Sistema
