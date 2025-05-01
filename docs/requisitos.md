| Data       | Versão | Descrição                          | Autor                    |
|------------|--------|------------------------------------|--------------------------|
| 01/05/2025 | **1.0** | Preenchimento da sessão de Requisitos da integração com a API PJe | Yan Guimarães   |
| 01/05/2025 | **1.1** | Revisão de algumas notações | Nathan Batista Santos   |

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
