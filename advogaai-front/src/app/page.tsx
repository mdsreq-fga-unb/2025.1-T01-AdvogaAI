import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-[#022240] to-[#0B2F4E] text-white">
      <div className="flex flex-col items-center text-center p-8">
        <Image
          src="/advogaai-logo.jpeg"
          alt="AdvogaAI Logo"
          width={200}
          height={200}
          className="fade-edges"
        />
        <h1 className="text-5xl font-bold font-satoshi mt-8">AdvogaAI</h1>
        <p className="text-lg font-satoshi mt-4 max-w-md">
          Otimize sua advocacia com o gerenciamento de documentos automatizado.
          Crie, gerencie e armazene seus documentos de forma eficiente e segura.
        </p>
        <Link href="/login" passHref>
          <button className="mt-8 px-8 py-3 bg-[#E5E5E5] cursor-pointer text-black font-bold rounded-lg hover:bg-[#525252] hover:text-white transition-all duration-300">
            Acessar Plataforma
          </button>
        </Link>
      </div>
    </div>
  );
}
