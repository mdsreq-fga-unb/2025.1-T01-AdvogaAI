interface RecoverPasswordResponse {
  message: string;
  statusCode: number;
}

export async function recoverPassword(
  password: string,
  confirmPassword: string,
  token: string,
): Promise<RecoverPasswordResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/email/recover-password?token=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, confirmPassword }),
      },
    );

    if (!response.ok) {
      const errorData = (await response.json()) as RecoverPasswordResponse;
      throw new Error(errorData.message ?? 'Falha ao alterar a senha.');
    }

    return (await response.json()) as RecoverPasswordResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Ocorreu um erro desconhecido.');
    } else {
      throw new Error('Ocorreu um erro desconhecido.');
    }
  }
}
