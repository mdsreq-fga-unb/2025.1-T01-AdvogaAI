# ConnectCare

## Especificação de Caso de Uso: Agendar exames e consultas

## Índice

1. [Breve descrição](#1-breve-descrição)  
2. [Fluxo básico de eventos](#2-fluxo-básico-de-eventos)  
3. [Fluxos alternativos](#3-fluxos-alternativos)  
4. [Fluxos de exceção](#4-fluxos-de-exceção)  
5. [Pré-condições](#5-pré-condições)  
6. [Pós-condições](#6-pós-condições)  
7. [Pontos de extensão](#7-pontos-de-extensão)  
8. [Requisitos especiais](#8-requisitos-especiais)  
9. [Informações adicionais](#9-Informações-adicionais)  

## 1. Breve descrição

Este caso de uso permite ao paciente agendar exames e consultas médicas por meio da plataforma ConnectCare, acessando a disponibilidade de profissionais e unidades de saúde. O caso também contempla o ponto de extensão “Gerar avisos de lembrete”, responsável por enviar notificações automáticas para lembrar o paciente sobre compromissos futuros.

## 2. Fluxo básico de eventos

1. O paciente acessa a plataforma com autenticação válida (FA1, FE1).  
2. O sistema exibe a tela de agendamento.  
3. O paciente escolhe se deseja agendar uma consulta ou um exame.  
4. O sistema solicita as seguintes informações obrigatórias:  
   - Tipo de atendimento (consulta ou exame);  
   - Especialidade médica ou tipo de exame;  
   - Nome completo do paciente (pré-preenchido);  
   - Unidade de saúde desejada (com sugestão por proximidade);  
   - Preferência de datas e horários disponíveis;  
   - Se deseja atendimento presencial ou remoto.  
5. O paciente preenche o formulário com as informações solicitadas.  
6. O sistema valida os dados preenchidos, incluindo:  
   - Verificação de duplicidade (evitar múltiplos agendamentos simultâneos);  
   - Checagem de conflitos de horário;  
   - Consistência de dados (ex.: exames requerem prescrição).  
7. O sistema apresenta as opções de datas e horários disponíveis, ordenadas por conveniência (localização, tempo de espera, tipo de serviço).  
8. O paciente seleciona uma das opções.  
9. O sistema confirma o agendamento e exibe os detalhes do atendimento: local, data, horário, documentos exigidos.  
10. O sistema ativa o ponto de extensão “Gerar avisos de lembrete” (PE1).  
11. O caso de uso se encerra.

## 3. Fluxos alternativos

### 3.1 Autenticação

#### 3.1.1 FA1 – Usuário não autenticado  
Ponto de inserção: Passo 1 do fluxo básico.  
O paciente não está autenticado.  
O sistema redireciona para a tela de login.  
Após login bem-sucedido, o fluxo principal é retomado no passo 2.

### 3.2 Tipo de agendamento

#### 3.2.1 FA2 – Agendamento por recomendação  
Ponto de inserção: Passo 3 do fluxo básico.  
O paciente opta por seguir recomendações do sistema baseadas em atendimentos anteriores.  
O sistema sugere especialidades, horários e locais preferidos com base no histórico de uso.  
O paciente aceita ou personaliza as sugestões.  
O fluxo retorna ao passo 5 do fluxo básico.

## 4. Fluxos de exceção

### 4.1 FE1 – Autenticação inválida  
Ponto de inserção: Passo 1 do fluxo básico.  
O paciente insere credenciais incorretas.  
O sistema exibe mensagem de erro: "Usuário ou senha inválidos".  
São permitidas até 3 tentativas.  
Após 3 falhas, o acesso é bloqueado por 15 minutos.

### 4.2 FE2 – Dados inválidos no formulário  
Ponto de inserção: Passo 5 do fluxo básico.  
O paciente omite campos obrigatórios ou insere dados inconsistentes.  
O sistema sinaliza os campos com erro e impede a continuidade.  
O paciente deve corrigir os dados para prosseguir.

### 4.3 FE3 – Sem disponibilidade de horário  
Ponto de inserção: Passo 7 do fluxo básico.  
O sistema não encontra disponibilidade para os critérios definidos.  
O sistema sugere datas alternativas ou outras unidades.  
Se não houver aceitação do paciente, o caso de uso é encerrado sem agendamento.

## 5. Pré-condições

5.1 O paciente deve estar cadastrado e autenticado no sistema.  
5.2 O paciente deve possuir acesso a um dispositivo conectado à internet.

## 6. Pós-condições

6.1 O agendamento será registrado na agenda do sistema e vinculado ao perfil do paciente.  
6.2 O paciente estará apto a receber lembretes via aplicativo, SMS ou e-mail.

## 7. Pontos de extensão

### 7.1 Gerar avisos de lembrete  
Ponto de ativação: Passo 10 do fluxo básico.  
Condição: Agendamento confirmado com sucesso.  
Comportamento: O sistema registra notificações para envio programado antes do atendimento (ex.: 24h e 1h antes), conforme as configurações do perfil do paciente.

## 8. Requisitos especiais

8.1 Integração com sistemas de envio de notificações (push, SMS, e-mail).  
8.2 Armazenamento criptografado de dados de agendamento e histórico de atendimento.  
8.3 Compatibilidade com modo offline parcial para leitura de histórico local.

## 9. Informações adicionais

Os dados de agendamento alimentam o histórico clínico do paciente.  
O agendamento pode ser cancelado até 1 hora antes do horário marcado.  
As notificações de lembrete são personalizáveis pelo paciente nas configurações da conta.  
Possibilidade de sincronização com calendários externos (Google, Outlook, etc.).
