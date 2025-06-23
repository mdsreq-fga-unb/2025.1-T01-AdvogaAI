import nookies from 'nookies';
export async function deletePessoaFisica(id: string): Promise<void> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiUrl = `${API_BASE_URL}/clients/pessoa-fisica/${id}`;
  const token = nookies.get().authToken;

  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData: unknown = await response.json();
      const message =
        typeof errorData === 'object' &&
        errorData !== null &&
        'message' in errorData &&
        typeof (errorData as { message?: unknown }).message === 'string'
          ? (errorData as { message: string }).message
          : 'Falha ao excluir cliente.';
      throw new Error(message);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Ocorreu um erro ao excluir o cliente.');
    }
    throw new Error('Ocorreu um erro desconhecido ao excluir o cliente.');
  }
}
