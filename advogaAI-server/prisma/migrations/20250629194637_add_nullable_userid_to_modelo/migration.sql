/*
  Warnings:

  - Added the required column `userId` to the `modelos_documentos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pessoas_juridicas" DROP CONSTRAINT "pessoas_juridicas_userId_fkey";

-- AlterTable
ALTER TABLE "modelos_documentos" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pessoas_juridicas" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "pessoas_juridicas" ADD CONSTRAINT "pessoas_juridicas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelos_documentos" ADD CONSTRAINT "modelos_documentos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
