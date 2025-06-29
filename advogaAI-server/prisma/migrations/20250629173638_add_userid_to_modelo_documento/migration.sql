/*
  Warnings:

  - Added the required column `userId` to the `modelos_documentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "campos_personalizados" ALTER COLUMN "tipoDado" SET DEFAULT 'STRING';

-- AlterTable
ALTER TABLE "modelos_documentos" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "modelos_documentos" ADD CONSTRAINT "modelos_documentos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
