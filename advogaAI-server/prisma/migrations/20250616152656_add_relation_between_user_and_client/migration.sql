/*
  Warnings:

  - Added the required column `userId` to the `pessoas_fisicas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `pessoas_juridicas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pessoas_fisicas" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pessoas_juridicas" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pessoas_fisicas" ADD CONSTRAINT "pessoas_fisicas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoas_juridicas" ADD CONSTRAINT "pessoas_juridicas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
