/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `coursecategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "coursecategory_name_key" ON "coursecategory"("name");
