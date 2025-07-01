import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// 1. A classe que contém a lógica de validação
@ValidatorConstraint({ async: false })
export class IsOabConstraint implements ValidatorConstraintInterface {
  validate(oab: any) {
    if (typeof oab !== 'string') {
      return false;
    }
    // Expressão Regular para validar o formato: 2 letras de UF seguidas por 1 a 6 números.
    // Ex: SP123456, RJ123, DF12345
    const oabRegex = /^[A-Z]{2}\d{1,6}$/i;
    return oabRegex.test(oab);
  }

  defaultMessage() {
    return 'Formato de OAB inválido. O formato esperado é XX123456 (ex: SP123456).';
  }
}

// 2. O Decorator que você usará nos seus DTOs
export function IsOAB(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsOabConstraint, // Conecta o decorator com a lógica de validação
    });
  };
}
