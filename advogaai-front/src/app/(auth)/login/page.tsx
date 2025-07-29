'use client';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import loginAuth from '../../../services/auth/loginAuth';

export default function Login() {
  const router = useRouter();
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const FormSchema = z.object({
    email: z.string().email({ message: 'Digite um e-mail válido' }),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter ao menos 8 caracteres' })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.~+,;:{}[\]()^<>\-_])[A-Za-z\d@$!%*?&.~+,;:{}[\]()^<>\-_]{8,}$/,
        {
          message:
            'A senha deve conter pelo menos uma letra maiúscula, um número e um símbolo',
        },
      ),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoadingLogin(true);
      const response = await loginAuth(data.email.toLowerCase(), data.password);
      if (response && response.statusCode === 200) {
        localStorage.setItem('userName', response.name);
        localStorage.setItem('userEmail', response.email);
        router.push('/dashboard/clientes');
      } else {
        setIsLoadingLogin(false);
        setMessage(response?.message ?? 'Um erro desconhecido aconteceu');
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="grid md:flex h-screen">
      <div className="bg-blue-charcoal-950 flex w-full justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit(onSubmit)(e);
            }}
            className="w-2/3 space-y-4 text-white flex flex-col"
          >
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">E-mail</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="h-11 pr-12" // espaçamento extra para o botão
                          type={isPasswordVisible ? 'text' : 'password'}
                          placeholder="••••••••"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setIsPasswordVisible((v) => !v)}
                          className="absolute inset-y-0 right-0 flex items-center text-xl pr-3 text-alabaster-400 hover:text-alabaster-300 cursor-pointer"
                        >
                          {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p
                onClickCapture={() => router.push('/send-recover-password')}
                className="italic opacity-70 cursor-pointer w-fit h-fit"
              >
                Esqueci minha senha
              </p>
              <p>{message}</p>
            </div>

            <Button
              className="bg-blue-charcoal-700 py-6 px-8 self-start text-base duration-300 hover:bg-blue-charcoal-600 cursor-pointer"
              type="submit"
              disabled={isLoadingLogin}
            >
              {isLoadingLogin ? (
                <div className="border-4 h-5 w-5 border-t-transparent border-white rounded-full animate-spin" />
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
        </Form>
      </div>

      <div className="bg-blue-50 justify-center w-full items-center flex flex-col gap-14">
        <p className="text-alabaster-600 text-2xl text-center font-satoshi font-extrabold">
          Registre-se para gerenciar seu escritório de <br /> advocacia com
          muito mais velocidade
        </p>
        <Button
          disabled={isLoadingLogin}
          className="bg-blue-charcoal-900 p-7 text-base duration-300 hover:bg-blue-charcoal-800 cursor-pointer"
          onClick={() => router.push('/register')}
        >
          Registre-se
        </Button>
      </div>
    </div>
  );
}
