/* eslint-disable @typescript-eslint/no-unsafe-assignment */
interface RegisterUserResponse {
  message: string;
  statusCode: number;
}
export default async function registerUser(
  email: string,
  name: string,
  password: string,
  confirmPassword: string,
): Promise<RegisterUserResponse | undefined> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
    });

    const data: RegisterUserResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
