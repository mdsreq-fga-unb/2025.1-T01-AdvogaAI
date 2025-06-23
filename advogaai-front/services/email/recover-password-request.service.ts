interface RecoverPasswordRequestResponse {
  message: string;
  statusCode: number;
}

export async function recoverPasswordRequest(
  email: string,
): Promise<RecoverPasswordRequestResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/email/recover-password-request?email=${email}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorData =
        (await response.json()) as RecoverPasswordRequestResponse;
      throw new Error(errorData.message ?? 'Falha ao recuperar senha.');
    }

    return (await response.json()) as RecoverPasswordRequestResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Ocorreu um erro desconhecido.');
    } else {
      throw new Error('Ocorreu um erro desconhecido.');
    }
  }
}
