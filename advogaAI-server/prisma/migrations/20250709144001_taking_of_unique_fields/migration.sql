-- DropIndex
DROP INDEX "pessoas_fisicas_cpf_key";

-- DropIndex
DROP INDEX "pessoas_fisicas_ctps_key";

-- DropIndex
DROP INDEX "pessoas_fisicas_rg_key";

-- AlterTable
ALTER TABLE "pessoas_fisicas" ALTER COLUMN "ctps" DROP NOT NULL;
