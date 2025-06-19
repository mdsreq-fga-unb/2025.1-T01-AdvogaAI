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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { z } from 'zod';
import { recoverPassword } from '../../../services/email/recover-password.service';

export default function ConfirmEmail() {
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
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
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
        setMessage('Um erro desconhecido ocorreu!');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingPasswordChange(false);
    }
  }

  useEffect(() => {
    const urltoken = searchParams.get('token');
    setToken(urltoken ?? '');
  }, [searchParams]);
  return (
    <div className="bg-blue-charcoal-950 h-screen w-screen flex justify-center items-center">
      <div className="bg-blue-50 w-fit h-fit p-10 rounded-lg gap-8 flex flex-col justify-center items-center">
        <div className="flex justify-center items-center">
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void form.handleSubmit(onSubmit)(e);
              }}
              className="w-full space-y-6 text-blue-charcoal-900 flex flex-col"
            >
              <div className="flex flex-col gap-6">
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
                          <Button
                            type="button"
                            onClick={() => setIsPasswordVisible((v) => !v)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-xl text-alabaster-400 bg-blue-50 cursor-pointer"
                          >
                            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                          </Button>
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
                        Digite sua senha novamente
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="h-11 pr-12"
                            type={
                              isConfirmPasswordVisible ? 'text' : 'password'
                            }
                            placeholder="••••••••"
                            {...field}
                          />
                          <Button
                            type="button"
                            onClick={() =>
                              setIsConfirmPasswordVisible((v) => !v)
                            }
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-xl text-alabaster-400 bg-blue-50 hover:text-alabaster-300 cursor-pointer"
                          >
                            {isConfirmPasswordVisible ? (
                              <FaEyeSlash />
                            ) : (
                              <FaEye />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {message && <p className="text-red-700">{message}</p>}
              <Button
                className="bg-blue-charcoal-700 py-6 px-8 self-start text-base duration-300 hover:bg-blue-charcoal-600 cursor-pointer flex items-center justify-center"
                type="submit"
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
    </div>
  );
}
