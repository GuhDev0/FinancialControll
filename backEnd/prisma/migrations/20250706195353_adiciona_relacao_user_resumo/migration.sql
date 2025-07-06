-- CreateTable
CREATE TABLE "ResumoDeGastos" (
    "id" SERIAL NOT NULL,
    "nameDoGasto" TEXT NOT NULL,
    "valorGasto" TEXT NOT NULL,
    "dataDoGasto" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ResumoDeGastos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResumoDeGastos" ADD CONSTRAINT "ResumoDeGastos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
