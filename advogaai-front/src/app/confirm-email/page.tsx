'use client';

import { Button } from '@/components/ui/button';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react'; // Importa o Suspense
import { confirmEmail } from '../../../services/email/confirm-email.service';

function ConfirmEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isConfirmingEmail, setIsConfirmingEmail] = useState<boolean>(true);
  const [message, setMessage] = useState<string>(
    'Confirmando seu e-mail, por favor aguarde!',
  );

  async function handleConfirmEmail(token: string) {
    try {
      const response = await confirmEmail(token);
      if (response.statusCode === 200) {
        setMessage(response.message);
      } else {
        setMessage(
          response.message || 'Ocorreu um erro ao validar seu e-mail.',
        );
      }
    } catch (error) {
      console.error(error);
      setMessage('Ocorreu um erro. Verifique o console para mais detalhes.');
    } finally {
      setIsConfirmingEmail(false);
    }
  }

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      void handleConfirmEmail(token);
    } else {
      setMessage('Token de confirmação não encontrado na URL.');
      setIsConfirmingEmail(false);
    }
    // Adicionamos router à dependência se ele for usado dentro do useEffect
  }, [searchParams]);

  return (
    <div className="bg-blue-charcoal-950 h-screen w-screen flex justify-center items-center">
      <div className="bg-blue-50 w-[500px] h-[250px] rounded-lg gap-8 flex flex-col justify-center items-center p-6 text-center">
        <div className="flex justify-center items-center">
          <h1 className="text-lg font-bold text-blue-charcoal-900">
            {message}
          </h1>
        </div>
        {isConfirmingEmail && (
          <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-l-blue-600 animate-spin"></div>
        )}
        <Button
          disabled={isConfirmingEmail}
          className="bg-blue-charcoal-900 px-7 py-5 text-base duration-300 hover:bg-blue-charcoal-800 cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={() => router.push('/login')}
        >
          Ir para tela de login
        </Button>
      </div>
    </div>
  );
}

// Componente da página que usa Suspense para aguardar o componente acima
export default function ConfirmEmailPage() {
  // O Suspense fornece uma UI de fallback enquanto o ConfirmEmailContent,
  // que depende do `useSearchParams`, está "suspenso" (aguardando para rodar no cliente).
  return (
    <Suspense
      fallback={
        <div className="bg-blue-charcoal-950 h-screen w-screen flex justify-center items-center">
          <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-l-blue-600 animate-spin"></div>
        </div>
      }
    >
      <ConfirmEmailContent />
    </Suspense>
  );
}
