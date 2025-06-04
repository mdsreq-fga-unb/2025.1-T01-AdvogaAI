import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
