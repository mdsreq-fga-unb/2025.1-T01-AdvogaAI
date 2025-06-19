'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react'; // Importa o Suspense
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { z } from 'zod';
import { recoverPassword } from '../../../services/email/recover-password.service';

function RecoverPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoadingPasswordChange, setIsLoadingPasswordChange] =
    useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const FormSchema = z
    .object({
      password: z
        .string()
        .min(8, { message: 'A senha deve ter ao menos 8 caracteres' })
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
          message:
            'A senha deve conter pelo menos uma letra maiúscula, um número e um símbolo',
        }),
      confirmPassword: z
        .string()
        .min(8, { message: 'A senha deve ter ao menos 8 caracteres' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'As senhas não coincidem',
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!token) {
      setMessage(
        'Token de recuperação não encontrado. Por favor, solicite um novo link.',
      );
      return;
    }
    try {
      setIsLoadingPasswordChange(true);
      const response = await recoverPassword(
        data.password,
        data.confirmPassword,
        token,
      );
      if (response.statusCode === 200) {
        router.push('/login');
        return;
      } else {
        setMessage(response.message || 'Um erro desconhecido ocorreu!');
      }
    } catch (error) {
      console.error(error);
      setMessage('Ocorreu um erro ao tentar redefinir a senha.');
    } finally {
      setIsLoadingPasswordChange(false);
    }
  }

  useEffect(() => {
    const urlToken = searchParams.get('token');
    setToken(urlToken ?? '');
  }, [searchParams]);

  return (
    <div className="bg-blue-charcoal-950 h-screen w-screen flex justify-center items-center">
      <div className="bg-blue-50 w-fit h-fit p-10 rounded-lg gap-8 flex flex-col justify-center items-center">
        <Form {...form}>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={form.handleSubmit(onSubmit)} // Maneira simplificada de usar react-hook-form
            className="w-[400px] space-y-6 text-blue-charcoal-900 flex flex-col"
          >
            <h1 className="text-2xl font-bold text-center">Redefinir Senha</h1>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Nova Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="h-11 pr-12"
                          type={isPasswordVisible ? 'text' : 'password'}
                          placeholder="••••••••"
                          {...field}
                        />
                        <button // Usar <button> é semanticamente melhor
                          type="button"
                          onClick={() => setIsPasswordVisible((v) => !v)}
                          className="absolute inset-y-0 right-0 flex items-center bg-transparent border-none px-3 text-xl text-gray-500 cursor-pointer"
                        >
                          {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Digite sua nova senha novamente
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="h-11 pr-12"
                          type={isConfirmPasswordVisible ? 'text' : 'password'}
                          placeholder="••••••••"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setIsConfirmPasswordVisible((v) => !v)}
                          className="absolute inset-y-0 right-0 flex items-center bg-transparent border-none px-3 text-xl text-gray-500 cursor-pointer"
                        >
                          {isConfirmPasswordVisible ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {message && <p className="text-red-600 text-center">{message}</p>}
            <Button
              className="bg-blue-charcoal-700 py-6 px-8 self-center text-base duration-300 hover:bg-blue-charcoal-600 cursor-pointer flex items-center justify-center min-w-[220px]"
              type="submit"
              disabled={isLoadingPasswordChange}
            >
              {isLoadingPasswordChange ? (
                <div className="border-4 h-5 w-5 border-t-transparent border-white rounded-full animate-spin" />
              ) : (
                'Redefinir minha senha'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

// Componente da página que usa Suspense para aguardar o formulário
export default function RecoverPasswordPage() {
  return (
    <Suspense
      fallback={
        // Fallback que ocupa a tela inteira com um spinner centralizado
        <div className="bg-blue-charcoal-950 h-screen w-screen flex justify-center items-center">
          <div className="h-12 w-12 rounded-full border-4 border-gray-400 border-l-blue-500 animate-spin"></div>
          <span className="sr-only">Carregando...</span>
        </div>
      }
    >
      <RecoverPasswordForm />
    </Suspense>
  );
}
