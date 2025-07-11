# User Story Mapping
---

## ComunEventos

O "Comun Eventos" é uma plataforma desenvolvida para facilitar a gestão de eventos, proporcionando ferramentas práticas e eficientes para organizadores. A plataforma permite desde a criação e personalização de páginas de eventos, até o gerenciamento de colaboradores, recursos, pagamentos e inscrições. Além disso, oferece funcionalidades como envio de campanhas promocionais, controle de ingressos e realização de check-ins, garantindo uma experiência organizada e dinâmica para os participantes e facilitando o trabalho dos organizadores.

| Persona                    | Papel no projeto                                                            | Necessidades/Expectativas                                                                                                    |
|----------------------------|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Organizadora do Evento      | Coordena a organização de eventos.                                           | Precisa de ferramentas eficientes para gerenciar eventos e manter a comunicação com sua equipe.                               |
| Participante do Evento      | Participa de eventos e engaja com a comunidade.                              | Busca informações rápidas e processos de inscrição sem burocracia.                                                             |
| Patrocinador do Evento      | Investe em eventos e busca visibilidade para sua marca.                      | Precisa de dados claros sobre o impacto do evento e alcance do público.                                                       |
| Fornecedor do Evento        | Fornece serviços e produtos para eventos.                                    | Quer um processo de comunicação claro e transparente.                                                                          |
| Voluntário do Evento        | Auxilia na execução do evento.                                               | Busca clareza nas tarefas e comunicação direta com os organizadores.                                                           |

---

## Persona Organizadora do Evento

<img width="1661" height="647" alt="image" src="https://github.com/user-attachments/assets/1f5f853e-1a69-4076-bde5-c8be3f84989c" />



| Requisito Funcional                  | User Story                                                                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| RF01 - Criar página de evento       | US01 - Como organizador, quero poder criar uma página de evento onde eu possa definir e editar facilmente os detalhes principais.                               |
| RF02 - Salvar página rascunho       | US02 - Como organizador, quero poder salvar um evento como rascunho antes de publicá-lo, para poder trabalhar nos detalhes de forma incremental.               |
| RF03 - Enviar campanhas promocionais| US03 - Como organizador, quero ter uma ferramenta de e-mail integrada para criar e enviar campanhas promocionais e newsletters para minha lista de contatos.    |
| RF04 - Gerenciar colaboradores      | US04 - Como organizador, quero ter uma área de gestão de colaboradores na plataforma para centralizar a comunicação e o compartilhamento de documentos.         |
| RF05 - Atribuir tarefas             | US05 - Como organizador, quero poder atribuir tarefas e diferentes níveis de permissão para minha equipe e voluntários.                                         |
| RF06 - Visualizar colaboradores antigos | US06 - Como organizador, quero ter uma base de dados de fornecedores e voluntários que já participaram de eventos anteriores.                                |
| RF07 - Controlar recursos e equipamentos | US07 - Como organizador, quero ter uma ferramenta de checklist dentro da página de gestão do evento para listar e controlar recursos e equipamentos.         |
| RF08 - Atribuir responsáveis e prazos | US08 - Como organizador, quero poder atribuir responsáveis e prazos para cada item da checklist de recursos.                                                  |
| RF09 - Gerar links de divulgação    | US09 - Como organizador, quero poder gerar links de divulgação personalizados para parceiros e rastrear a eficácia de cada canal.                               |
| RF10 - Compartilhar informações do evento | US10 - Como organizador, quero integrar a plataforma com redes sociais para compartilhar informações e engajar o público.                                 |
| RF11 - Criar ingressos              | US11 - Como organizador, quero poder criar diferentes tipos de ingressos.                                                                                       |
| RF12 - Gerenciar pagamentos         | US12 - Como organizador, quero poder gerenciar os pagamentos de forma segura e centralizada.                                                                    |
| RF13 - Visualizar inscritos         | US13 - Como organizador, quero ter acesso a um painel em tempo real com número de inscritos e lista detalhada de participantes.                                 |
| RF14 - Fazer check-in dos participantes | US14 - Como organizador, quero poder fazer o check-in dos participantes com QR Code para agilizar a entrada.                                               |
| RF15 - Enviar notificações          | US15 - Como organizador, quero poder enviar notificações e e-mails em massa para todos os participantes inscritos.                                              |
| RF16 - Criar pesquisas de satisfação| US16 - Como organizador, quero poder criar e enviar pesquisas de satisfação personalizáveis após o evento.                                                      |
| RF17 - Gerenciar relatórios de evento| US17 - Como organizador, quero ter acesso a um painel de controle com relatórios automáticos do evento.                                                        |

---

## Persona Participante

<img width="1306" height="826" alt="image" src="https://github.com/user-attachments/assets/edd83905-f2bf-4c51-b48c-7259c7370b18" />

| Requisito Funcional | User Story |
|---|---|
| RF18 - Buscar eventos | US18 - Como participante, quero poder buscar eventos por palavras-chave (ex: "feira local", "workshop") para encontrar atividades que correspondam aos meus interesses específicos. |
| RF19 - Filtrar a busca de eventos | US19 - Como participante, quero poder filtrar a busca de eventos por categorias (ex: culturais, esportivos, beneficentes) para refinar os resultados e encontrar o tipo de evento que desejo. |
| RF20 - Visualizar eventos disponíveis | US20 - Como participante, quero poder visualizar os eventos disponíveis em um mapa para identificar atividades acontecendo perto da minha localização. |
| RF21 - Visualizar eventos recomendados | US21 - Como participante, quero ver uma lista de eventos recomendados com base nos meus interesses e no meu histórico na plataforma, para descobrir novas oportunidades de forma passiva. |
| RF22 - Inscrever em eventos | US22 - Como participante, quero poder me inscrever em um evento com um clique, utilizando os dados do meu perfil, para evitar o preenchimento repetitivo de formulários. |
| RF23 - Receber confirmação | US23 - Como participante, quero receber uma confirmação instantânea da minha inscrição por e-mail e/ou notificação no aplicativo, para ter a segurança de que minha vaga está garantida. |
| RF24 - Gerenciar inscrições | US24 - Como participante, quero poder gerenciar todas as minhas inscrições em um único local no meu perfil, para ter uma visão clara dos eventos que irei participar. |
| RF25 - Realizar pagamento | US25 - Como participante, caso o evento seja pago, quero poder realizar o pagamento de forma segura e integrada na própria plataforma para concluir minha inscrição em um único fluxo. |
| RF26 - Selecionar método de pagamento | US26 - Como participante, quero ter acesso a diferentes métodos de pagamento (cartão de crédito, PIX) para escolher a opção mais conveniente para mim. |
| RF27 - Acessar página do evento | US27 - Como participante, quero poder acessar uma página dedicada ao evento com todas as informações centralizadas, como data, horário, local, programação e descrição completa, para não precisar buscar em diferentes canais. |
| RF28 - Receber atualizações | US28 - Como participante, quero receber notificações sobre quaisquer atualizações ou alterações importantes no evento (ex: mudança de local ou horário) para estar sempre informado. |
| RF29 - Acessar canal de comunicação | US29 - Como participante, quero ter um canal de comunicação direto dentro da plataforma para tirar dúvidas com os organizadores do evento. |
| RF30 - Visualizar localização | US30 - Como participante, quero poder visualizar a localização do evento em um mapa interativo com a opção de traçar rotas, para facilitar meu deslocamento no dia. |
| RF31 - Receber lembrete | US31 - Como participante, quero receber um lembrete por notificação ou e-mail para avaliar o evento após sua conclusão, para não me esquecer de fornecer meu feedback. |
| RF32 - Visualizar avaliações | US32 - Como participante, quero poder visualizar as avaliações de outros usuários em páginas de eventos passados para me ajudar a decidir sobre participações futuras. |

---

## Persona Patrocinador 

<img width="917" height="759" alt="image" src="https://github.com/user-attachments/assets/2c8a4329-9097-4339-9a8b-14792c3826f5" />

| Requisito Funcional | User Story |
|---|---|
| RF33 - Buscar eventos para apoio | US33 - Como patrocinador, quero poder buscar eventos que estão procurando apoio financeiro, filtrando por público-alvo, tipo de evento e localização, para encontrar oportunidades alinhadas com a minha estratégia de marketing. |
| RF34 - Visualizar proposta de patrocínio | US34 - Como patrocinador, quero poder visualizar uma "proposta de patrocínio" clara na página do evento, detalhando as cotas, os benefícios (ex: exposição de marca, estandes no local), e o perfil dos participantes, para avaliar o potencial da parceria. |
| RF35 - Negociar termos de patrocínio | US35 - Como patrocinador, quero poder iniciar uma conversa com o organizador do evento através da plataforma para negociar os termos do patrocínio e esclarecer dúvidas. |
| RF36 - Gerenciar patrocínios ativos | US36 - Como patrocinador, quero ter um painel para gerenciar todos os meus patrocínios ativos, com acesso fácil aos contratos e à lista de benefícios acordados para cada evento. |
| RF37 - Enviar materiais de marketing | US37 - Como patrocinador, quero poder enviar meus materiais de marketing (como logotipos e banners) diretamente pela plataforma para que o organizador utilize nos materiais promocionais, conforme o acordo. |
| RF38 - Receber relatório pós-evento | US38 - Como patrocinador, quero receber um relatório pós-evento com métricas claras sobre o impacto da minha participação, como alcance da marca e dados demográficos do público, para avaliar o retorno do meu investimento. |
| RF39 - Acessar histórico de patrocínio | US39 - Como patrocinador, quero ter acesso a um histórico de todos os eventos que patrocinei através da plataforma, junto com seus respectivos relatórios de impacto, para tomar decisões mais informadas sobre investimentos futuros. |
| RF40 - Visualizar feedback geral | US40 - Como patrocinador, quero poder visualizar o feedback geral e a satisfação dos participantes do evento para entender a percepção do público e a qualidade da organização que associei à minha marca. |

---

## Persona Fornecedor

<img width="1506" height="765" alt="image" src="https://github.com/user-attachments/assets/1b44c5e5-166b-49bd-8462-f923ca4071c6" />

| Requisito Funcional | User Story |
|---|---|
| RF41 - Criar perfil público | US41 - Como fornecedor, quero poder criar um perfil público na plataforma detalhando meus serviços e portfólio para que os organizadores de eventos possam me encontrar. |
| RF42 - Receber notificações de eventos | US42 - Como fornecedor, quero receber notificações sobre eventos que precisam dos serviços que eu ofereço para poder enviar uma cotação e iniciar uma negociação. |
| RF43 - Comunicar com organizadores | US43 - Como fornecedor, quero ter um canal de comunicação direto na plataforma para negociar preços e condições com os organizadores de forma eficiente e registrada. |
| RF44 - Gerar contrato digital | US44 - Como fornecedor, quero poder formalizar o acordo através de um contrato digital na plataforma, especificando detalhes como datas, custos e responsabilidades, para garantir a segurança de ambas as partes. |
| RF45 - Gerenciar contratos | US45 - Como fornecedor, quero ter um painel para gerenciar todos os meus contratos, com uma visão clara das minhas entregas, prazos e especificações para cada evento. |
| RF46 - Receber atualizações e lembretes | US46 - Como fornecedor, quero receber lembretes e atualizações do organizador através da plataforma para garantir que minha entrega esteja sempre alinhada com as necessidades do evento. |
| RF47 - Receber pagamento | US47 - Como fornecedor, quero ter um processo de pagamento transparente e rastreável dentro da plataforma para garantir que recebereai o valor acordado no prazo. |
| RF48 - Receber feedback | US48 - Como fornecedor, quero poder solicitar e receber uma avaliação do organizador do evento após a conclusão do meu serviço para construir minha reputação. |
| RF49 - Histórico de feedback | US49 - Como fornecedor, quero ter um histórico de todos os serviços prestados e dos feedbacks recebidos para usar como portfólio em futuras negociações. |

---

## Persona Voluntario

<img width="1334" height="709" alt="image" src="https://github.com/user-attachments/assets/828c6358-a85f-457b-adf1-bcc1fe436672" />

| Requisito Funcional | User Story |
|---|---|
| RF50 - Buscar eventos para ajuda | US50 - Como voluntário, quero poder buscar eventos que precisam de ajuda, filtrando por causa, tipo de atividade e localização, para encontrar oportunidades que se alinhem com meus interesses. |
| RF51 - Visualizar descrição das funções| US51 - Como voluntário, quero poder visualizar uma descrição clara das funções e responsabilidades da vaga antes de me candidatar, para entender exatamente o que é esperado de mim. |
| RF52 - Candidatar para vaga | US52 - Como voluntário, quero poder me candidatar para uma vaga de forma simples, usando meu perfil na plataforma, e receber uma confirmação de que minha candidatura foi enviada. |
| RF53 - Receber material de treinamento| US53 - Como voluntário, quero receber materiais de treinamento ou participar de sessões de treinamento online através da plataforma para me preparar para minhas tarefas. |
| RF54 - Acessar painel de informações | US54 - Como voluntário, quero ter acesso a um painel com todas as informações sobre minha participação, incluindo minhas tarefas específicas, horários e a quem devo me reportar. |
| RF55 - Comunicar com voluntários | US55 - Como voluntário, quero ter um canal de comunicação eficaz com os organizadores e outros voluntários para tirar dúvidas e receber atualizações importantes. |
| RF56 - Consultar horas trabalhadas | US56 - Como voluntário, quero poder confirmar minhas horas trabalhadas através da plataforma para ter um registro da minha contribuição. |
| RF57 - Acessar painel de informações | US57 - Como voluntário, quero ter acesso a um painel com todas as informações sobre minha participação, incluindo minhas tarefas específicas, horários e a quem devo me reportar. |
| RF58 - Gerar certificado digital | US58 - Como voluntário, quero receber um certificado digital de participação após o evento como forma de reconhecimento pelo meu esforfo. |

---

## Persona Organizador-Patrocinador

<img width="861" height="700" alt="image" src="https://github.com/user-attachments/assets/76a6a222-0e68-40b3-96f1-9907676cb237" />

| Requisito Funcional | User Story |
|---|---|
| RF59 - Chat de comunicação | US59 - Como Patrocinador e Organizador, quero ter um canal de chat comum e dedicado dentro da plataforma para podermos manter uma comunicação constante e direta, garantindo que todos os alinhamentos sejam mantidos e registrados em um só lugar. |

---

## Persona Organizador-Fornecedor

<img width="490" height="346" alt="image" src="https://github.com/user-attachments/assets/c08c1e2f-ee66-47c9-8078-f1a76cbf887b" />

| Requisito Funcional | User Story |
|---|---|
| RF60 - Chat de comunicação | US60 - Como Fornecedor e Organizador, quero ter um canal de comunicação direto e compartilhado dentro da plataforma para que possamos negociar preços e condições de forma eficiente e manter todas as conversas e acordos devidamente registrados. |

---

### **Estratégia de Priorização de Funcionalidades: Abordagem das Releases**

Para definir a ordem de implementação das funcionalidades na plataforma "ComunEventos", utilizamos uma estratégia de priorização baseada na **entrega incremental de valor**, focando em garantir que as funcionalidades mais críticas para a jornada do usuário e para os objetivos de negócio fossem entregues nas primeiras iterações.

Nossa abordagem priorizou as funcionalidades agrupando-as em **três releases distintas**, cada uma representando um estágio evolutivo do produto e com cores designadas para fácil identificação:

#### **Release 1 (R1 - Azul): Fundamentação e Lançamento Básico**

* **Foco:** Esta release concentra as **funcionalidades essenciais (Must Have)** que formam o Produto Mínimo Viável (MVP) para cada persona. São as capacidades sem as quais o produto não pode operar ou não entrega seu valor fundamental inicial.
* **Critério de Inclusão:** Funcionalidades que permitem ao usuário iniciar e completar o ciclo principal de suas atividades na plataforma, resolvendo as dores mais urgentes e estabelecendo a base do sistema. Inclui a capacidade de descoberta, inscrição, criação de eventos (para o organizador) e as bases de comunicação essenciais (como o chat interno).
* **Exemplos de Tipos de Funcionalidades:** Criação de perfil, busca e visualização de eventos/vagas/oportunidades, inscrição/candidatura, criação básica de eventos, e funcionalidades de comunicação diretas entre os usuários.

#### **Release 2 (R2 - Vermelha): Operacionalização e Engajamento Contínuo**

* **Foco:** Esta release incorpora as **funcionalidades importantes (Should Have)** que aprimoram a eficiência e a experiência do usuário, construindo sobre a base estabelecida na R1.
* **Critério de Inclusão:** Funcionalidades que otimizam os processos existentes, facilitam a gestão de detalhes, aumentam o engajamento e preparam o usuário para a fase de execução/participação no evento. Embora não sejam estritamente críticas para o lançamento inicial, agregam valor significativo e tornam a experiência mais robusta.
* **Exemplos de Tipos de Funcionalidades:** Gerenciamento de pagamentos, acompanhamento de status de candidaturas/propostas, acesso a materiais de treinamento, e ferramentas para facilitar a execução das atividades durante o evento.

#### **Release 3 (R3 - Verde): Análise, Feedback e Reconhecimento**

* **Foco:** Esta release abrange as **funcionalidades desejáveis (Could Have)** que oferecem valor adicional, insights e um diferencial competitivo, visando a melhoria contínua e o reconhecimento.
* **Critério de Inclusão:** Funcionalidades que são implementadas após as capacidades operacionais básicas estarem consolidadas. Elas permitem a coleta de feedback detalhado, a análise de desempenho, a geração de relatórios e o reconhecimento das contribuições dos usuários, fechando o ciclo de valor e informando futuras iterações.
* **Exemplos de Tipos de Funcionalidades:** Pesquisas de satisfação, relatórios de impacto de patrocínio, visualização de avaliações, registro de horas de voluntariado e geração de certificados.

---




