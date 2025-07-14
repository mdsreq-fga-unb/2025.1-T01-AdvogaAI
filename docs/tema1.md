# **Tema 1: Documentos jurídicos**

## **Épico 1.1: Criação e manipulação de modelos de documentos**

### US02 - Criar modelos de documentos

#### História de usuário
- Como advogado, quero criar modelos de documentos, para agilizar a produção de documentos recorrentes.

#### Critérios de aceitação
- O sistema deve permitir ao usuário criar um modelo de documento com campos dinâmicos.
- Deve haver opção de salvar e editar o modelo posteriormente.
- O modelo criado deve ser armazenado na base de dados do sistema.

#### Regras de negócio
- O sistema deve identificar as tags no documento e relaciona-las com as tags existentes no banco
- Se nao existir tags que coincidem com o documento, alertar o usuário e pedir input desses dados na geração

#### Análise de Risco
- Valor: 5 - Urgência: 4 - Risco: 2 - Esforço: 2 - Dependência: 4 - Prioridade: 18

#### Protótipo relacionado a US

<img width="858" alt="Image" src="https://github.com/user-attachments/assets/55b3e30c-8589-4924-b650-1e03971b03b6" />


### US03 - Editar modelos de documentos

#### História de usuário
- Como advogado, quero editar modelos de documentos, para mantê-los atualizados conforme as necessidades.

#### Critérios de aceitação
- O advogado consegue navegar e selecionar um modelo de documento para edição.
- O sistema deve permitir abrir um modelo existente e alterá-lo.
- As alterações devem poder ser salvas e refletidas em futuros documentos gerados.

#### Regras de negócio
- O sistema deve validar os campos na edição (campos vazio ou com caracteres invalidos)

#### Análise de Risco
- Valor: 5 - Urgência: 4 - Risco: 2 - Esforço: 2 - Dependência: 4 - Prioridade: 18

#### Protótipo relacionado a US

<img width="2538" height="1300" alt="Image" src="https://github.com/user-attachments/assets/d07b19d3-8e20-4871-bf4b-5b5ad3e47b6e" />

### US04 - Deletar modelos de documentos

#### História de usuário
Como advogado, quero excluir modelos de documentos, para remover conteúdos obsoletos do sistema.

#### Critérios de aceitação
- O advogado consegue selecionar e excluir um modelo de documento.  
- O sistema solicita confirmação da exclusão.  
- O sistema exibe mensagem de sucesso após exclusão.

#### Regras de negócio
- O modelo só pode ser excluído se não estiver vinculado a documentos gerados.

#### Análise de Risco
Valor: 3 - Urgência: 3 - Risco: 2 - Esforço: 2 - Dependência: 3 - Prioridade: 13

#### Protótipo relacionado a US

<img width="653" height="423" alt="image" src="https://github.com/user-attachments/assets/f86d724b-5121-47d3-b280-3696e4d6e2df" />

### US05 - Visualizar modelos de documentos

#### História de usuário
Como advogado, quero visualizar os modelos de documentos cadastrados, para escolher qual utilizar ou editar.

#### Critérios de aceitação
- O advogado consegue acessar a tela com a listagem de modelos.  
- Os modelos são exibidos com nome, data de criação e opções de ação.  
- A lista é paginada e permite busca por nome.

#### Análise de Risco
Valor: 4 - Urgência: 3 - Risco: 1 - Esforço: 1 - Dependência: 3 - Prioridade: 12

#### Protótipo relacionado a US

<img width="838" height="539" alt="image" src="https://github.com/user-attachments/assets/778d8118-4372-44b7-825d-923dc3bf0369" />

## **Épico 1.2: Geração de documentos jurídicos**

### US01 - Preencher documentos jurídicos

#### História de usuário
Como advogado, quero preencher documentos jurídicos com dados dos clientes, para gerar documentos personalizados rapidamente.

#### Critérios de aceitação
- O sistema permite selecionar um modelo e cliente para preenchimento.  
- Os campos dinâmicos são substituídos por dados reais.  
- O advogado pode revisar antes de salvar o documento gerado.

#### Regras de negócio
- Todos os campos obrigatórios do modelo devem ser preenchidos.  
- O sistema deve validar a consistência do documento antes da geração.

#### Análise de Risco
Valor: 5 - Urgência: 5 - Risco: 3 - Esforço: 3 - Dependência: 5 - Prioridade: 21

#### Protótipo relacionado a US

<img width="836" height="540" alt="image" src="https://github.com/user-attachments/assets/f9ec91e7-b711-46ee-b7d6-4f84624b7d84" />

### US10 - Gerar docx de documentos

#### História de usuário
Como advogado, quero exportar documentos como arquivos `.docx`, para usá-los fora do sistema.

#### Critérios de aceitação
- O sistema permite gerar um `.docx` tanto a partir de um modelo quanto de um documento gerado.  
- O conteúdo no arquivo gerado corresponde ao que foi preenchido no sistema.

#### Regras de negócio
- O sistema deve validar se todos os campos foram preenchidos antes da exportação.  
- O arquivo deve estar disponível para download imediato.

#### Análise de Risco
Valor: 4 - Urgência: 4 - Risco: 2 - Esforço: 2 - Dependência: 4 - Prioridade: 16

#### Protótipo relacionado a US

<img width="1001" height="647" alt="image" src="https://github.com/user-attachments/assets/ce432b69-993c-457d-b946-7912d00cfd36" />

### US11 - Visualizar documentos gerados

#### História de usuário
Como advogado, quero visualizar a lista de documentos gerados, para localizar e gerenciar meus arquivos.


#### Critérios de aceitação

- A listagem é paginada e pode ser filtrada por uma pesquisa

#### Protótipo

<img width="2522" height="1312" alt="Image" src="https://github.com/user-attachments/assets/55a324f8-8223-42e0-a066-e34c139ded85" />

### US32 - Excluir documento gerado

#### História de usuário
Como advogado, quero excluir um documento gerado, para remover dados obsoletos do sistema. 

#### Critérios de aceitação

- O documento exlcuido tambem deve ser excluido do minio

#### Protótipo

<img width="2522" height="1312" alt="Image" src="https://github.com/user-attachments/assets/cee7da70-0709-4cca-82fe-5b4c980e074c" />
