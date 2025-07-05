interface UserDashboardDataResponse {
  clientes: number;
  docsGerados: number;
}

export async function getUserDashboardData(): Promise<UserDashboardDataResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/dashboard-data`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );

    if (!response.ok) {
      throw new Error('Falha ao carregar dados do dashboard do usuario.');
    }

    return (await response.json()) as UserDashboardDataResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Ocorreu um erro desconhecido.');
    } else {
      throw new Error('Ocorreu um erro desconhecido.');
    }
  }
}
