# Product Backlog Building

--

## HealthNet

A "HealthNet", possui diversas clínicas e hospitais distribuídos por vários estados,
dessa forma enfrentando o desafio de não ter uma
estrutura unificada e integrada para a gestão de dados dos pacientes. Portanto desenvolvemos
o PBB para a criação de um sistema unificado, facilitando o acesso a informções completas, agendamento de consulta eficientes. Podendo agilizar e ter mais segurança durante esse processo para o paciente e o profissional de saúde.

### Problemas e Expectativas

Aborda os principais desafios enfrentados pela HealthNet, juntamente com os resultados desejados e as melhorias esperadas da nova solução.

<img width="1109" height="753" alt="Problemas e Expectativas" src="https://github.com/user-attachments/assets/7f4260a7-47bd-4e5f-be20-e3b7ac47d498" />

### Personas

Identifica os usuários do sistema proposto, detalhando seus papéis, atividades e objetivos ou necessidades específicas que o sistema visa atender.

| Persona        | Papel no projeto                                          | Necessidades/Expectativas                                                                                             |
|----------------|------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| Recepcionista        | Responsável por receber e registrar clientes | Espera um sistema ágil, sem travamentos, com histórico unificado e fácil de acessar.                                   |
| Médico cliníco geral    |  Atende pacientes e analisa exames           | Precisa de acesso rápido e completo ao histórico, exames e prescrições dos pacientes.                                  |
| Farmacêutica       | Trabalha na farmácia interna do sistema      | Deseja reduzir trabalho manual e erros, e ter clareza nos pedidos e registros de medicamentos.                         |
| Coordenador de Agendamento         |  Gerencia consultas e exames    | Busca um sistema de agendamento unificado e flexível, com notificações automáticas para pacientes e equipe.            |
| Paciente   |  Usuária regular do sistema de saúde              | Espera visualizar seu histórico médico, agendar consultas e receber notificações claras e pontuais.                    |
| Diretor de Tecnologia  |  Supervisiona a infraestrutura do sistema        | Quer relatórios de desempenho do sistema e busca soluções para aumentar a eficiência.                     |

<img width="720" height="756" alt="Captura de Tela 2025-07-11 às 20 33 17" src="https://github.com/user-attachments/assets/56b1e882-7713-4356-9d04-139d22843c55" />


### Feautures e Product Backlog Item (PBI)

Cada Feauture é ligada a um problema que ela resolve e ao benefício que ela proporciona. Já o PBI
Detalha os itens específicos que precisam ser desenvolvidos, priorizados e entregues como parte do produto. Esses itens são derivados dos problemas identificados, expectativas e funcionalidades.

- Persona Recepcionista

<img width="498" height="682" alt="Captura de Tela 2025-07-11 às 21 01 50" src="https://github.com/user-attachments/assets/eb77c194-d651-4f7f-8494-de2ea64a51fd" />

- Persona Médico cliníco geral

<img width="412" height="596" alt="Captura de Tela 2025-07-11 às 20 58 57" src="https://github.com/user-attachments/assets/453537cb-dfde-4587-869b-de8dbb583a8d" />

- Persona Farmacêutica

<img width="461" height="546" alt="Captura de Tela 2025-07-11 às 21 10 34" src="https://github.com/user-attachments/assets/5d1050f5-3e86-4f22-b7dd-eddf6644f43e" />

- Persona Coordenador de Agendamento 

<img width="464" height="539" alt="Captura de Tela 2025-07-11 às 21 11 34" src="https://github.com/user-attachments/assets/167337f6-cd98-4ede-9435-5bb97ec55103" />

- Persona Paciente 

<img width="460" height="611" alt="Captura de Tela 2025-07-11 às 21 12 38" src="https://github.com/user-attachments/assets/dec27df5-090c-4850-b1db-bf0e49856612" />

- Persona Diretor de Tecnologia

<img width="1120" height="747" alt="Captura de Tela 2025-07-11 às 21 18 49" src="https://github.com/user-attachments/assets/180beecd-959c-4272-b67c-d0d788d2241b" />


<img width="1035" height="617" alt="Captura de Tela 2025-07-11 às 21 16 48" src="https://github.com/user-attachments/assets/a6d60680-3b38-4434-947e-a640b32e4cb2" />

### User Stories - HealthNet

Fórmula aplicada para calcular a prioridade de cada item foi:

```
Prioridade = (Valor de Negócio × 2) + Urgência + Risco - Esforço + Dependência
```

| ID   | Nome                                              | Declaração da User Story                                                                                                          | Valor | Urgência | Risco | Esforço | Dependência | Prioridade |
|------|---------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|-------|----------|-------|---------|-------------|------------|
| US1  | Gerenciar Agendamentos de Pacientes              | Como recepcionista, eu quero gerenciar os agendamentos dos pacientes de forma centralizada, para facilitar ajustes e garantir uma visão clara da agenda da clínica.    | 4     | 4        | 3     | 3       | 3           | 15         |
| US2  | Selecionar Médico para Agendamento               | Como paciente, eu quero selecionar o médico de minha preferência ao agendar uma consulta online, para ter mais controle sobre meus atendimentos e garantir continuidade no tratamento.  | 5     | 4        | 2     | 2       | 3           | 17         |
| US3  | Receber Lembretes de Consulta                    | Como um paciente, quero receber notificações automáticas e lembretes de consulta, para que não me esqueça dos compromissos.  | 4     | 4        | 2     | 2       | 2           | 14         |
| US4  | Alertar Interações Medicamentosas                | Como médico, quero ser alertado sobre possíveis interações medicamentosas ao prescrever, para evitar erros e garantir a segurança do paciente. | 5     | 5        | 4     | 4       | 4           | 19         |
| US5  | Inserir Notas e Prescrições                      | Como médico, quero inserir notas e prescrições de forma eficiente, para otimizar meu tempo e focar mais no atendimento ao paciente.          | 4     | 3        | 2     | 3       | 3           | 13         |
| US6  | Visualizar Atendimentos Anteriores               | Como médico, quero visualizar os atendimentos anteriores do paciente, para acompanhar a evolução do caso e oferecer um tratamento contínuo e de qualidade.        | 5     | 5        | 3     | 3       | 4           | 19         |
| US7  | Registrar Medicamentos para Dispensação          | Como uma Farmacêutica, eu quero registrar manualmente os detalhes das prescrições no sistema da farmácia, para controlar o estoque e preparar os medicamentos para dispensa.     | 3     | 3        | 2     | 2       | 2           | 11         |
| US8  | Alertar sobre Interações Medicamentosas          | Como uma Farmacêutica, eu quero que o sistema notifique automaticamente sobre possíveis interações medicamentosas e alergias, para garantir a segurança do paciente e evitar erros.         | 5     | 5        | 4     | 4       | 4           | 19         |
| US9  | Dispensar Medicamentos de Forma Segura           | Como uma Farmacêutica, eu quero um sistema que torne a dispensa de medicamentos um processo à prova de erros, para ter certeza de que o paciente receba a medicação correta e evitar complicações.    | 5     | 5        | 3     | 3       | 3           | 18         |
| US10 | Consultar Detalhes de Medicamentos               | Como uma Farmacêutica, eu quero visualizar informações detalhadas sobre cada medicamento no sistema, para ter todas as informações necessárias no momento da dispensa e para verificar interações medicamentosas.                             | 4     | 4        | 2     | 2       | 3           | 15         |
| US11 | Visualizar Disponibilidade Médica                | Como Coordenador de Agendamento, quero visualizar a clara disponibilidade dos médicos, para otimizar a agenda dos médicos e evitar conflitos.            | 4     | 4        | 2     | 2       | 3           | 15         |
| US12 | Ajustar Agendamentos Centralizados               | Como Coordenador de Agendamento, quero ter facilidade para fazer ajustes nos agendamentos, para evitar conflitos e otimizar a agenda dos médicos.                          | 4     | 4        | 2     | 3       | 3           | 14         |
| US13 | Notificar Pacientes Agendados                    | Como Coordenador de Agendamento, quero enviar notificações automáticas para pacientes sobre seus agendamentos, para mantê-los informados e reduzir reagendamentos desgastantes.   | 4     | 4        | 2     | 2       | 2           | 14         |
| US14 | Visualizar Pacientes Agendados por Médico        | Como Médico Clínico Geral, quero visualizar os pacientes agendados para mim, para me preparar para as consultas e gerenciar meu tempo eficientemente.         | 4     | 3        | 2     | 2       | 2           | 13         |
| US15 | Visualizar Detalhes do Agendamento               | Como Paciente, quero visualizar informações sobre meu agendamento, como local e médico, para ter todas as informações necessárias para minhas consultas.             | 4     | 3        | 1     | 1       | 2           | 13         |
| US16 | Receber Notificações de Medicação                | Como paciente, quero receber notificações sobre minhas medicações, incluindo horários e dosagens, para aumentar a adesão ao tratamento e evitar erros.             | 5     | 5        | 3     | 3       | 4           | 19         |
| US17 | Acessar Histórico Médico                         | Como médico, quero acessar o histórico médico completo de um paciente, incluindo consultas anteriores, exames e medicações, para ter uma visão completa do quadro clínico.      | 5     | 5        | 4     | 4       | 5           | 20         |
| US18 | Agendar Consultas Online                         | Como paciente, quero agendar minhas consultas online, selecionando o médico e o horário, para ter autonomia e conveniência no processo.                                   | 5     | 4        | 3     | 3       | 4           | 18         |
| US19 | Acessar Resultados de Exames                     | Como médico, quero acessar os resultados dos exames de um paciente de forma rápida e organizada, para auxiliar no diagnóstico e acompanhamento.      | 5     | 5        | 3     | 3       | 4           | 19         |
| US20 | Cadastrar Pacientes no Sistema                   | Como funcionário da clínica, quero cadastrar novos pacientes no sistema, armazenando seus dados e informações relevantes, para facilitar o agendamento de consultas e o acesso ao histórico médico.       | 4     | 4        | 2     | 2       | 4           | 16         |
| US21 | Automatizar inserção das prescrições médicas     | Como Médico, quero automatizar a inserção dos detalhes das prescrições médicas, para reduzir erros e agilizar o processo de prescrição.        | 4     | 4        | 3     | 3       | 3           | 15         |
| US22 | Centralizar acesso ao registro dos pacientes     | Como Profissional de Saúde, quero centralizar o acesso ao registro dos pacientes, para facilitar a consulta e garantir a segurança das informações.   | 5     | 5        | 5     | 5       | 5           | 20         |
| US23 | Centralizar e automatizar gerenciamento de consultas | Como Coordenador de Agendamento, quero centralizar e automatizar o gerenciamento de agendamento de consultas, para otimizar a agenda e evitar conflitos.    | 5     | 5        | 4     | 4       | 5           | 20         |
| US24 | Cadastrar unidades do hospital                   | Como Administrador do Sistema, quero cadastrar unidades do hospital, para manter o sistema atualizado com as informações das instalações.                  | 3     | 2        | 1     | 1       | 2           | 10         |
| US25 | Visualizar unidades do hospital                  | Como Usuário, quero visualizar unidades do hospital, para encontrar a unidade desejada e obter informações relevantes.                        | 2     | 2        | 1     | 1       | 1           | 7          |
| US26 | Visualizar atendimentos por unidade              | Como Gestor, quero visualizar atendimentos feitos por cada unidade, para monitorar o desempenho e identificar áreas de melhoria.             | 4     | 3        | 3     | 3       | 3           | 14         |
| US27 | Visualizar Mensagens                             | Como usuário, quero visualizar as mensagens recebidas e enviadas, para acompanhar a comunicação e ter um registro das conversas.              | 3     | 3        | 2     | 2       | 1           | 10         |
| US28 | Enviar Mensagens                                 | Como usuário, quero enviar mensagens para equipes, pessoas ou unidades diferentes, para facilitar a comunicação e o compartilhamento de informações.              | 4     | 4        | 2     | 2       | 2           | 14         |
| US29 | Visualizar Histórico de Mensagens                | Como usuário, quero visualizar o histórico de mensagens, para consultar conversas anteriores e buscar informações relevantes.                      | 3     | 3        | 2     | 2       | 1           | 10         |
| US30 | Visualizar Documentos Enviados                   | Como Profissional de Saúde, quero visualizar documentos enviados entre equipes ou pessoas, para garantir que as informações estejam sendo compartilhadas corretamente e acompanhar o fluxo de trabalho.          | 4     | 4        | 3     | 3       | 3           | 15         |
| US31 | Enviar Documentos                                | Como Profissional de Saúde, quero enviar documentos para uma pessoa, equipe ou unidade, para compartilhar informações de forma eficiente e segura.                           | 5     | 5        | 3     | 3       | 4           | 19         |
| US32 | Visualizar Histórico de Documentos Enviados      | Como Profissional de Saúde, quero visualizar o histórico de documentos enviados, para auditar o fluxo de informações e ter um registro das comunicações.                         | 4     | 4        | 2     | 2       | 2           | 14         |
| US33 | Padronizar Documentos por Categoria              | Como Administrador do Sistema, quero padronizar documentos de acordo com sua categoria, para facilitar a organização, busca e conformidade.  | 3     | 3        | 2     | 2       | 2           | 11         |
| US34 | Armazenar Documentos para Acesso Futuro          | Como Profissional de Saúde, quero armazenar os documentos para acesso futuro, para ter um repositório centralizado e garantir que informações importantes não se percam.    | 5     | 5        | 4     | 4       | 5           | 20         |
| US35 | Gerar Relatório de Paciente                      | Como médico, quero gerar um relatório completo de um paciente, incluindo seu histórico médico, exames e medicações, para ter uma visão consolidada e facilitar o acompanhamento do caso.             | 4     | 4        | 3     | 3       | 3           | 15         |
| US36 | Validar Dados e Conformidade Automaticamente     | Como Diretor de Tecnologia, quero que o sistema valide dados e conformidades automaticamente, para garantir que as informações estejam corretas e em linha com as regulamentações, minimizando a carga de trabalho manual e riscos de penalidades.                              | 5     | 5        | 4     | 4       | 5           | 20         |
| US37 | Visualizar Histórico de Relatórios entre Unidades| Como administrador, quero visualizar o histórico de relatórios de pacientes gerados entre diferentes unidades da HealthNet, para ter uma visão integrada e acompanhar o fluxo de informações.                            | 4     | 3        | 3     | 3       | 2           | 13         |
| US38 | Notificar sobre Erros de Conformidade ou Dados   | Como Diretor de Tecnologia, quero que o sistema me notifique automaticamente ao identificar um erro de conformidade ou dados, para que possamos agir rapidamente na correção e manter a integridade do sistema.                 | 5     | 5        | 3     | 3       | 4           | 19         |

--

## PBB no Miro
<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVJeksw1I=/?embedMode=view_only_without_ui&moveToViewport=-20917,-17016,23707,10061&embedId=692678229163" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>
