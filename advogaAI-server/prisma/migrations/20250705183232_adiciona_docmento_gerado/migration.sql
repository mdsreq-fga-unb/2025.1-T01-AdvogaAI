-- CreateTable
CREATE TABLE "documento_gerado" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo_documento" TEXT NOT NULL DEFAULT 'OUTRO',
    "descricao" TEXT,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documento_gerado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "documento_gerado" ADD CONSTRAINT "documento_gerado_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
