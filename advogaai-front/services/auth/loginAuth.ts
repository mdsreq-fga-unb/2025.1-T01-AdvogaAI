interface LoginAuthResponse {
  message: string;
  statusCode: number;
  email: string;
  name: string;
}
export default async function loginAuth(
  email: string,
  password: string,
): Promise<LoginAuthResponse | undefined> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: 'include',
    });

    const data: LoginAuthResponse =
      (await response.json()) as LoginAuthResponse;
    return data;
  } catch (error) {
    console.error(error);
  }
}
