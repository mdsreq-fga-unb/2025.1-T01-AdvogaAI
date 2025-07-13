# ConnectCare

## Especificação de Caso de Uso: Garantir conformidade dos dados

## Índice

1. [Breve descrição](#1-breve-descrição)  
2. [Fluxo básico de eventos](#2-fluxo-básico-de-eventos)  
3. [Fluxos alternativos](#3-fluxos-alternativos)  
   - [3.1 Autenticação](#31-autenticação)  
     - [3.1.1 FA1 – Tentativa de login com autenticação de dois fatores](#311-fa1--tentativa-de-login-com-autenticação-de-dois-fatores)  
   - [3.2 Correção de dados](#32-correção-de-dados)  
     - [3.2.1 FA2 – Correção manual de registros inconsistentes](#321-fa2--correção-manual-de-registros-inconsistentes)  
4. [Fluxos de exceção](#4-fluxos-de-exceção)  
   - [4.1 FE1 – Falha de autenticação](#41-fe1--falha-de-autenticação)  
   - [4.2 FE2 – Erro durante execução da auditoria](#42-fe2--erro-durante-execução-da-auditoria)  
5. [Pré-condições](#5-pré-condições)  
6. [Pós-condições](#6-pós-condições)  
7. [Pontos de extensão](#7-pontos-de-extensão)  
8. [Requisitos especiais](#8-requisitos-especiais)  
9. [Informações adicionais](#9-informações-adicionais)

## 1. Breve descrição

Este caso de uso descreve as atividades realizadas pelo administrador do sistema para garantir que os dados armazenados e processados na plataforma "ConnectCare" estejam em conformidade com normas legais, regulatórias e de boas práticas de segurança, qualidade e interoperabilidade. Isso inclui a verificação da integridade de registros, a adequação às normas da LGPD, e a correção de dados inconsistentes, redundantes ou ausentes.

## 2. Fluxo básico de eventos

1. O administrador acessa o sistema utilizando credenciais válidas (FA1, FE1).  
2. O sistema exibe o painel de administração com opção de verificação de conformidade.  
3. O administrador seleciona “Auditar dados” no menu de conformidade.  
4. O sistema executa rotinas automáticas de auditoria, que verificam:  
   - Presença de dados obrigatórios (nome, CPF, data de nascimento, etc.);  
   - Validação de formatos (e.g., e-mail com regex, CPF com dígito verificador);  
   - Checagem de duplicidades (ex.: múltiplos registros com mesmo CPF);  
   - Conformidade com LGPD (dados sensíveis sem consentimento explícito);  
   - Prontuários com campos inconsistentes ou em branco.  
5. O sistema gera um relatório de conformidade com indicadores de erro por tipo.  
6. O administrador acessa o relatório e analisa as inconsistências encontradas.  
7. O administrador pode:  
   - Corrigir manualmente os dados (FA2);  
   - Exportar os dados para revisão em lote;  
   - Notificar responsáveis por registros incompletos.  
8. O sistema salva o histórico da auditoria para rastreabilidade.  
9. O sistema confirma que os dados foram validados e marca como “conforme” os registros corrigidos.  
10. O administrador encerra a sessão de auditoria.  

## 3. Fluxos alternativos

### 3.1 Autenticação

#### 3.1.1 FA1 – Tentativa de login com autenticação de dois fatores

- O fluxo alternativo inicia no passo 1 do fluxo básico.  
- Após o login, se a autenticação em dois fatores estiver habilitada, o sistema solicita um código adicional via e-mail ou app autenticador.  
- O administrador insere o código corretamente.  
- O fluxo retorna ao passo 2 do fluxo básico.

### 3.2 Correção de dados

#### 3.2.1 FA2 – Correção manual de registros inconsistentes

- O fluxo alternativo inicia no passo 7 do fluxo básico.  
- O administrador clica em um dos erros listados no relatório.  
- O sistema abre o formulário com os dados problemáticos em destaque.  
- O administrador edita os campos indicados e salva.  
- O sistema revalida os dados daquele registro.  
- Se estiver conforme, marca como "corrigido".  
- O fluxo retorna ao passo 8 do fluxo básico.

## 4. Fluxos de exceção

### 4.1 FE1 – Falha de autenticação

- Este fluxo ocorre no passo 1 do fluxo básico.  
- Se o administrador inserir credenciais inválidas por três vezes, o sistema bloqueia temporariamente o acesso por 15 minutos.  
- O sistema registra o incidente.  
- O fluxo termina sem prosseguir para o passo 2.

### 4.2 FE2 – Erro durante execução da auditoria

- Ocorre no passo 4 do fluxo básico.  
- Se houver falha técnica (ex.: indisponibilidade do banco de dados), o sistema exibe mensagem de erro e loga o incidente.  
- O administrador pode tentar novamente ou encerrar a auditoria.  
- O fluxo termina sem seguir para o passo 5.

## 5. Pré-condições

5.1 O administrador deve estar devidamente autenticado no sistema com permissão de acesso ao módulo de conformidade.

## 6. Pós-condições

6.1 O sistema terá registros validados e inconsistências resolvidas ou registradas para acompanhamento posterior.

## 7. Pontos de extensão

7.1 Revisão legal periódica dos critérios de conformidade  
- Local no fluxo: passo 4  
- Permite atualização dos critérios de auditoria conforme mudanças na legislação (LGPD, ANPD).

## 8. Requisitos especiais

8.1 Os dados de auditoria devem ser armazenados de forma segura, criptografados e com rastreabilidade completa (timestamp, IP, usuário).  
8.2 O relatório de conformidade deve ser exportável em formatos PDF e CSV.  
8.3 Toda correção de dado sensível deve ser registrada com justificativa e associada ao usuário que realizou a alteração.  
8.4 O tempo máximo de execução da auditoria não deve exceder 10 minutos para uma base de até 100 mil registros.  
8.5 A interface deve seguir os princípios de acessibilidade WCAG 2.1.

## 9. Informações adicionais

- Recomenda-se a utilização de ferramentas automáticas de verificação de integridade e scripts com validações em lote.  
- Diagramas UML (atividade e sequência) devem ser utilizados para complementar o entendimento do processo.  
- Pode-se integrar o módulo com um sistema de alertas internos para notificar usuários sobre pendências nos seus registros.
