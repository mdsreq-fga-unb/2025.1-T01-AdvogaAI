# BDD: Histórias de Usuário e Cenários de Comportamento para o HelthNet
Este documento detalha os Critérios de Aceitação para cada História de Usuário (US) de forma individual, com cenários de BDD específicos para garantir que cada funcionalidade se comporte exatamente como esperado.

---

## Funcionalidade 1: Centralizar e automatizar gerenciamento de agendamento de consultas

### História: US1 - Gerenciar Agendamentos de Pacientes
Como um Coordenador de Agendamento, eu quero gerenciar os agendamentos dos pacientes de forma centralizada, para facilitar ajustes e garantir uma visão clara da agenda da clínica.

- **CENÁRIO 1.1: Coordenador cria um novo agendamento com sucesso**
Dado que o Coordenador "Rafael" está na tela de agendamentos do "Dr. João".
E o horário de terça-feira às 10:00 está disponível.
Quando Rafael seleciona este horário e o atribui à paciente "Sra. Clara".
Então a consulta deve ser criada e aparecer como "Ocupado" na agenda do "Dr. João".

- **CENÁRIO 1.2: Coordenador cancela um agendamento existente**
Dado que existe uma consulta agendada para a "Sra. Clara" com o "Dr. João" na terça-feira às 10:00.
Quando Rafael seleciona essa consulta e aciona a opção "Cancelar".
Então a consulta deve ser removida da agenda.
E o horário de terça-feira às 10:00 deve voltar a aparecer como "Disponível".

### História: US11 - Visualizar Disponibilidade Médica
Como Coordenador de Agendamento, quero visualizar a clara disponibilidade dos médicos, para otimizar a agenda dos médicos e evitar conflitos.

- **CENÁRIO 11.1: Visualização de agenda com horários vagos e ocupados**
Dado que o Coordenador "Rafael" quer verificar a agenda do "Dr. João".
Quando ele abre a visualização semanal da agenda do "Dr. João".
Então ele deve ver claramente os blocos de horário marcados como "Disponível", "Ocupado" ou "Bloqueado".

- **CENÁRIO 11.2: Visualização de agenda totalmente ocupada**
Dado que o "Dr. João" não tem mais horários para a próxima quarta-feira.
Quando o Coordenador "Rafael" visualiza a agenda do "Dr. João" para este dia.
Então todos os horários de trabalho devem aparecer como "Ocupado".

### História: US12 - Ajustar Agendamentos Centralizados
Como Coordenador de Agendamento, quero ter facilidade para fazer ajustes nos agendamentos, para evitar conflitos e otimizar a agenda dos médicos.

- **CENÁRIO 12.1: Coordenador remarca uma consulta para um horário vago**
Dado que a "Sra. Clara" tem uma consulta agendada para terça-feira às 10:00 e precisa remarcar.
E o horário de quarta-feira às 11:00 está disponível na agenda do "Dr. João".
Quando o Coordenador "Rafael" arrasta a consulta da Sra. Clara para quarta-feira às 11:00.
Então a consulta deve ser movida com sucesso, liberando o horário original.

- **CENÁRIO 12.2: Tentativa de remarcar para um horário já ocupado**
Dado que a "Sra. Clara" tem uma consulta agendada e precisa remarcar.
E o horário desejado, quarta-feira às 14:00, já está ocupado por outro paciente.
Quando o Coordenador "Rafael" tenta mover a consulta da Sra. Clara para este horário.
Então o sistema deve exibir o erro "Conflito de agenda. Horário indisponível." e a remarcação não deve ser concluída.

### História: US13 - Notificar Pacientes Agendados
Como Coordenador de Agendamento, quero enviar notificações automáticas para pacientes sobre seus agendamentos, para mantê-los informados e reduzir reagendamentos desgastantes.

- **CENÁRIO 13.1: Notificação é enviada após um novo agendamento**
Dado que a "Sra. Clara" não tinha consultas marcadas.
Quando o Coordenador "Rafael" cria uma nova consulta para a "Sra. Clara".
Então uma notificação de "Confirmação de Agendamento" deve ser enviada automaticamente para a "Sra. Clara".

- **CENÁRIO 13.2: Notificação é enviada após uma remarcação**
Dado que a consulta da "Sra. Clara" foi remarcada pelo Coordenador "Rafael".
Quando a remarcação é salva no sistema.
Então uma notificação de "Alteração de Agendamento" com os novos detalhes deve ser enviada para a "Sra. Clara".

### História: US14 - Visualizar Pacientes Agendados por Médico
Como Médico Clínico Geral, quero visualizar os pacientes agendados para mim, para me preparar para as consultas e gerenciar meu tempo eficientemente.

- **CENÁRIO 14.1: Médico visualiza sua lista de pacientes do dia**
Dado que o "Dr. João" está logado no sistema.
Quando ele acessa a sua página de "Agenda do Dia".
Então ele deve ver uma lista cronológica dos pacientes agendados para hoje, com nome e horário.

- **CENÁRIO 14.2: Médico visualiza um dia sem agendamentos**
Dado que o "Dr. João" não tem consultas marcadas para o próximo sábado.
Quando ele navega para a agenda de sábado.
Então o sistema deve exibir a mensagem "Nenhum paciente agendado para esta data."

---

## Funcionalidade 2: Centralizar o acesso ao registro dos pacientes

### História: US2 - Selecionar Médico para Agendamento
Como uma Paciente, eu quero selecionar o médico de minha preferência ao agendar uma consulta online, para ter mais controle sobre meus atendimentos e garantir continuidade no tratamento.

- **CENÁRIO 2.1: Paciente encontra e seleciona seu médico de preferência**
Dado que a "Sra. Clara" está na tela de agendamento online.
Quando ela utiliza o filtro de busca e digita "Dr. João".
Então o perfil do "Dr. João" e sua agenda de horários disponíveis devem ser exibidos para seleção.

- **CENÁRIO 2.2: Médico de preferência não está disponível**
Dado que a "Sra. Clara" selecionou o "Dr. João", seu médico de preferência.
E o Dr. João não possui horários disponíveis na data pesquisada.
Quando a agenda do Dr. João é carregada.
Então o sistema deve mostrar "Nenhum horário disponível" e sugerir "Ver próxima data" ou "Escolher outro médico".

### História: US15 - Visualizar Detalhes do Agendamento (Paciente)
Como Paciente, quero visualizar informações sobre meu agendamento, como local e médico, para ter todas as informações necessárias para minhas consultas.

- **CENÁRIO 15.1: Paciente visualiza detalhes de uma consulta futura**
Dado que a "Sra. Clara" está logada no portal do paciente.
Quando ela clica na sua próxima consulta na seção "Meus Agendamentos".
Então ela deve ver todos os detalhes: Médico ("Dr. João"), Data, Hora, Endereço da clínica e Preparo (se houver).

### História: US18 - Agendar Consultas Online (Paciente)
Como paciente, quero agendar minhas consultas online, selecionando o médico e o horário, para ter autonomia e conveniência no processo.

- **CENÁRIO 18.1: Paciente agenda uma consulta com sucesso**
Dado que a "Sra. Clara" selecionou o "Dr. João" e um horário disponível, terça-feira às 15:00.
Quando ela clica no botão "Confirmar Agendamento".
Então a consulta deve ser criada em seu nome.
E ela deve ser redirecionada para uma página de sucesso com a confirmação do agendamento.

- **CENÁRIO 18.2: Horário é ocupado durante a tentativa de agendamento**
Dado que a "Sra. Clara" está prestes a confirmar um horário.
E outro usuário agenda no mesmo horário um segundo antes.
Quando a "Sra. Clara" clica em "Confirmar Agendamento".
Então o sistema deve exibir a mensagem "Este horário não está mais disponível. Por favor, selecione outro." e a consulta não deve ser criada.

---

## Funcionalidade 3: Notificações ao Paciente

### História: US3 - Receber Lembretes de Consulta
Como um paciente, quero receber notificações automáticas e lembretes de consulta, para que não me esqueça dos compromissos.

- **CENÁRIO 3.1: Paciente recebe lembrete de consulta por SMS**
Dado que a "Sra. Clara" tem uma consulta agendada para amanhã.
E seu perfil está configurado para receber lembretes por SMS.
Quando o sistema dispara os lembretes automáticos de 24 horas.
Então um SMS com os detalhes da consulta deve ser enviado para o celular cadastrado da "Sra. Clara".

### História: US16 - Receber Notificações de Medicação
Como paciente, quero receber notificações sobre minhas medicações, incluindo horários e dosagens, para aumentar a adesão ao tratamento e evitar erros.

- **CENÁRIO 16.1: Paciente recebe notificação de medicação no horário correto**
Dado que a "Sra. Clara" tem uma prescrição para tomar "Antibiótico X" às 08:00.
E ela ativou os lembretes de medicação no aplicativo.
Quando o relógio marca 08:00.
Então uma notificação push deve aparecer em seu celular com o texto "Hora de tomar seu medicamento: Antibiótico X 500mg".

---

## Funcionalidade 4: Automatizar a inserção dos detalhes das prescrições médicas

### História: US4 - Alertar Interações Medicamentosas (Médico)
Como médico, quero ser alertado sobre possíveis interações medicamentosas ao prescrever, para evitar erros e garantir a segurança do paciente.

- **CENÁRIO 4.1: Sistema alerta sobre interação medicamentosa de alto risco**
Dado que o "Dr. João" está prescrevendo para a "Sra. Clara", que já usa "Varfarina".
Quando o "Dr. João" tenta adicionar "Aspirina" à prescrição.
Então um alerta crítico de interação deve ser exibido, exigindo uma justificativa para prosseguir.

### História: US5 - Inserir Notas e Prescrições
Como médico, quero inserir notas e prescrições de forma eficiente, para otimizar meu tempo e focar mais no atendimento ao paciente.

- **CENÁRIO 5.1: Médico insere notas da consulta**
Dado que o "Dr. João" está no prontuário da "Sra. Clara".
Quando ele digita as observações clínicas no campo "Evolução" e clica em "Salvar".
Então as notas devem ser salvas e associadas à consulta atual.

### História: US6 - Visualizar Atendimentos Anteriores
Como médico, quero visualizar os atendimentos anteriores do paciente, para acompanhar a evolução do caso e oferecer um tratamento contínuo e de qualidade.

- **CENÁRIO 6.1: Médico acessa as notas da última consulta**
Dado que o "Dr. João" está atendendo a "Sra. Clara".
Quando ele clica na aba "Histórico de Consultas".
Então ele deve ver uma lista de atendimentos anteriores e poder ler as notas registradas em cada um.

### História: US17 - Acessar Histórico Médico (Médico)
Como médico, quero acessar o histórico médico completo de um paciente, incluindo consultas anteriores, exames e medicações, para ter uma visão completa do quadro clínico.

- **CENÁRIO 17.1: Médico visualiza o sumário do histórico do paciente**
Dado que o "Dr. João" abriu o prontuário da "Sra. Clara".
Quando ele acessa a seção "Sumário do Paciente".
Então ele deve ver um painel consolidado com alergias registradas, condições crônicas, cirurgias passadas e lista de medicamentos de uso contínuo.

### História: US19 - Acessar Resultados de Exames (Médico)
Como médico, quero acessar os resultados dos exames de um paciente de forma rápida e organizada, para auxiliar no diagnóstico e acompanhamento.

- **CENÁRIO 19.1: Médico abre um resultado de exame em PDF**
Dado que a "Sra. Clara" realizou um exame de sangue recentemente.
Quando o "Dr. João" acessa a aba "Resultados de Exames" e clica no link "Hemograma Completo".
Então o resultado do exame em formato PDF deve ser aberto em uma nova aba ou visualizador.

---

## Funcionalidade 5: Gestão de Farmácia

### História: US7 - Registrar Medicamentos para Dispensação
Como uma Farmacêutica, eu quero registrar manualmente os detalhes das prescrições no sistema da farmácia, para controlar o estoque e preparar os medicamentos para dispensa.

- **CENÁRIO 7.1: Farmacêutica registra uma receita externa**
Dado que a Farmacêutica "Lívia" recebeu uma receita de papel para a "Sra. Clara".
Quando ela utiliza a função "Registrar Receita Externa" e preenche os dados do medicamento, dosagem e médico.
Então uma nova tarefa de dispensação deve ser criada no sistema para a "Sra. Clara".

### História: US8 - Alertar sobre Interações Medicamentosas (Farmacêutica)
Como uma Farmacêutica, eu quero que o sistema notifique automaticamente sobre possíveis interações medicamentosas e alergias, para garantir a segurança do paciente e evitar erros.

- **CENÁRIO 8.1: Sistema alerta farmacêutica sobre alergia do paciente**
Dado que uma prescrição de "Dipirona" para a "Sra. Clara" está na fila de dispensação.
E o perfil da "Sra. Clara" tem um registro de alergia a "Dipirona".
Quando a Farmacêutica "Lívia" abre esta prescrição para prepará-la.
Então um alerta vermelho e sonoro deve ser ativado, informando sobre a alergia.

### História: US9 - Dispensar Medicamentos de Forma Segura
Como uma Farmacêutica, eu quero um sistema que torne a dispensa de medicamentos um processo à prova de erros, para ter certeza de que o paciente receba a medicação correta e evitar complicações.

- **CENÁRIO 9.1: Sistema valida medicamento via código de barras**
Dado que "Lívia" está dispensando "Paracetamol 750mg" para a "Sra. Clara".
Quando ela escaneia o código de barras da caixa do medicamento.
Então o sistema deve comparar com a prescrição e exibir uma confirmação verde se estiver correto, ou um erro vermelho se for o medicamento/dosagem errada.

### História: US10 - Consultar Detalhes de Medicamentos
Como uma Farmacêutica (Lívia), eu quero visualizar informações detalhadas sobre cada medicamento no sistema, para ter todas as informações necessárias no momento da dispensa e para verificar interações medicamentosas.

- **CENÁRIO 10.1: Farmacêutica busca informações sobre um medicamento**
Dado que "Lívia" precisa de informações sobre o medicamento "Losartana".
Quando ela digita "Losartana" na barra de busca da base de medicamentos.
Então o sistema deve retornar uma ficha completa com suas dosagens, indicações, contraindicações e principais interações.