-- AlterTable
ALTER TABLE "campos_personalizados" ALTER COLUMN "tipoDado" SET DEFAULT 'STRING';

-- AlterTable
ALTER TABLE "modelos_documentos" ADD COLUMN     "tipo_documento" TEXT NOT NULL DEFAULT 'OUTRO';
