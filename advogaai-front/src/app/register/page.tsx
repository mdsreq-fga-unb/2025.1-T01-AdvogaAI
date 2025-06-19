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
import registerUser from '../../../services/auth/registerUser';
import { resendConfirmEmail } from '../../../services/email/resend-confirm-email.service';

export default function Register() {
  const router = useRouter();
  const [isLoadingRegister, setIsLoadingRegister] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [isConfirmEmailSent, setIsConfirmEmailSent] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const FormSchema = z
    .object({
      name: z.string().min(1, { message: 'Digite seu nome' }),
      email: z.string().email({ message: 'Digite um e-mail válido' }),
      password: z
        .string()
        .min(8, { message: 'A senha deve ter ao menos 8 caracteres' })
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
          message:
            'A senha deve conter pelo menos uma letra maiúscula, um número e um símbolo',
        }),
      confirmPassword: z
        .string()
        .min(8, { message: 'A senha deve ter ao menos 8 caracteres' })
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
          message:
            'A senha deve conter pelo menos uma letra maiúscula, um número e um símbolo',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'As senhas não coincidem',
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoadingRegister(true);
      // Aqui você chamaria sua função de registro, por enquanto chamamos loginAuth como exemplo
      const response = await registerUser(
        data.email.toLowerCase(),
        data.name,
        data.password,
        data.confirmPassword,
      );
      if (response && response.statusCode === 200) {
        setEmailSent(data.email);
        setIsConfirmEmailSent(true);
        return;
      } else {
        setMessage(response?.message ?? 'Um erro não conhecido aconteceu');
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingRegister(false);
    }
  }

  async function handleResendEmail() {
    try {
      setIsLoadingRegister(true);
      await resendConfirmEmail(emailSent);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingRegister(false);
    }
  }

  return (
    <div className="grid md:flex h-screen">
      <div className="bg-blue-charcoal-950 flex w-full justify-center items-center">
        {!isConfirmEmailSent && (
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void form.handleSubmit(onSubmit)(e);
              }}
              className="w-2/3 space-y-6 text-white flex flex-col"
            >
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Nome</FormLabel>
                      <FormControl>
                        <Input
                          className="h-11"
                          type="text"
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          placeholder="johndoe@gmail.com"
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
                            className="h-11 pr-12"
                            type={isPasswordVisible ? 'text' : 'password'}
                            placeholder="••••••••"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setIsPasswordVisible((v) => !v)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-xl text-alabaster-400 hover:text-alabaster-300 cursor-pointer"
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
                        Confirme sua senha
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="h-11 pr-12"
                            type={isConfirmVisible ? 'text' : 'password'}
                            placeholder="••••••••"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setIsConfirmVisible((v) => !v)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-xl text-alabaster-400 hover:text-alabaster-300 cursor-pointer"
                          >
                            {isConfirmVisible ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {message && (
                  <p className="text-red-500 text-sm text-center">{message}</p>
                )}
              </div>

              <Button
                className="bg-blue-charcoal-700 py-6 px-8 self-start text-base duration-300 hover:bg-blue-charcoal-600 cursor-pointer flex items-center justify-center"
                type="submit"
                disabled={isLoadingRegister}
              >
                {isLoadingRegister ? (
                  <div className="border-4 h-5 w-5 border-t-transparent border-white rounded-full animate-spin" />
                ) : (
                  'Registrar'
                )}
              </Button>
            </form>
          </Form>
        )}
        {isConfirmEmailSent && (
          <div className="flex flex-col justify-center items-center gap-6">
            <p className="text-white text-lg flex text-center">
              Enviamos um email de confirmação para {emailSent}.<br></br> Por
              favor, clique no link enviado para ativar sua conta e começar a
              usar a plataforma.
            </p>
            <Button
              disabled={isLoadingRegister}
              className="bg-blue-charcoal-900 p-7 text-base duration-300 hover:bg-blue-charcoal-800 cursor-pointer"
              onClick={() => {
                void handleResendEmail();
              }}
            >
              Enviar e-mail novamente
            </Button>
          </div>
        )}
      </div>

      <div className="bg-blue-50 justify-center w-full items-center flex flex-col gap-14">
        <p className="text-alabaster-600 text-2xl text-center font-['Satoshi',sans-serif] font-extrabold">
          Entre para gerenciar seu escritório de
          <br /> advocacia com muito mais velocidade
        </p>
        <Button
          disabled={isLoadingRegister}
          className="bg-blue-charcoal-900 p-7 text-base duration-300 hover:bg-blue-charcoal-800 cursor-pointer"
          onClick={() => router.push('/login')}
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
