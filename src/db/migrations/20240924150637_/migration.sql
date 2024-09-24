/*
  Warnings:

  - You are about to drop the column `todoId` on the `TodoGroup` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TodoGroup" DROP CONSTRAINT "TodoGroup_todoId_fkey";

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "todoGroupId" TEXT;

-- AlterTable
ALTER TABLE "TodoGroup" DROP COLUMN "todoId";

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todoGroupId_fkey" FOREIGN KEY ("todoGroupId") REFERENCES "TodoGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
