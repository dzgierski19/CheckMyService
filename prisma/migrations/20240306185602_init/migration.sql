-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DOWN', 'RUNNING');

-- CreateTable
CREATE TABLE "Website" (
    "id" TEXT NOT NULL,
    "website_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "http_code" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "websiteId" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Website_website_url_key" ON "Website"("website_url");

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
