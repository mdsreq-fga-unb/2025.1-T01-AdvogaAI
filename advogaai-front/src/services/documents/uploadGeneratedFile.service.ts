interface UploadFileResponse {
  message: string;
  statusCode: number;
}

export async function uploadGeneratedFile(
  file: File | Blob,
  fileName: string,
): Promise<UploadFileResponse> {
  const formData = new FormData();

  formData.append('documento', file);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/upload-generated-model/${fileName}`,
      {
        method: 'POST',
        credentials: 'include',
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = (await response
        .json()
        .catch(() => null)) as UploadFileResponse;
      throw new Error(
        errorData?.message || 'Falha ao fazer o upload do arquivo.',
      );
    }

    const result = (await response.json()) as UploadFileResponse;

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Ocorreu um erro desconhecido durante o upload.');
    }
  }
}
