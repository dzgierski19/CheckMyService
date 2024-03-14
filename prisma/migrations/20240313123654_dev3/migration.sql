/*
  Warnings:

  - A unique constraint covering the columns `[website_url]` on the table `Website` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Website_website_url_key" ON "Website"("website_url");
