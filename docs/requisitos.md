## Requisitos Funcionais (RF)

| Código | Descrição |
|--------|-----------|
| RF01   | O usuário ADVOGADO deve poder registrar os honorários contratuais, com informações de valores e condições de pagamento. |
| RF02   | O usuário ADVOGADO deve poder registrar honorários de êxito vinculados a processos específicos. |
| RF03   | O usuário ADVOGADO deve poder controlar o pagamento das parcelas, com datas e valores definidos, podendo confirmar ou negar o pagamento e associar um comprovante da parcela paga. |
| RF04   | O usuário ADVOGADO deve poder visualizar as parcelas que estão vencidas e que estão para vencer. |
| RF05   | O usuário ADVOGADO deve poder visualizar o histórico de pagamentos por cliente, com o status de cada parcela (paga, pendente, atrasada) e os respectivos valores. |
| RF06   | O usuário ADVOGADO deve poder gerar um relatório financeiro detalhado por cliente, por processo ou por período. |
| RF07   | O usuário ADVOGADO deve poder editar ou excluir registros de pagamento apenas daqueles que não estiverem confirmados. |
| RF08   | O sistema deve permitir a categorização dos pagamentos entre: entrada, êxito e outros a serem definidos. |
| RF09   | O usuário ADVOGADO deve poder gerar um link de pagamento para um cliente, que o redireciona para um gateway de pagamentos. |
| RF10   | O usuário CLIENTE deve poder acessar um link e realizar o pagamento pelo gateway de pagamentos. |
| RF11   | O sistema deve registrar automaticamente o pagamento como concluído ao receber a confirmação do gateway. |
| RF12   | O sistema deve permitir o cancelamento ou a reemissão de links de pagamento caso expirem ou sejam recusados. |
| RF13   | O sistema deve atualizar automaticamente todas as parcelas após o pagamento parcelado via gateway. |

## Requisitos Não Funcionais (RNF)

| Código | Descrição |
|--------|-----------|
| RNF01  | O sistema deve registrar todos os pagamentos com 100% de garantia de consistência dos dados. |
| RNF02  | O sistema deve disponibilizar o histórico de transações mesmo após reinicializações ou falhas. |
| RNF03  | O sistema deve permitir fácil manutenção e atualização da integração com o gateway de pagamento. |
| RNF04  | A aplicação deve seguir o padrão RESTful para as integrações e APIs utilizadas. |
