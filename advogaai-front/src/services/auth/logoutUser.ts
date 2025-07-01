export default async function logoutUser(): Promise<void> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${API_BASE_URL}/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Erro ao deslogar!');
    }
    location.reload();
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    return;
  } catch (error) {
    console.error(error);
  }
}
