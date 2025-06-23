/*
  Warnings:

  - You are about to drop the column `clienteId` on the `enderecos` table. All the data in the column will be lost.
  - You are about to drop the `clientes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `enderecos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "enderecos" DROP CONSTRAINT "enderecos_clienteId_fkey";

-- AlterTable
ALTER TABLE "enderecos" DROP COLUMN "clienteId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isConfirmed" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "clientes";

-- CreateTable
CREATE TABLE "pessoas_fisicas" (
    "id" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "rg" TEXT NOT NULL,
    "ctps" TEXT NOT NULL,
    "nacionalidade" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "estadoCivil" "EstadoCivil" NOT NULL,
    "profissao" TEXT NOT NULL,
    "enderecoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pessoas_fisicas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoas_juridicas" (
    "id" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "nomeFantasia" TEXT,
    "cnpj" VARCHAR(14) NOT NULL,
    "tipoEmpresa" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "enderecoId" TEXT NOT NULL,
    "representanteLegalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pessoas_juridicas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_fisicas_cpf_key" ON "pessoas_fisicas"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_fisicas_rg_key" ON "pessoas_fisicas"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_fisicas_ctps_key" ON "pessoas_fisicas"("ctps");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_fisicas_email_key" ON "pessoas_fisicas"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_fisicas_enderecoId_key" ON "pessoas_fisicas"("enderecoId");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_juridicas_cnpj_key" ON "pessoas_juridicas"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_juridicas_email_key" ON "pessoas_juridicas"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_juridicas_enderecoId_key" ON "pessoas_juridicas"("enderecoId");

-- AddForeignKey
ALTER TABLE "pessoas_fisicas" ADD CONSTRAINT "pessoas_fisicas_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "enderecos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoas_juridicas" ADD CONSTRAINT "pessoas_juridicas_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "enderecos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoas_juridicas" ADD CONSTRAINT "pessoas_juridicas_representanteLegalId_fkey" FOREIGN KEY ("representanteLegalId") REFERENCES "pessoas_fisicas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
