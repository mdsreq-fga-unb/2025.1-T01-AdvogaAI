

## Requisitos Funcionais (RF)

| Código | Descrição                                                                                                                                                                                                           |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RF01   | O usuário ADVOGADO deve poder gerar automaticamente documentos jurídicos (contratos, procurações, petições), a partir de modelos predefinidos, com preenchimento dinâmico de campos a partir dos dados cadastrados. |
| RF02   | O usuário ADVOGADO deve poder cadastrar, editar e excluir modelos personalizados de documentos, definindo variáveis que se conectem aos dados dos clientes.                                                         |
| RF03   | O usuário ADVOGADO deve poder cadastrar manualmente novos clientes, informando nome completo, CPF/CNPJ, endereço, telefone, e-mail e demais dados relevantes.                                                       |
| RF04   | O usuário ADVOGADO deve poder editar os dados cadastrais de clientes previamente cadastrados, atualizando informações que alimentam a geração de documentos.                                                        |
| RF05   | O usuário ADVOGADO deve poder excluir registros de clientes, solicitando confirmação prévia e mantendo a integridade de documentos já gerados.                                                                      |
| RF06   | O usuário ADVOGADO deve poder visualizar e buscar clientes cadastrados, aplicando filtros por nome, CPF/CNPJ e outros atributos relevantes.                                                                         |
| RF07   | O usuário ADVOGADO deve poder exportar os documentos gerados em formato .pdf.                                                                                                                                       |
| RF08   | O usuário ADVOGADO deve poder listar documentos gerados, buscando por título ou conteúdo, e filtrando por cliente, tipo de documento, status e intervalo de datas.                                                  |
| RF09   | O sistema deve autenticar-se na API do PJe (via OAuth2) antes de efetuar chamadas.                                                                                                                                  |
| RF10   | O sistema deve validar e renovar automaticamente o token de acesso à API do PJe antes do seu vencimento.                                                                                                            |
| RF11   | O usuário ADVOGADO deve poder buscar todos os processos vinculados ao seu número de OAB.                                                                                                                            |
| RF12   | O usuário ADVOGADO deve poder buscar um processo específico pelo número do processo.                                                                                                                                |
| RF13   | O usuário ADVOGADO deve poder listar todos os documentos vinculados a um processo específico.                                                                                                                       |
| RF14   | O usuário ADVOGADO deve receber notificações por e-mail sempre que houver movimentação em qualquer processo que acompanha.                                                                                          |
| RF15   | O usuário ADVOGADO deve poder registrar honorários contratuais, especificando valores e condições de pagamento.                                                                                                     |
| RF16   | O usuário ADVOGADO deve poder registrar honorários de êxito vinculados a processos específicos.                                                                                                                     |
| RF17   | O usuário ADVOGADO deve poder controlar o pagamento de parcelas (datas, valores), confirmando ou negando o recebimento e anexando comprovantes.                                                                     |
| RF18   | O usuário ADVOGADO deve poder visualizar parcelas vencidas e parcelas a vencer.                                                                                                                                     |
| RF19   | O usuário ADVOGADO deve poder visualizar o histórico de pagamentos por cliente, com status (paga, pendente, atrasada) e valores correspondentes.                                                                    |
| RF20   | O usuário ADVOGADO deve poder gerar relatório financeiro detalhado por cliente, por processo ou por período.                                                                                                        |
| RF21   | O usuário ADVOGADO deve poder editar ou excluir registros de pagamento que ainda não tenham sido confirmados.                                                                                                       |
| RF22   | O sistema deve categorizar automaticamente pagamentos em “entrada”, “êxito” ou outras categorias configuráveis.                                                                                                     |
| RF23   | O usuário ADVOGADO deve poder gerar links de pagamento que redirecionem o CLIENTE ao gateway de pagamentos.                                                                                                         |
| RF24   | O usuário CLIENTE deve poder acessar o link de pagamento e efetuar a quitação via gateway.                                                                                                                          |
| RF25   | O sistema deve registrar automaticamente o pagamento como concluído ao receber confirmação do gateway.                                                                                                              |
| RF26   | O sistema deve permitir o cancelamento ou reemissão de links de pagamento expirados ou recusados.                                                                                                                   |
| RF27   | O sistema deve atualizar automaticamente todas as parcelas após pagamento parcelado via gateway.                                                                                                                    |

---

## Requisitos Não Funcionais (RNF)

| Código | Descrição                                                                                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| RNF01  | A plataforma deve garantir a segurança e conformidade com a LGPD, incluindo criptografia de dados e controle de acesso.                  |
| RNF02  | A interface deve ser intuitiva e acessível, permitindo o uso eficiente por advogados com diferentes níveis de familiaridade tecnológica. |
| RNF03  | A aplicação deve ser compatível com os principais navegadores e dispositivos (desktop, tablet, smartphone).                              |
| RNF04  | A arquitetura deve ser modular, facilitando manutenção e atualizações contínuas.                                                         |
| RNF05  | O sistema deve suportar até 3 tentativas automáticas em falhas de comunicação com a API do PJe.                                          |
| RNF06  | O sistema deve retomar polling de processos após interrupções sem perda de dados.                                                        |
| RNF07  | Todas as chamadas devem ocorrer via HTTPS, com armazenamento criptografado de credenciais e logging com mascaramento de dados sensíveis. |
| RNF08  | O módulo de integração PJe deve ter cobertura de testes automatizados ≥ 80%.                                                             |
| RNF09  | Erros da integração devem ser apresentados ao usuário em Português, com código e mensagem da API.                                        |
| RNF10  | O sistema deve permitir configuração de endpoint e credenciais sem necessidade de novo deploy.                                           |
| RNF11  | A aplicação deve seguir o padrão RESTful em todas as integrações (URLs, verbos HTTP, versionamento e formatos JSON).                     |
| RNF12  | O sistema deve garantir 100 % de consistência nos registros de pagamento.                                                                |
| RNF13  | Histórico de transações e documentos deve permanecer disponível após reinicializações ou falhas.                                         |
| RNF14  | A integração com o gateway de pagamento deve ser fácil de manter e atualizar.                                                            |
| RNF15  | A aplicação de pagamentos deve seguir o padrão RESTful nas APIs utilizadas.                                                              |
