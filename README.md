# AdvogaAI

O AdvogaAI é uma plataforma de automação de documentos jurídicos que visa otimizar o trabalho de advogados e escritórios de advocacia. A plataforma permite a criação, o gerenciamento e a automação de documentos, além de oferecer um portal para o acompanhamento de processos.

## Funcionalidades

- **Gerenciamento de Clientes:** Cadastro e gerenciamento de clientes (pessoas físicas e jurídicas).
- **Modelos de Documentos:** Criação e gerenciamento de modelos de documentos com campos personalizados e tags de sistema.
- **Geração de Documentos:** Geração de documentos a partir dos modelos cadastrados.
- **Acompanhamento de Processos:** Acompanhamento do andamento de processos judiciais.
- **Notificações:** Envio de notificações sobre o andamento dos processos.

## Tecnologias Utilizadas

### Front-end

- **Next.js:** Framework React para renderização no lado do servidor e geração de sites estáticos.
- **TypeScript:** Superset de JavaScript que adiciona tipagem estática.
- **Tailwind CSS:** Framework CSS para a criação de interfaces de usuário.
- **shadcn/ui:** Componentes de interface de usuário.
- **React Hook Form:** Gerenciamento de formulários.
- **TanStack Query:** Gerenciamento de estado de dados assíncronos.

### Back-end

- **NestJS:** Framework Node.js para a criação de aplicativos do lado do servidor eficientes e escaláveis.
- **TypeScript:** Superset de JavaScript que adiciona tipagem estática.
- **Prisma:** ORM para Node.js e TypeScript.
- **PostgreSQL:** Banco de dados relacional.
- **JWT:** Autenticação baseada em JSON Web Tokens.
- **Swagger:** Documentação de API.

## Integrações

- **MinIO:** Armazenamento de objetos compatível com o Amazon S3.
- **RabbitMQ:** Mensageria para as notificações.
- **Nodemailer:** Envio de e-mails.

## Como Rodar o Projeto Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 20 ou superior)
- [Docker](https://www.docker.com/get-started)
- [pnpm](https://pnpm.io/installation) (opcional, mas recomendado)

### Passos

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/2025.1-T01-AdvogaAI.git
   cd 2025.1-T01-AdvogaAI
   ```

2. **Inicie os serviços de infraestrutura com o Docker Compose:**

   ```bash
   docker-compose up -d
   ```

3. **Configure as variáveis de ambiente do back-end:**

   Na pasta `advogaAI-server`, crie uma cópia do arquivo `.env.example` com o nome `.env` e preencha as variáveis com os valores adequados para o seu ambiente.

4. **Configure as variáveis de ambiente do front-end:**

   Na pasta `advogaai-front`, crie uma cópia do arquivo `.env.example` com o nome `.env` e preencha as variáveis com os valores adequados para o seu ambiente.

5. **Instale as dependências do back-end e inicie o servidor:**

   Acesse a pasta do back-end e execute os seguintes comandos:

   ```bash
   cd advogaAI-server
   npm install
   npx prisma migrate deploy
   npx prisma generate
   npm run start:dev
   ```

6. **Instale as dependências do front-end e inicie o cliente:**

   Acesse a pasta do front-end e execute os seguintes comandos:

   ```bash
   cd ../advogaai-front
   npm install
   npm run dev
   ```

7. **Acesse a aplicação:**

   - **Front-end:** [http://localhost:5000](http://localhost:5000)
   - **Back-end (Swagger):** [http://localhost:3000/api](http://localhost:3000/api)
   - **MinIO Console:** [http://localhost:9001](http://localhost:9001)
   - **RabbitMQ Management:** [http://localhost:15672](http://localhost:15672)
