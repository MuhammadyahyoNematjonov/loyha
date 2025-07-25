/*
  Warnings:

  - You are about to drop the column `groupId` on the `lessons` table. All the data in the column will be lost.
  - Added the required column `bolimId` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_groupId_fkey";

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "groupId",
ADD COLUMN     "bolimId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_bolimId_fkey" FOREIGN KEY ("bolimId") REFERENCES "lessonbolim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
