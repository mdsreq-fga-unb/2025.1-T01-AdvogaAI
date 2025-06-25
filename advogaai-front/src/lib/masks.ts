/**
 * Aplica a máscara de CPF (000.000.000-00) a uma string.
 * @param value A string de CPF (pode conter ou não a formatação).
 * @returns A string de CPF formatada.
 */
export const maskCPF = (value: string) => {
  if (!value) return '';
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o sexto e o sétimo dígitos
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca um hífen entre o nono e o décimo dígitos
    .slice(0, 14); // Limita o tamanho máximo
};

/**
 * Aplica a máscara de Telefone ((00) 00000-0000) a uma string.
 * @param value A string de telefone (pode conter ou não a formatação).
 * @returns A string de telefone formatada.
 */
export const maskTelefone = (value: string) => {
  if (!value) return '';
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/(\d{2})(\d)/, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos
    .replace(/(\d{5})(\d{4})$/, '$1-$2') // Coloca hífen entre o quinto e o sexto dígitos (para celulares com 9 dígitos)
    .slice(0, 15); // Limita o tamanho máximo
};

/**
 * Aplica a máscara de CEP (00000-000) a uma string.
 * @param value A string de CEP (pode conter ou não a formatação).
 * @returns A string de CEP formatada.
 */
export const maskCEP = (value: string) => {
  if (!value) return '';
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/(\d{5})(\d)/, '$1-$2') // Coloca hífen depois do quinto dígito
    .slice(0, 9); // Limita o tamanho máximo
};
