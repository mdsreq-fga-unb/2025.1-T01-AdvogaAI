interface ResendConfirmEmailResponse {
  message: string;
  statusCode: number;
}

export async function resendConfirmEmail(
  email: string,
): Promise<ResendConfirmEmailResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/email/resend-confirm-email?email=${email}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorData = (await response.json()) as ResendConfirmEmailResponse;
      throw new Error(errorData.message ?? 'Falha ao confirmar e-mail.');
    }

    return (await response.json()) as ResendConfirmEmailResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Ocorreu um erro desconhecido.');
    } else {
      throw new Error('Ocorreu um erro desconhecido.');
    }
  }
}
