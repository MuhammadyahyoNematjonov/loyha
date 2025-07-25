/*
  Warnings:

  - You are about to drop the `CourseCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_cursecategoryId_fkey";

-- DropTable
DROP TABLE "CourseCategory";

-- CreateTable
CREATE TABLE "coursecategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coursecategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_cursecategoryId_fkey" FOREIGN KEY ("cursecategoryId") REFERENCES "coursecategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
