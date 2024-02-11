-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Running', 'Down');

-- CreateTable
CREATE TABLE "ServiceList" (
    "id" SERIAL NOT NULL,
    "serviceName" VARCHAR(255) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Running',
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "http" INTEGER NOT NULL,

    CONSTRAINT "ServiceList_pkey" PRIMARY KEY ("id")
);
