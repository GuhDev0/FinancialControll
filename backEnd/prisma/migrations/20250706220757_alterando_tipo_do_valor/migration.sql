/*
  Warnings:

  - Changed the type of `valorGasto` on the `ResumoDeGastos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ResumoDeGastos" DROP COLUMN "valorGasto",
ADD COLUMN     "valorGasto" INTEGER NOT NULL;
