interface ConfirmEmailResponse {
  message: string;
  statusCode: number;
}

export async function confirmEmail(
  token: string,
): Promise<ConfirmEmailResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/email/confirm-email?token=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorData = (await response.json()) as ConfirmEmailResponse;
      throw new Error(errorData.message ?? 'Falha ao confirmar e-mail.');
    }

    return (await response.json()) as ConfirmEmailResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Ocorreu um erro desconhecido.');
    } else {
      throw new Error('Ocorreu um erro desconhecido.');
    }
  }
}
