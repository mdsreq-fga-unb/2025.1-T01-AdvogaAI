interface UserDataResponse {
  message: string;
  phone: string | null;
  name: string;
  email: string;
  oab: string | null;
}

export async function getUserData(): Promise<UserDataResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/data`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorData = (await response.json()) as UserDataResponse;
      throw new Error(
        errorData.message ?? 'Falha ao carregar dados do usuario.',
      );
    }

    return (await response.json()) as UserDataResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Ocorreu um erro desconhecido.');
    } else {
      throw new Error('Ocorreu um erro desconhecido.');
    }
  }
}
