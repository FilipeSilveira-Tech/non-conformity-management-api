-- CreateEnum
CREATE TYPE "TypeNoConformity" AS ENUM ('FATURADO_A_MAIS', 'FATURADO_A_MENOS', 'DIFERENTE_DO_PEDIDO', 'AVARIADO', 'NAO_ENVIADO', 'OUTROS');

-- CreateEnum
CREATE TYPE "StatusNoConformity" AS ENUM ('ABERTA', 'EM_ANALISE', 'AGUARDANDO_FORNECEDOR', 'AGUARDANDO_DEVOLUCAO', 'DEVOLVIDO', 'FINALIZADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "ActionHistory" AS ENUM ('ALTERADO_NOTAFISCAL', 'ALTERADO_FORNECEDOR', 'ALTERADO_DATA_ABERTURA', 'ALTERADO_TIPO', 'ALTERADO_DESCRICAO', 'ALTERADO_QUANTIDADE_EXPERADA', 'ALTERADO_QUANTIDADE_RECEBIDA', 'ALTERADO_QUANTIDADE_DIVERGENTE', 'ALTERADO_STATUS', 'ALTERADO_RESPONSAVEL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "fantasy_name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "cellPhone_number" TEXT NOT NULL,
    "email" TEXT[],

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NoConformity" (
    "id" SERIAL NOT NULL,
    "invoice" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "opening_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type_noConformity" "TypeNoConformity" NOT NULL,
    "description" TEXT,
    "expected_quantity" DOUBLE PRECISION NOT NULL,
    "received_quantity" DOUBLE PRECISION NOT NULL,
    "divergent_quantity" DOUBLE PRECISION NOT NULL,
    "status" "StatusNoConformity" NOT NULL,
    "responsibleUser_id" TEXT NOT NULL,

    CONSTRAINT "NoConformity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NoConformityHistory" (
    "id" TEXT NOT NULL,
    "noConformity_id" INTEGER NOT NULL,
    "responsibleUser_id" TEXT NOT NULL,
    "action_realize" "ActionHistory" NOT NULL,
    "observation" TEXT NOT NULL,

    CONSTRAINT "NoConformityHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_id_key" ON "Supplier"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NoConformity_id_key" ON "NoConformity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NoConformityHistory_id_key" ON "NoConformityHistory"("id");

-- AddForeignKey
ALTER TABLE "NoConformity" ADD CONSTRAINT "NoConformity_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoConformity" ADD CONSTRAINT "NoConformity_responsibleUser_id_fkey" FOREIGN KEY ("responsibleUser_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoConformityHistory" ADD CONSTRAINT "NoConformityHistory_noConformity_id_fkey" FOREIGN KEY ("noConformity_id") REFERENCES "NoConformity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoConformityHistory" ADD CONSTRAINT "NoConformityHistory_responsibleUser_id_fkey" FOREIGN KEY ("responsibleUser_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
