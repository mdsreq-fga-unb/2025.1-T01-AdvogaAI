-- CreateTable
CREATE TABLE "modelos_documentos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "modelos_documentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags_sistema" (
    "id" SERIAL NOT NULL,
    "chave" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "origemDados" TEXT NOT NULL,

    CONSTRAINT "tags_sistema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campos_modelo_documento" (
    "modeloDocumentoId" TEXT NOT NULL,
    "tagSistemaId" INTEGER NOT NULL,

    CONSTRAINT "campos_modelo_documento_pkey" PRIMARY KEY ("modeloDocumentoId","tagSistemaId")
);

-- CreateTable
CREATE TABLE "campos_personalizados" (
    "id" TEXT NOT NULL,
    "chave" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipoDado" TEXT NOT NULL DEFAULT 'TEXTO',
    "modeloDocumentoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campos_personalizados_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_sistema_chave_key" ON "tags_sistema"("chave");

-- AddForeignKey
ALTER TABLE "campos_modelo_documento" ADD CONSTRAINT "campos_modelo_documento_modeloDocumentoId_fkey" FOREIGN KEY ("modeloDocumentoId") REFERENCES "modelos_documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campos_modelo_documento" ADD CONSTRAINT "campos_modelo_documento_tagSistemaId_fkey" FOREIGN KEY ("tagSistemaId") REFERENCES "tags_sistema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campos_personalizados" ADD CONSTRAINT "campos_personalizados_modeloDocumentoId_fkey" FOREIGN KEY ("modeloDocumentoId") REFERENCES "modelos_documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
