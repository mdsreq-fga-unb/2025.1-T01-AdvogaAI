/*
  Warnings:

  - A unique constraint covering the columns `[oab]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "oab" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_oab_key" ON "users"("oab");
