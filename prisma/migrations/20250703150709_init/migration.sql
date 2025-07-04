-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "profissao" TEXT NOT NULL,
    "rendaSalarial" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
