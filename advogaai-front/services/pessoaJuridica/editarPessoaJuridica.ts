import nookies from 'nookies';

export interface PessoaJuridicaType {
  razaoSocial?: string;
  nomeFantasia?: string;
  cnpj?: string;
  tipoEmpresa?: string;
  email?: string;
  telefone?: string;
  representanteLegalId?: string;
  endereco?: string;
  IdPessoaJuridica: string;
}

export interface UpdatePessoaJuridicaResponseType {
  message: string;
  statusCode: number;
}

export async function updatePessoaJuridica(
  payload: PessoaJuridicaType,
): Promise<UpdatePessoaJuridicaResponseType> {
  try {
    const cookies = nookies.get();
    const token = cookies.authToken;

    if (!token) {
      throw new Error('Token de autenticação não encontrado.');
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/clients/pessoa-juridica`,
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
        (await response.json()) as UpdatePessoaJuridicaResponseType;
      const errorMessage = Array.isArray(errorData.message)
        ? errorData.message.join(', ')
        : errorData.message;
      throw new Error(
        errorMessage || 'Falha ao atualizar dados da pessoa jurídica.',
      );
    }

    const successData =
      (await response.json()) as UpdatePessoaJuridicaResponseType;
    return successData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Ocorreu um erro desconhecido.');
    } else {
      throw new Error('Ocorreu um erro desconhecido durante a atualização.');
    }
  }
}
