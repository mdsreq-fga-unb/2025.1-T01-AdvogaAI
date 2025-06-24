export enum EstadoCivil {
  SOLTEIRO = 'SOLTEIRO',
  CASADO = 'CASADO',
  DIVORCIADO = 'DIVORCIADO',
  VIUVO = 'VIUVO',
  UNIAO_ESTAVEL = 'UNIAO_ESTAVEL',
}

export interface UpdateAddressDto {
  id: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
}

export interface UpdatePessoaFisicaDto {
  nomeCompleto?: string;
  cpf?: string;
  rg?: string;
  ctps?: string;
  nacionalidade?: string;
  email?: string;
  telefone?: string;
  estadoCivil?: EstadoCivil;
  profissao?: string;
  endereco?: UpdateAddressDto;
  empresasRepresentadasIds?: string[];
}

export interface UpdatePessoaFisicaResponseType {
  message: string;
  statusCode: number;
}

export async function updatePessoaFisica(
  id: string,
  data: UpdatePessoaFisicaDto,
): Promise<UpdatePessoaFisicaResponseType> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/clients/pessoa-fisica/${id}`;

    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    const responseData =
      (await response.json()) as UpdatePessoaFisicaResponseType;

    if (!response.ok) {
      const errorMessage =
        responseData.message || 'Falha ao atualizar dados da pessoa física.';
      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Ocorreu um erro desconhecido.');
  }
}
