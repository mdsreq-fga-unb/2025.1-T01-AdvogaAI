# Requisitos Funcionais e Não Funcionais sobre a Automação de Documentos

## Requisitos Funcionais

1. A plataforma deve permitir a geração automatizada de documentos jurídicos, como contratos, procurações e petições iniciais, a partir de modelos predefinidos, com preenchimento dinâmico de campos com dados previamente cadastrados dos clientes.
2. O sistema deve possibilitar que os usuários cadastrem, editem e excluam modelos personalizados de documentos, utilizando variáveis de preenchimento que se conectem aos dados dos clientes.
3. O preenchimento automático dos documentos deverá ser baseado em informações previamente armazenadas no sistema, associadas aos cadastros de clientes.
4. O sistema deve permitir o cadastro manual de novos clientes, com campos obrigatórios como nome completo, CPF/CNPJ, endereço, telefone, e-mail e outras informações relevantes à elaboração de documentos jurídicos.
5. O usuário deverá ser capaz de editar os dados cadastrais de clientes previamente cadastrados, garantindo a atualização das informações utilizadas nos documentos.
6. O sistema deverá permitir a exclusão de registros de clientes, com confirmação prévia, respeitando a integridade de documentos já gerados anteriormente.
7. A plataforma deve oferecer uma interface para visualização e busca de clientes cadastrados, com filtros por nome, CPF/CNPJ e outros atributos relevantes.
8. O sistema deverá permitir que os documentos gerados sejam exportados nos formatos .pdf.
9. A plataforma deve disponibilizar uma listagem de documentos com suporte a busca por título ou conteúdo, e filtros por cliente, tipo de documento, status e intervalo de datas, permitindo também a ordenação por título, data de criação ou cliente.

## Requisitos Não Funcionais

1. **Segurança e conformidade com a LGPD**
    - A plataforma deve garantir a segurança dos dados dos clientes, em conformidade com a Lei Geral de Proteção de Dados (LGPD), incluindo criptografia e controle de acesso.

2. **Usabilidade e acessibilidade**
    - A interface da plataforma deve ser intuitiva e acessível, permitindo que advogados com diferentes níveis de familiaridade tecnológica possam utilizá-la eficientemente.

3. **Compatibilidade com diferentes dispositivos e navegadores**
    - A plataforma deve ser compatível com os principais navegadores e dispositivos, incluindo desktops, tablets e smartphones, para garantir o acesso remoto e flexível.

4. **Manutenibilidade e atualizações**
    - A plataforma deve ser desenvolvida de forma modular, facilitando a manutenção e a implementação de atualizações e melhorias contínuas.

# Requisitos Funcionais e Não Funcionais sobre a integração com a API PJe

## Requisitos Funcionais

### Requisitos de Usuário

1. O usuário (ADVOGADO) deve conseguir buscar todos os processos vinculados ao seu documento de identificação OAB.
2. O usuário (ADVOGADO) deve conseguir buscar por um processo específico utilizando o número do processo.
3. O usuário (ADVOGADO) deve conseguir listar todos os documentos vinculados a um processo específico.
4. O usuário (ADVOGADO) deve receber notificações via email quando houver nova movimentação em qualquer processo que ele acompanha.

### Requisitos de Sistema

1. O sistema deve autenticar-se na API do PJe (via OAuth2) antes de efetuar chamadas.
2. Deve validar e renovar automaticamente o token/API key ao se aproximar do prazo de expiração.

---

## Requisitos Não-Funcionais

1. **Confiabilidade e Disponibilidade**
    - O sistema deve retornar automaticamente as falhas de comunicação (até 3 tentativas).
    - O sistema deve retomar o polling após interrupções sem perda de dados.
2. **Segurança**
    - O sistema deve utilizar obrigatoriamente o protocolo HTTPS.
    - O sistema deve armazenar as credenciais de forma criptografada.
    - O sistema deve realizar logging das chamadas com mascaramento de dados sensíveis.
3. **Manutenibilidade**
    - O sistema deve adotar uma arquitetura em camadas para facilitar a atualização de versão da API.
    - O sistema deve possuir testes automatizados com cobertura igual ou superior a 80% no módulo de integração.
4. **Usabilidade**
    - O sistema deve traduzir os erros para o usuário em Português, incluindo o código e a mensagem da API.
    - O sistema deve disponibilizar uma área de configuração para endpoint e credenciais sem necessidade de novo deploy.
5. **Compatibilidade e Padrões**
    - O sistema deve seguir os padrões RESTful do PJe (URLs, plurais, versionamento, verbos HTTP e customizados).
    - O sistema deve suportar o formato `application/json`.
