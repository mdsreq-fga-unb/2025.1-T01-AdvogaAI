interface UpdateDataResponse {
  message: string;
  phone: string | null;
  name: string;
  email: string;
  oab: string | null;
}

export async function updateUserData(data: {
  name: string | null;
  oab: string | null;
  phone: string | null;
}): Promise<UpdateDataResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/data`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const errorData = (await response.json()) as UpdateDataResponse;
      throw new Error(
        errorData.message ?? 'Falha ao atualizar dados do usuario.',
      );
    }

    return (await response.json()) as UpdateDataResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Ocorreu um erro desconhecido.');
    } else {
      throw new Error('Ocorreu um erro desconhecido.');
    }
  }
}
