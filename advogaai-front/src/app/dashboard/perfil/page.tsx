'use client';

import * as React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, User, Save, Scale } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import toast from 'react-hot-toast';
import { getUserData } from '@/services/user/getUserData.service';
import { updateUserData } from '@/services/user/updateUserData.service';
import { maskTelefone } from '@/lib/masks';

const profileFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
    .optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  oab: z
    .string()
    .regex(/^[A-Z]{2}\d{1,6}$/i, {
      message: 'Formato de OAB inválido. Ex: SP123456',
    })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function Perfil() {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      oab: '',
    },
  });

  async function handleGetUserData(form: UseFormReturn<ProfileFormValues>) {
    try {
      const user = await getUserData();
      if (user) {
        form.reset({
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          oab: user.oab || '',
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Não foi possível carregar os dados do seu perfil.');
    }
  }

  React.useEffect(() => {
    handleGetUserData(form);
  }, []);

  async function onSubmit(data: ProfileFormValues) {
    try {
      if (!data.name || data.name.length < 3) {
        toast.error('O nome deve conter mais de 3 caracteres');
        return;
      }
      const cleanedPhone = data.phone?.replace(/\D/g, '') || '';

      if (cleanedPhone && cleanedPhone.length < 11) {
        toast.error(
          'O número de telefone está incompleto. Por favor, verifique.',
        );
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const response = await updateUserData({
        name: data.name ? data.name : null,
        oab: data.oab ? data.oab : null,
        phone: data.phone ? data.phone : null,
      });
      if (response.message === 'Dados alterados com sucesso!') {
        form.reset({
          ...form.getValues(),
        });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Um erro desconhecido ocorreu');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 self-center space-y-6"
      >
        <Separator />
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Meu Perfil
          </h2>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e de segurança.
          </p>
        </div>
        <div className="grid gap-8 ">
          <Card className="bg-[#1D293D]">
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
              <CardDescription>
                Mantenha suas informações de contato atualizadas.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" {...field} />
                      </div>
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
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" disabled {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="oab"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nº OAB</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Scale className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="pl-10"
                          value={maskTelefone(field.value || '')}
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex pt-4 items-center justify-between">
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}
