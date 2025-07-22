# Estudo de caso: ConnectCare

Em regiões como Vila Esperança, onde o acesso à saúde é limitado, surgiu o ConnectCare, fruto da colaboração entre desenvolvedores e agentes sociais. A plataforma visa superar barreiras como transporte insuficiente, falta de infraestrutura e escassez de informação. Seu objetivo é ampliar o acesso a cuidados médicos por meio da tecnologia, promovendo o vínculo entre moradores, agentes comunitários e instituições parceiras por meio de campanhas e ações integradas.

Para facilitar o entendimento dos requisitos funcionais do sistema, foi utilizado um **Diagrama de Casos de Uso**, representando os atores principais e os serviços esperados. Esse diagrama pode ser visualizado na imagem fornecida. Abaixo, apresenta-se a descrição dos atores e seus respectivos casos de uso mapeados com base no modelo UML analisado.

<img width="1495" height="911" alt="image" src="https://github.com/user-attachments/assets/369bede4-d189-49c0-9d2b-4cb7acd15080" />


## 1. Atores

- **Administrador do sistema**: responsável pela manutenção técnica, integração com parceiros e conformidade de dados.
- **Paciente**: usuário principal da aplicação, acessa funcionalidades relacionadas à saúde, agendamentos e localização de serviços.
- **Profissional da saúde**: médicos e enfermeiros responsáveis pelo registro, atualização e visualização de informações de atendimento.
- **Agente comunitário**: figura de articulação entre a comunidade e o sistema, com foco em visitas domiciliares e relatórios de saúde.
- **Organização parceira**: instituições associadas que promovem campanhas de saúde e acompanham seu impacto na comunidade.


# Especificação dos Casos de Uso

## 1. Registrar Informações Profissionais 
### Breve descrição

Este caso de uso permite que um *Profissional de Saúde* (como médico, enfermeiro ou agente comunitário) crie ou atualize seu perfil na plataforma ConnectCare. O processo envolve o registro de suas informações de identificação, especializações e horários de disponibilidade, tornando-o apto a ser listado e agendado para atendimentos.


### Atores

- **Profissional de Saúde** (*ator primário*): interage com o sistema para criar ou atualizar seu perfil.
- **Sistema ConnectCare** (*ator secundário*): realiza a validação, armazenamento e retorno das informações.


### Fluxo básico de eventos

**Início do caso de uso:** O caso de uso é iniciado quando o *Profissional de Saúde*, após autenticar-se no sistema, seleciona a opção para gerenciar o seu perfil profissional.

1. O sistema exibe um formulário para o registro das informações profissionais.  
2. O *Profissional de Saúde* preenche os seguintes campos:
   - Nome completo  
   - Número de registro profissional (ex: CRM para médicos, COREN para enfermeiros)  
   - Especializações (selecionadas a partir de uma lista pré-definida)  
   - Horários de disponibilidade para atendimento (dias da semana e períodos)  
3. O *Profissional de Saúde* confirma a submissão das informações  
4. O sistema valida os dados inseridos (verifica se todos os campos obrigatórios foram preenchidos e se o formato do registro profissional é válido)  
5. O sistema salva as informações no perfil do *Profissional de Saúde*  
   - **RN1:** Se o registro profissional estiver ausente ou inválido, o sistema interrompe o fluxo e redireciona para o passo 2 (*ver FE1*)  
6. O sistema exibe uma mensagem de sucesso, confirmando que o perfil foi salvo/atualizado  
7. O caso de uso é encerrado  


### Fluxos alternativos

#### A1: Profissional de Saúde atualiza um perfil já existente  

**Condição:** ocorre no passo 2 do fluxo básico, se o profissional já possui informações registradas.

**Fluxo:**  
1. O sistema exibe o formulário com os dados do perfil previamente salvos  
2. O *Profissional de Saúde* edita os campos desejados (por exemplo, horários de disponibilidade)  
3. O fluxo retorna ao passo 3 do fluxo básico  

#### A2: Profissional de Saúde cancela a operação  

**Condição:** o profissional pode, a qualquer momento nos passos 1, 2 ou 3 do fluxo básico, selecionar a opção "Cancelar".

**Fluxo:**  
1. O sistema descarta todas as informações que foram inseridas ou alteradas  
2. O sistema retorna o usuário à tela anterior  
3. O caso de uso é encerrado  


### Fluxos de exceção

#### FE1: Dados inválidos  

**Condição:** ocorre no passo 4 do fluxo básico, se o sistema detectar que alguma informação está em formato incorreto ou um campo obrigatório não foi preenchido.

**Fluxo:**  
1. O sistema impede o salvamento das informações  
2. O sistema exibe uma mensagem de erro específica, indicando qual campo precisa ser corrigido (ex: "Formato do CRM inválido")  
3. O fluxo retorna ao passo 2 do fluxo básico, mantendo os dados já preenchidos  


#### FE2: Falha de conexão com o sistema  

**Condição:** ocorre no passo 5 do fluxo básico, se a conexão com o servidor for perdida no momento de salvar os dados.

**Fluxo:**  
1. O sistema não consegue salvar as informações  
2. O sistema exibe uma mensagem de erro informando sobre a falha de conexão e orienta o usuário a tentar novamente  
3. O fluxo retorna ao **passo 7 do fluxo básico**, encerrando o caso de uso  

### Pré-condições

- PC1 - O sistema ConnectCare deve estar online e funcional  
- PC2 - O usuário deve estar autenticado no sistema  
- PC3 - O usuário autenticado deve possuir o papel (permissão) de *Profissional de Saúde*  

### Pós-condições

- **PsC1 - Perfil salvo com sucesso:** as informações são armazenadas e associadas ao perfil do ator  
- **PsC2 - Perfil ativo na plataforma:** o profissional está disponível para consultas/agendamentos  
- **PsC3 - Ação registrada para auditoria:** é criado um log com os dados da operação  
- **PsC4 - Estado do sistema inalterado:** em caso de falha ou cancelamento, nada é alterado  

### Pontos de extensão

- **Localização no fluxo de eventos:** imediatamente após o passo 5  
- **Propósito:** permite extensão como "Validar credencial profissional externamente", com consulta automática ao CRM ou COREN para atualizar o status do perfil para "Verificado"  

### Requisitos especiais

- **RE1 (Segurança):** conformidade com a LGPD  
- **RE2 (Usabilidade):** formulário intuitivo e acessível em dispositivos móveis  
- **RE3 (Integridade):** máscaras de validação para registros como CRM ou COREN  

### Informações adicionais

A lista de especializações do passo 2 do fluxo básico deve ser gerenciada pelo administrador do sistema para garantir padronização.

## 2. Monitorar Desempenho do Sistema 

### Breve descrição

Este caso de uso descreve como o ator *Administrador do Sistema* monitora os indicadores de desempenho e o impacto social do aplicativo ConnectCare. Utilizando painéis analíticos, o administrador acompanha métricas operacionais e de uso para garantir o funcionamento eficiente da plataforma, a segurança dos dados e a geração de informações estratégicas.

### Atores

- **Administrador do Sistema** (*ator primário*): acessa, filtra e analisa os dados da plataforma.  
- **Sistema ConnectCare** (*ator secundário*): fornece os indicadores, aplica filtros e gera relatórios.

### Fluxo básico de eventos

**Início do caso de uso:** O caso de uso é iniciado quando o *Administrador do Sistema*, autenticado, acessa o painel administrativo.

1. O sistema exibe a interface com opções de monitoramento e análise.  
2. O *Administrador do Sistema* seleciona a área de "Monitoramento" ou "Analytics".  
3. O sistema exibe o painel analítico com os principais indicadores de desempenho, incluindo:  
   - Número de usuários ativos  
   - Volume de agendamentos realizados  
   - Taxa de satisfação dos pacientes  
   - Número de pacientes atendidos  
   - Doenças mais recorrentes  
   - (*ver FE1*)  
4. O administrador analisa os dados para avaliar o desempenho e impacto.  
   - (*ver FA1*)  
5. O administrador seleciona a opção de gerar relatório consolidado.  
   - **RN1:** Se houver fontes de dados indisponíveis, o sistema deverá registrar e notificar quais dados estão ausentes (*ver FE2*).  
6. O sistema finaliza a geração do relatório.  
7. O caso de uso é encerrado.

### Fluxos alternativos

#### FA1 – Filtrar indicadores  

**Condição:** ocorre no passo 4 do fluxo básico.  

**Fluxo:**  
1. O *Administrador do Sistema* aplica filtros por período, região, comunidade ou campanha.  
2. O sistema atualiza o painel analítico com os dados filtrados.  
3. O fluxo retorna ao passo 4 do fluxo básico.  

#### Fluxos de exceção

#### FE1 – Falha ao carregar dados do painel  

**Condição:** ocorre no passo 3 do fluxo básico.

**Fluxo:**  
1. O sistema exibe mensagem de erro informando falha no carregamento dos dados.  
2. O administrador é orientado a tentar novamente mais tarde.  
3. O caso de uso é encerrado.  

#### FE2 – Dados para relatório indisponíveis  

**Condição:** ocorre no passo 5 do fluxo básico.

**Fluxo:**  
1. Uma das fontes de dados necessárias está indisponível.  
2. O sistema gera o relatório com os dados disponíveis e notifica as ausências.  
3. O fluxo retorna ao **passo 6 do fluxo básico** para finalização e encerramento.  

### Pré-condições

- **PC1 - Administrador autenticado:** o usuário deve estar logado com credenciais administrativas.

### Pós-condições

- **PsC1 - Análise de desempenho realizada:** o administrador teve acesso aos dados operacionais e sociais.  
- **PsC2 - Relatório de impacto gerado:** relatório consolidado está disponível para consulta.

### Pontos de extensão

- **PE1 - Ações corretivas:** pode ser estendido pelos casos "Corrigir erros técnicos" ou "Realizar ajustes no sistema", com base nas análises realizadas.

### Requisitos especiais

- **RS1 - Segurança e privacidade:** conformidade com legislações de proteção de dados.  
- **RS2 - Precisão dos dados:** indicadores devem ser atualizados e confiáveis.  
- **RS3 - Usabilidade:** apresentação clara e visualmente acessível dos dados no painel.

### Informações adicionais

Esta funcionalidade sustenta o objetivo do ConnectCare de fornecer evidências para decisões estratégicas e políticas públicas baseadas em dados coletivos.

## 3. Visualizar agenda de consultas  
### Breve descrição

Este caso de uso descreve como o *Profissional de Saúde* utiliza o sistema ConnectCare para visualizar a agenda de consultas associada ao seu perfil. Essa funcionalidade organiza o fluxo de trabalho, permitindo que o profissional veja horários, pacientes agendados e tipos de atendimento. A agenda é atualizada em tempo real com base nos agendamentos realizados pelos pacientes.

###tores

- **Profissional de Saúde** (*ator primário*): acessa e interage com a agenda de consultas.  
- **Sistema ConnectCare** (*ator secundário*): recupera, filtra e exibe os dados da agenda.

### Fluxo básico de eventos

**Início do caso de uso:** o *Profissional de Saúde*, autenticado, acessa a funcionalidade de agenda no sistema.

1. O profissional acessa o menu principal da aplicação ConnectCare.  
2. O profissional seleciona a opção "Agenda de consultas".  
3. O sistema solicita o período desejado para visualização (dia, semana ou mês).  
4. O profissional escolhe o período e confirma.  
5. O sistema exibe a lista de consultas agendadas com: nome do paciente, horário, local do atendimento e tipo da consulta.  
   - **RN1:** O sistema deve considerar somente consultas confirmadas e associadas ao profissional logado (*ver FE1 e FE2*).  
6. O profissional pode clicar em uma consulta para visualizar informações detalhadas.  
7. O caso de uso é encerrado.

### Fluxos alternativos

#### FA1 – Filtro por tipo de atendimento  

**Condição:** ocorre após o passo 5 do fluxo básico.  

**Fluxo:**  
1. O profissional aplica um filtro para exibir somente consultas de um tipo específico (ex: pediatria).  
2. O sistema ajusta a visualização para exibir apenas as consultas correspondentes.  
3. O fluxo retorna ao passo 5 do fluxo básico.  

### Fluxos de exceção

#### FE1 – Nenhuma consulta agendada  

**Condição:** ocorre após o passo 4, quando o sistema não encontra consultas para o período selecionado.

**Fluxo:**  
1. O sistema exibe a mensagem “Nenhuma consulta agendada para o período selecionado”.  
2. O caso de uso é encerrado.  

#### FE2 – Erro de comunicação com o servidor  

**Condição:** ocorre no passo 5, se o sistema falhar ao recuperar os dados da agenda.

**Fluxo:**  
1. O sistema exibe a mensagem “Não foi possível carregar a agenda. Verifique sua conexão e tente novamente”.  
2. O profissional pode tentar novamente ou retornar ao menu principal.  

### Pré-condições

- **PC1 - Profissional autenticado:** o usuário deve estar logado no sistema.  
- **PC2 - Perfil de profissional configurado:** o perfil deve conter área de atuação e disponibilidade registradas.  

### Pós-condições

- **PsC1 - Consultas listadas:** a agenda foi apresentada com sucesso.  
- **PsC2 - Detalhes acessados:** o profissional acessou detalhes de uma ou mais consultas.  

### Pontos de extensão

- Nenhum ponto de extensão foi identificado até o momento.

### Requisitos especiais

- **RS1 - Responsividade:** a agenda deve se adaptar a diferentes tamanhos de tela (ex: smartphones, tablets).  
- **RS2 - Desempenho:** os dados devem ser carregados em no máximo 2 segundos.  
- **RS3 - Segurança:** apenas o profissional autenticado pode acessar a própria agenda.  

### Informações adicionais

Essa funcionalidade é essencial para automação do atendimento, especialmente em comunidades com recursos limitados. Ela contribui para reduzir ausências, melhorar o tempo de resposta e permitir maior previsibilidade do fluxo de pacientes na plataforma ConnectCare.

## 4. Acessar histórico do paciente  

### Breve descrição

Este caso de uso descreve o processo pelo qual um *Profissional de Saúde* acessa o histórico médico digital de um paciente na plataforma ConnectCare. O histórico inclui registros de atendimentos anteriores, exames e dados fornecidos pelo próprio paciente.

### Atores

- **Profissional de Saúde** (*ator primário*): acessa o histórico e realiza atualizações.  
- **Sistema ConnectCare** (*ator secundário*): exibe, armazena e valida os dados.  

### Fluxo básico de eventos

**Início do caso de uso:** o *Profissional de Saúde* acessa a plataforma ConnectCare.

1. O profissional abre o aplicativo ConnectCare.  
2. O sistema exibe a tela inicial.  
3. Se o profissional não estiver autenticado, o sistema solicita login (*ver A1*).  
4. O sistema autentica o usuário.  
5. O profissional seleciona o paciente (via agenda ou busca direta).  
6. O sistema exibe o histórico médico digital do paciente, contendo:  
   - registros de consultas  
   - exames  
   - dados fornecidos pelo paciente  
   - **RN1:** Apenas profissionais autorizados podem acessar o histórico do paciente (*ver FE1, FE2*).  
7. O profissional visualiza e analisa os dados para conduzir o atendimento.  
8. O profissional atualiza o prontuário com diagnósticos, prescrições e observações.  
9. O sistema salva as atualizações com segurança.  
10. O caso de uso é encerrado.  

### Fluxos alternativos

#### A1 – Profissional de Saúde não autenticado

**Condição:** ocorre no passo 3 do fluxo básico.  

**Fluxo:**  
1. O sistema redireciona o profissional para a tela de login.  
2. Caso não possua cadastro, o profissional pode criar um novo perfil com especializações e horários.  
3. Após o login ou cadastro, o fluxo retorna ao passo 5 do fluxo básico.

### Fluxos de exceção

#### FE1 – Histórico do paciente indisponível ou vazio  

**Condição:** ocorre no passo 6, quando não há dados registrados ou há falha ao carregar o histórico.  

**Fluxo:**  
1. O sistema informa que o histórico está indisponível ou inexistente.  
2. O profissional pode coletar informações diretamente com o paciente e iniciar um novo prontuário.  
3. O caso de uso é encerrado ou reiniciado após resolução do problema.  

#### FE2 – Falha de conexão com a internet  

**Condição:** pode ocorrer do passo 6 ao 9, caso haja perda de conexão.  

**Fluxo:**  
1. O sistema exibe mensagem de erro de conexão.  
2. O profissional pode tentar novamente após restabelecimento da rede.  
3. Informações não salvas podem ser perdidas, dependendo do suporte a modo offline.

### Pré-condições

- **PC1:** Sistema ConnectCare online e funcional.  
- **PC2:** Profissional de saúde autenticado.  
- **PC3:** Perfil de paciente existente e selecionado.  

### Pós-condições

- **PsC1:** O histórico médico do paciente foi acessado com sucesso.  
- **PsC2:** As informações relevantes foram consultadas e/ou atualizadas.  

### Requisitos especiais

- **RE1 – Controle de acesso (RN1):** apenas profissionais autorizados (via RBAC) podem visualizar ou alterar dados dos pacientes.  
- **RE2 – Conformidade com LGPD:** o sistema deve seguir as normas da legislação vigente, com auditoria de segurança anual.  
- **RE3 – Suporte à baixa conectividade:** a funcionalidade deve operar com conexão mínima de 64 kbps, tolerando até 5 segundos de atraso.  

## 5. Registrar visitas domiciliares  

### Breve descrição

Este caso de uso permite que um *Agente Comunitário* registre detalhes de visitas domiciliares realizadas nas comunidades atendidas. As informações coletadas ajudam a mapear necessidades de saúde e a planejar ações preventivas.

### Atores

- **Agente Comunitário** (*ator primário*): registra as informações da visita.  
- **Sistema ConnectCare** (*ator secundário*): valida, armazena e confirma os dados registrados.

###  Fluxo básico de eventos

**Início do caso de uso:** o *Agente Comunitário*, autenticado, acessa a funcionalidade de registro de visita.

1. O sistema exibe o formulário de registro da visita domiciliar.  
2. O agente preenche os seguintes campos:
   - Data e hora da visita  
   - Endereço da residência  
   - Nome dos moradores contatados  
   - Condições de saúde observadas  
   - Relatório descritivo da visita  
   - Encaminhamentos ou ações recomendadas  
3. O agente confirma o envio das informações.  
4. O sistema valida os dados inseridos.  
   - **RN1:** todos os campos obrigatórios devem ser preenchidos corretamente (*ver FE1*)  
5. O sistema salva as informações.  
6. O sistema exibe mensagem de sucesso.  
7. O caso de uso é encerrado.  
   - (*ver A1, FE2*)  

### Fluxos alternativos

#### A1 – Editar visita registrada anteriormente

**Condição:** ocorre se o agente desejar modificar uma visita já registrada.

**Fluxo:**  
1. O sistema exibe a lista de visitas já registradas.  
2. O agente seleciona a visita a ser editada.  
3. O sistema carrega o formulário preenchido.  
4. O agente realiza as alterações desejadas.  
5. O fluxo retorna ao passo 3 do fluxo básico.

### Fluxos de exceção

#### FE1 – Dados inválidos  

**Condição:** ocorre no passo 4, se o sistema identificar erro ou ausência de campos obrigatórios.  

**Fluxo:**  
1. O sistema bloqueia o envio.  
2. Exibe mensagem com campo(s) a corrigir (ex: “Endereço inválido”).  
3. Retorna ao passo 2 do fluxo básico, mantendo os dados preenchidos.

#### FE2 – Falha de conexão com o sistema  

**Condição:** ocorre no passo 5, durante tentativa de salvar os dados.  

**Fluxo:**  
1. O sistema não salva as informações.  
2. Exibe mensagem de erro e orientação para tentar novamente.  
3. O caso de uso é encerrado. O agente deve repetir o envio mais tarde.

### Pré-condições

- **PC1:** Sistema ConnectCare online e funcional  
- **PC2:** Usuário autenticado na plataforma  
- **PC3:** Permissão de *Agente Comunitário* atribuída ao usuário  

### Pós-condições

- **PsC1 - Visita registrada com sucesso:** dados salvos no sistema.  
- **PsC2 - Dados disponíveis para relatórios:** alimentam relatórios de saúde comunitária.  
- **PsC3 - Ação registrada para auditoria:** sistema gera log da operação.  
- **PsC4 - Estado inalterado em caso de falha:** nenhuma alteração é efetivada se o processo for cancelado ou falhar.

### Requisitos especiais

- **RE1 – Segurança:** os dados devem ser protegidos conforme LGPD.  
- **RE2 – Usabilidade:** o formulário deve ser otimizado para dispositivos móveis com baixa conectividade.  
- **RE3 – Integridade:** o sistema deve validar consistência e completude dos dados registrados.  

### Informações adicionais

Os dados registrados servirão como base para mapeamento de vulnerabilidades e planejamento de campanhas preventivas em regiões atendidas por programas de saúde pública. Esta funcionalidade é essencial para contextos com limitação de acesso a serviços médicos.

## 6. Visualizar mapa offline

### Breve descrição

Este caso de uso descreve como o *Paciente* utiliza o aplicativo ConnectCare para visualizar um mapa simplificado, acessível offline, com o objetivo de localizar uma unidade de saúde onde possui uma consulta marcada. A funcionalidade busca superar barreiras tecnológicas e geográficas em regiões com baixa conectividade.

### Atores

- **Paciente** (*ator primário*): acessa o mapa para se orientar até o local do atendimento.  
- **Sistema ConnectCare** (*ator secundário*): fornece o mapa e gerencia sua exibição local.  

### Fluxo básico de eventos

**Início do caso de uso:** ocorre após o *Paciente* ter agendado uma consulta e recebido confirmação.

1. O paciente acessa os detalhes da consulta confirmada no aplicativo.  
2. O paciente seleciona a opção “Visualizar mapa do local de atendimento”.  
3. O sistema carrega um mapa simplificado previamente baixado para uso offline.  
4. O paciente visualiza o mapa e utiliza-o para se orientar até a unidade de saúde.  
   - **RN1:** o mapa deve estar pré-carregado e disponível localmente no dispositivo (*ver FE1*).  
5. O caso de uso é encerrado.  
   - (*ver FE2*)

### Fluxos alternativos

Nenhum fluxo alternativo foi identificado para este caso de uso até o momento.

### Fluxos de exceção

#### FE1 – Mapa indisponível ou corrompido

**Condição:** ocorre no passo 3, quando o sistema não consegue carregar o mapa offline.  

**Fluxo:**  
1. O sistema exibe mensagem indicando que o mapa não está disponível.  
2. O endereço da unidade de saúde é exibido em formato de texto como alternativa.  
3. O caso de uso é encerrado.  

#### FE2 – Falha ao obter localização atual do paciente

**Condição:** ocorre no passo 4, quando o sistema não consegue obter a localização do usuário (ex: GPS desativado).  

**Fluxo:**  
1. O sistema exibe o mapa focado apenas na unidade de saúde (destino).  
2. Uma mensagem informa que não foi possível determinar a localização atual do paciente.  
3. O paciente pode usar o mapa como referência mesmo sem rota personalizada.  
4. O caso de uso é encerrado.  

### Pré-condições

- **PC1 - Paciente autenticado:** o paciente deve estar logado no ConnectCare.  
- **PC2 - Consulta agendada:** o paciente deve ter consulta com local definido.  
- **PC3 - Mapa pré-carregado:** o mapa da região deve estar salvo no dispositivo.  

### Pós-condições

- **PsC1 - Informações de navegação fornecidas:** o paciente teve acesso aos dados para se orientar até a unidade de saúde.  

### Requisitos especiais

- **RE1 – Funcionamento offline:** o mapa deve funcionar sem conexão com a internet.  
- **RE2 – Compatibilidade com dispositivos simples:** a funcionalidade deve ser leve e adaptada a celulares com hardware limitado.  
- **RE3 – Usabilidade:** o mapa deve ser visualmente simples e fácil de interpretar para usuários com pouca familiaridade com tecnologias.  

### Informações adicionais

Esta funcionalidade foi motivada por demandas observadas em comunidades como a Vila Esperança, onde há carência de transporte e conectividade. Ela viabiliza o acesso físico ao atendimento por meio de orientações acessíveis e confiáveis mesmo em ambientes offline.
