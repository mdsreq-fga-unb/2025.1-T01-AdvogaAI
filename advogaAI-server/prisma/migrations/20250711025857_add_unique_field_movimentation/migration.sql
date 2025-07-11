/*
  Warnings:

  - A unique constraint covering the columns `[numeroComunicacao]` on the table `Movimentacao` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `numeroComunicacao` to the `Movimentacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movimentacao" ADD COLUMN     "numeroComunicacao" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Movimentacao_numeroComunicacao_key" ON "Movimentacao"("numeroComunicacao");
