import nookies from 'nookies';

export enum EstadoCivil {
  SOLTEIRO = 'SOLTEIRO',
  CASADO = 'CASADO',
  DIVORCIADO = 'DIVORCIADO',
  VIUVO = 'VIUVO',
  UNIAO_ESTAVEL = 'UNIAO_ESTAVEL',
}

export interface PessoaFisicaType {
  nomeCompleto?: string;
  cpf?: string;
  rg?: string;
  ctps?: string;
  nacionalidade?: string;
  email?: string;
  telefone?: string;
  estadoCivil?: EstadoCivil;
  profissao?: string;
  endereco?: string;
  empresasRepresentadasIds?: string[];
  idPessoaFisica: string;
}

export interface UpdatePessoaFisicaResponseType {
  message: string;
  statusCode: number;
}

export async function updatePessoaFisica(
  payload: PessoaFisicaType,
): Promise<UpdatePessoaFisicaResponseType> {
  try {
    const cookies = nookies.get();
    const token = cookies.authToken;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/clients/pessoa-fisica`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorData =
        (await response.json()) as UpdatePessoaFisicaResponseType;
      throw new Error(
        errorData.message ?? 'Falha ao atualizar dados da pessoa física.',
      );
    }

    return (await response.json()) as UpdatePessoaFisicaResponseType;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Repassa o erro já tratado ou um erro genérico
      throw new Error(error.message || 'Ocorreu um erro desconhecido.');
    } else {
      throw new Error('Ocorreu um erro desconhecido.');
    }
  }
}
