/*
  Warnings:

  - You are about to drop the column `cellPhone_number` on the `Supplier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "cellPhone_number",
ALTER COLUMN "phone_number" DROP NOT NULL;
