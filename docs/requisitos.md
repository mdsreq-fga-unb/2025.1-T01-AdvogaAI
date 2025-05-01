| Data       | Versão | Descrição                          | Autor                    |
|------------|--------|------------------------------------|--------------------------|
| 01/05/2025 | **1.0** | Preenchimento da sessão de Requisitos da integração com a API PJe | Yan Guimarães   |

# Requisitos Funcionais e Não Funcionais sobre a integração com a API PJe

## Requisitos Funcionais

### Requisitos de Usuário

1. O usuário deve conseguir buscar todos os processos vinculados ao advogado           (`GET /processos`).
2. O usuário deve conseguir buscar por um processo específico utilizando o numero do processo (`GET /processos/{id}`).
3. O usuário deve conseguir lista todos os documentos vinculados a um processo específico (`GET /processos/{id}/documentos`).
4. O usuário deve receber notificações quando houver nova movimentação em qualquer processo que ele acompanha.

### Requisitos de Sistema

1. O sistema deve autenticar-se na API do PJe (via OAuth2) antes de efetuar chamadas.
2. Deve validar e renovar automaticamente o token/API key ao se aproximar do prazo de expiração.

---

## Requisitos Não-Funcionais

1. **Performance e Escalabilidade**
    - Cada chamada à API externa deve responder em ≤ 2 s.
    - Suportar monitoramento de até 500 processos simultâneos sem degradação relevante.
2. **Confiabilidade e Disponibilidade**
    - Retorno automático em falhas de comunicação (até 3 tentativas).
    - Retomar polling após interrupções sem perda de dados.
3. **Segurança**
    - Uso obrigatório de HTTPS.
    - Credenciais armazenadas criptografadas.
    - Logging das chamadas com masking de dados sensíveis.
4. **Manutenibilidade**
    - Arquitetura em camadas para facilitar atualização de versão da API.
    - Testes automatizados com cobertura ≥ 80 % no módulo de integração.
5. **Usabilidade**
    - Erros traduzidos para o usuário em Português, incluindo código e mensagem da API.
    - Área de configuração para endpoint e credenciais sem necessidade de deploy.
6. **Compatibilidade e Padrões**
    - Seguir padrões RESTful do PJe (URLs, plurais, versionamento, verbos HTTP e customizados).
    - Suportar `application/json`.