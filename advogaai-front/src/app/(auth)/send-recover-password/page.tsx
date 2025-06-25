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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { recoverPasswordRequest } from '../../../services/email/recover-password-request.service';

export default function RecoverPassword() {
  const [isLoadingRecover, setIsLoadingRecover] = useState<boolean>(false);
  const [isRecoverLoaded, setIsRecoverLoaded] = useState<boolean>(false);

  const FormSchema = z.object({
    email: z.string().email({ message: 'Digite um e-mail válido' }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoadingRecover(true);
      await recoverPasswordRequest(data.email);
      setIsLoadingRecover(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingRecover(false);
      setIsRecoverLoaded(true);
    }
  }
  return (
    <div className="bg-blue-charcoal-950 flex justify-center items-center h-screen w-screen">
      <div className="bg-blue-50 p-10 w-[400px] rounded-lg">
        {!isRecoverLoaded && (
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void form.handleSubmit(onSubmit)(e);
              }}
              className="w-full space-y-4 gap-4 text-blue-charcoal-900 flex flex-col"
            >
              <h1 className="text-center font-bold text-lg text-blue-charcoal-900">
                Recuperação de senha
              </h1>
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
              </div>
              <p>Digite o e-mail da sua conta para recuperar a senha!</p>

              <Button
                className="bg-blue-charcoal-700 py-6 px-8 self-start text-base duration-300 hover:bg-blue-charcoal-600 cursor-pointer"
                type="submit"
                disabled={isLoadingRecover}
              >
                {isLoadingRecover ? (
                  <div className="border-4 h-5 w-5 border-t-transparent border-white rounded-full animate-spin" />
                ) : (
                  'Recuperar senha'
                )}
              </Button>
            </form>
          </Form>
        )}
        {isRecoverLoaded && (
          <p className="text-center text-blue-charcoal-900 font-bold">
            Enviamos um link de recuperação de senha no seu e-mail!
          </p>
        )}
      </div>
    </div>
  );
}
