import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'AdvogaAI',
  description:
    'Sistema de gerenciamento de prazos e pagamentos para Sociedades Unipessoal de Advocacia',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {' '}
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
