/* eslint-disable @typescript-eslint/no-unsafe-assignment */
interface VerifyTokenResponse {
  message: string;
  statusCode: number;
  user: {
    isActive: boolean;
    name: string;
    email: string;
    role: string;
  };
}

export default async function verifyToken(
  token: string | undefined,
): Promise<VerifyTokenResponse | undefined> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${API_BASE_URL}/users/validate-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    const data: VerifyTokenResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
