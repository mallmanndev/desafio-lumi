-- CreateEnum
CREATE TYPE "InvoiceValueType" AS ENUM ('ENERGIA', 'ENERGIA_SEM_ICMS', 'ENERGIA_COMPENSADA', 'CONTRIBUICAO_ILUMINACAO');

-- CreateTable
CREATE TABLE "invoice_values" (
    "invoice_id" TEXT NOT NULL,
    "type" "InvoiceValueType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit_fare" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoice_values_pkey" PRIMARY KEY ("invoice_id","type")
);

-- CreateTable
CREATE TABLE "invoice_nfe" (
    "number" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "emission_date" TIMESTAMP(3) NOT NULL,
    "authorization" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoice_nfe_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "instalation" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "total_value" DOUBLE PRECISION NOT NULL,
    "file_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoice_nfe_invoice_id_key" ON "invoice_nfe"("invoice_id");

-- AddForeignKey
ALTER TABLE "invoice_values" ADD CONSTRAINT "invoice_values_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_nfe" ADD CONSTRAINT "invoice_nfe_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
