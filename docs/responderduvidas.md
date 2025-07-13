# ConnectCare

## Especificação de Caso de Uso: Responder dúvidas


## Índice

1. [Breve descrição](#1-breve-descrição)  
2. [Fluxo básico de eventos](#2-fluxo-básico-de-eventos)  
3. [Fluxos alternativos](#3-fluxos-alternativos)  
4. [Fluxos de exceção](#4-fluxos-de-exceção)  
5. [Pré-condições](#5-pré-condições)  
6. [Pós-condições](#6-pós-condições)  
7. [Pontos de extensão](#7-pontos-de-extensão)  
8. [Requisitos especiais](#8-requisitos-especiais)  
9. [Informações adicionais](#9-informações-adicionais)

## 1. Breve descrição

Este caso de uso descreve como o administrador do sistema responde dúvidas enviadas pelos usuários por meio do canal de comunicação interno da plataforma *ConnectCare*. O objetivo é garantir que dúvidas operacionais e técnicas sejam esclarecidas de forma rápida, confiável e segura, promovendo a confiança e usabilidade da aplicação.

## 2. Fluxo básico de eventos

1. O usuário acessa o menu de ajuda na plataforma e seleciona a opção "Enviar dúvida".  
2. O sistema apresenta um formulário para envio da dúvida, contendo os campos obrigatórios:  
   - Categoria da dúvida (ex.: funcionalidade, agendamento, erro técnico)  
   - Texto da dúvida (mínimo de 20 caracteres)  
   - Canal preferencial de resposta (e-mail, app ou SMS)  
   - Identificação do usuário (ID único do sistema)  
3. O usuário preenche os campos e envia a dúvida (FE1, FA1).  
4. O sistema valida os campos preenchidos e armazena a dúvida no banco de dados.  
5. O administrador do sistema acessa a área de gestão de dúvidas no painel administrativo.  
6. O sistema exibe a lista de dúvidas não respondidas com os seguintes metadados: data/hora, categoria, ID do usuário e prioridade estimada.  
7. O administrador seleciona uma dúvida e analisa o conteúdo.  
8. O administrador elabora a resposta e define o canal de envio.  
9. O sistema envia a resposta ao usuário pelo canal escolhido, registra o evento de envio e marca a dúvida como respondida.  
10. O sistema oferece ao usuário a possibilidade de avaliar a resposta (relevante ou irrelevante).  
11. O caso de uso termina.

## 3. Fluxos alternativos

### FA1 – Reenvio de dúvida por falha de conexão

- Ocorre após o passo 3 do fluxo básico, caso o sistema detecte falha de rede.
- O sistema armazena a dúvida localmente no dispositivo (em cache seguro).
- Após reconexão, o sistema exibe notificação "Você deseja reenviar a dúvida?".
- O usuário confirma o reenvio.
- O sistema realiza o envio (retorna ao passo 4 do fluxo básico).

## 4. Fluxos de exceção

### FE1 – Campos obrigatórios não preenchidos

- Ocorre no passo 3 do fluxo básico.
- O sistema verifica que um ou mais campos obrigatórios não foram preenchidos.
- O sistema exibe mensagem de erro: "Preencha todos os campos obrigatórios para enviar a dúvida."
- O sistema mantém os dados já digitados para correção.
- O usuário retorna ao passo 2 do fluxo básico.

## 5. Pré-condições

1. O usuário deve estar autenticado na plataforma.  
2. O módulo de dúvidas deve estar disponível e habilitado.  
3. O administrador deve possuir permissão ativa para visualizar e responder dúvidas.

## 6. Pós-condições

1. A dúvida foi respondida e registrada como tratada.  
2. O usuário recebeu a resposta pelo canal indicado.  
3. O sistema armazenou o histórico da interação para auditoria futura.

## 7. Pontos de extensão

1. Integração com sistema de *chatbot* para sugestão automática de respostas antes da triagem humana.  
2. Redirecionamento automático para perguntas frequentes (FAQ) com base em palavras-chave detectadas.

## 8. Requisitos especiais

1. O tempo máximo de resposta por parte do administrador não deve exceder 48 horas úteis.  
2. A comunicação deve ser criptografada em trânsito e em repouso, conforme a LGPD.  
3. As dúvidas e respostas devem estar disponíveis no histórico do usuário por no mínimo 12 meses.

## 9. Informações adicionais

Este caso de uso é parte fundamental da estratégia de usabilidade do *ConnectCare*. A gestão eficiente das dúvidas fortalece o vínculo entre a plataforma e os usuários das comunidades atendidas, promovendo maior adesão e confiabilidade. Recomenda-se o uso de métricas como tempo médio de resposta e índice de satisfação com as respostas para aprimorar continuamente esse processo.
