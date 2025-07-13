# ConnectCare

# Especificação de Caso de Uso: Receber notificações

# Índice

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

Este caso de uso descreve o processo pelo qual o paciente recebe notificações no aplicativo ConnectCare. As notificações incluem lembretes de consultas agendadas, alertas de campanhas de saúde, orientações médicas pós-consulta e avisos importantes relacionados ao histórico de saúde do paciente. O objetivo é garantir que os pacientes estejam informados de forma oportuna e personalizada para apoiar sua jornada de cuidado.

## 2. Fluxo básico de eventos

1. O sistema identifica eventos associados ao perfil do paciente, como agendamento confirmado, proximidade de campanha de saúde, prescrição recente ou retorno necessário (FA1, FE1).
2. O sistema valida os dados de perfil do paciente: nome, CPF, localização (bairro/região), faixa etária, histórico de saúde, preferências de notificação e se o número de celular ou e-mail estão verificados (FE2).
3. O sistema seleciona os eventos relevantes e verifica os canais de notificação disponíveis para o paciente (push, SMS, e-mail).
4. Para notificações de lembrete de consulta, o sistema envia aviso com antecedência mínima de 24 horas contendo: nome do estabelecimento, data, hora, endereço, itens obrigatórios (documento de identidade, uso de máscara), mapa de localização e link para reagendamento (FA2).
5. Para campanhas de saúde, o sistema filtra os pacientes-alvo com base nos critérios definidos: localização, faixa etária, perfil clínico e histórico de participação anterior. As mensagens incluem data, horário, local e orientações específicas.
6. Para orientações médicas pós-consulta, o sistema acessa o prontuário do paciente e envia resumo das orientações registradas pelo profissional de saúde.
7. Todas as notificações são registradas em log, com carimbo de data e hora e status (enviada, lida, não entregue).
8. O paciente visualiza a notificação e pode interagir com ela (confirmar presença, reagendar, ocultar ou marcar como lida).
9. O sistema atualiza o histórico de notificações do paciente e coleta feedback opcional.

## 3. Fluxos alternativos

### FA1 – Evento não relacionado ao perfil do paciente

1. No passo 1 do fluxo básico, se o evento não se aplicar às condições demográficas ou clínicas do paciente, o sistema não gera notificação e termina o caso de uso.

### FA2 – Reagendamento solicitado diretamente via notificação

1. No passo 4 do fluxo básico, o paciente clica no link de reagendamento.
2. O sistema redireciona para o caso de uso “Agendar exames e consultas”, preenchendo os dados do agendamento original como sugestão.

## 4. Fluxos de exceção

### FE1 – Falha na identificação do evento ou inconsistência de dados

1. No passo 1 do fluxo básico, se houver falha na leitura de eventos ou inconsistência nos dados do perfil, o sistema registra o erro e emite alerta para o administrador do sistema. Nenhuma notificação é enviada.

### FE2 – Canais de notificação inválidos ou desatualizados

1. No passo 2 do fluxo básico, se o número de celular estiver incorreto ou o e-mail estiver inativo, o sistema solicita atualização de dados na próxima interação do paciente com a plataforma.
2. Nenhuma notificação é enviada até a correção dos dados.

## 5. Pré-condições

1. O paciente está cadastrado no ConnectCare.
2. O paciente possui pelo menos um canal de notificação ativo e verificado (e-mail, número de celular ou aplicativo).
3. Há eventos de saúde ativos associados ao paciente (consultas, campanhas, orientações pós-consulta).

## 6. Pós-condições

1. As notificações foram entregues, visualizadas e, quando aplicável, geraram ações (confirmação de presença, reagendamento, feedback).
2. O log de notificações foi atualizado corretamente no sistema.

## 7. Pontos de extensão

1. Enviar feedback de notificação: ativado ao final do passo 8 do fluxo básico.
2. Avaliar experiência do usuário: ativado quando o paciente interage com notificações em campanhas públicas.

## 8. Requisitos especiais

1. As notificações devem ser entregues com confirmação de recebimento quando possível (push com ACK, e-mail com tracking, SMS com status de entrega).
2. O sistema deve operar com fallback entre canais (ex: se push falhar, enviar SMS).
3. As mensagens devem estar em linguagem acessível, com legibilidade mínima garantida segundo diretrizes de comunicação em saúde.
4. Os dados sensíveis não podem ser enviados por canais inseguros sem criptografia.
5. As notificações devem estar conformes com a LGPD, com base em consentimento do usuário.

## 9. Informações adicionais

1. O envio de notificações é baseado em regras temporais (tempo desde agendamento, proximidade de campanhas, janela de retorno clínico).
2. As notificações fazem parte do módulo de engajamento ativo da plataforma e podem ser geridas por perfis administrativos autorizados.
3. O sistema oferece um painel de monitoramento para análise de taxa de abertura e resposta às notificações.
