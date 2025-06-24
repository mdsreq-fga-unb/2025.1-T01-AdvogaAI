import { CreatePessoaFisicaDto } from '@/app/dashboard/client/create-client-sidebar';
import { PessoaFisica } from '../../types/client';

export async function createPessoaFisica(pessoaFisica: CreatePessoaFisicaDto) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiUrl = `${API_BASE_URL}/clients/pessoa-fisica`;
  const newClient = {
    pessoaFisica: pessoaFisica,
  };
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClient),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData: unknown = await response.json();
      const message =
        typeof errorData === 'object' &&
        errorData !== null &&
        'message' in errorData &&
        typeof (errorData as { message?: unknown }).message === 'string'
          ? (errorData as { message: string }).message
          : 'Falha ao criar cliente.';
      throw new Error(message);
    }
    return (await response.json()) as PessoaFisica;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Ocorreu um erro ao criar o cliente.');
    }
    throw new Error('Ocorreu um erro desconhecido ao criar o cliente.');
  }
}

// /**
//  * Creates a new juridical person client (Pessoa Jurídica).
//  *
//  * @param clientData - The data for the new juridical client and its representative.
//  * @param token - The JWT authentication token.
//  * @returns A promise that resolves to the created client data.
//  */
// export async function createPessoaJuridica(
//   clientData: RegisterJuridicalClientDto,
//   token: string,
// ): Promise<any> {
//   // Adjust the return type to match your backend response
//   const apiUrl = `${API_BASE_URL}/clients/pessoa-juridica`;

//   try {
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(clientData),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Falha ao criar cliente jurídico.');
//     }

//     return await response.json();
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error(
//         error.message || 'Ocorreu um erro ao criar o cliente jurídico.',
//       );
//     }
//     throw new Error(
//       'Ocorreu um erro desconhecido ao criar o cliente jurídico.',
//     );
//   }
// }
