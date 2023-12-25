/*
  Warnings:

  - A unique constraint covering the columns `[customer,instalation,month]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "invoices_customer_instalation_month_key" ON "invoices"("customer", "instalation", "month");
