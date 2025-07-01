export async function downloadFile(url: string): Promise<{ blob: Blob }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/url-download`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ url }),
      },
    );
    if (!response.ok) {
      throw new Error('Falha ao baixar o arquivo.');
    }
    const blob = await response.blob();

    return { blob };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Ocorreu um erro desconhecido.');
    } else {
      throw new Error('Ocorreu um erro desconhecido.');
    }
  }
}
