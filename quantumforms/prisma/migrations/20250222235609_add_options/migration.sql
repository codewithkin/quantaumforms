/*
  Warnings:

  - You are about to drop the column `options` on the `Field` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Field" DROP COLUMN "options";

-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
