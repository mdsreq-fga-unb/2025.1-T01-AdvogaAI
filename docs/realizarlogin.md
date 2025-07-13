#ConnectCare

## Especificação de Caso de Uso: Realizar login

## Índice

1. [Breve descrição](#1-breve-descrição)  
2. [Fluxo básico de eventos](#2-fluxo-básico-de-eventos)  
3. [Fluxos alternativos](#3-fluxos-alternativos)  
   - [3.1 Autenticação por biometria](#31-autenticação-por-biometria)  
     - [3.1.1 FA1 – Login com biometria facial](#311-fa1--login-com-biometria-facial)  
4. [Fluxos de exceção](#4-fluxos-de-exceção)  
   - [4.1 FE1 – Dados ausentes ou inválidos](#41-fe1--dados-ausentes-ou-inválidos)  
   - [4.2 FE2 – Conta bloqueada após múltiplas tentativas](#42-fe2--conta-bloqueada-após-múltiplas-tentativas)  
5. [Pré-condições](#5-pré-condições)  
6. [Pós-condições](#6-pós-condições)  
7. [Pontos de extensão](#7-pontos-de-extensão)  
8. [Requisitos especiais](#8-requisitos-especiais)  
9. [Informações adicionais](#9-informações-adicionais)

## 1. Breve descrição

Este caso de uso descreve o processo de autenticação de qualquer usuário autorizado (paciente, profissional de saúde, agente comunitário ou administrador) no sistema ConnectCare. O login garante acesso personalizado e seguro aos serviços da plataforma, mediante a validação de credenciais ou biometria.

## 2. Fluxo básico de eventos

1. O usuário acessa a tela inicial do sistema.  
2. O sistema exibe os campos obrigatórios para login: e-mail ou CPF e senha.  
3. O usuário preenche todos os campos obrigatórios:  
   - E-mail válido (regex); ou CPF válido (com verificação de dígitos);  
   - Senha com no mínimo 8 caracteres, contendo letras e números.  
4. O usuário clica no botão “Entrar”.  
5. O sistema valida as credenciais:  
   - Verifica se o usuário existe;  
   - Compara a senha fornecida com o hash armazenado;  
   - Verifica se a conta está ativa. (FE1, FE2)  
6. O sistema registra data, hora e IP do login.  
7. O sistema exibe a tela inicial personalizada conforme o tipo de usuário.  
8. O login é finalizado com sucesso.

## 3. Fluxos alternativos

### 3.1 Autenticação por biometria

#### 3.1.1 FA1 – Login com biometria facial

- O fluxo alternativo inicia no passo 2 do fluxo básico.  
- O usuário seleciona “Entrar com reconhecimento facial”.  
- O sistema ativa a câmera e solicita enquadramento.  
- O sistema compara a imagem capturada com o cadastro biométrico.  
- Se compatível, o usuário é autenticado.  
- O fluxo retorna ao passo 6 do fluxo básico.

## 4. Fluxos de exceção

### 4.1 FE1 – Dados ausentes ou inválidos

- Ocorre no passo 3 ou 5 do fluxo básico.  
- Se algum campo estiver em branco ou com formato inválido (regex, dígitos), o sistema exibe mensagem de erro indicando o campo afetado.  
- O fluxo retorna ao passo 2.

### 4.2 FE2 – Conta bloqueada após múltiplas tentativas

- Ocorre no passo 5 do fluxo básico.  
- Se houver mais de 5 tentativas seguidas com senha inválida, a conta é bloqueada temporariamente por 30 minutos.  
- O sistema exibe mensagem e oferece opção de redefinir senha.  
- O fluxo termina.

## 5. Pré-condições

5.1 O usuário deve ter uma conta previamente cadastrada e ativa no sistema.

## 6. Pós-condições

6.1 O usuário estará autenticado, com sessão iniciada e permissões habilitadas conforme seu perfil.

## 7. Pontos de extensão

7.1 Integração com autenticação em dois fatores (2FA)  
- Local: passo 5 do fluxo básico  
- Permite exigir código adicional enviado por e-mail ou app autenticador.

## 8. Requisitos especiais

8.1 O sistema deve bloquear automaticamente contas com tentativas de login suspeitas.  
8.2 Todas as sessões devem expirar após 15 minutos de inatividade.  
8.3 Dados de login devem ser criptografados em trânsito (HTTPS) e em repouso (hash de senha com bcrypt).  
8.4 O sistema deve ser acessível em redes de baixa velocidade (compatibilidade com conexões 3G).

## 9. Informações adicionais

- Para maior segurança, recomenda-se a implementação de CAPTCHA após múltiplas tentativas.  
- O sistema deverá manter registros de auditoria para logins bem-sucedidos e fracassados, conforme exigências da LGPD.
