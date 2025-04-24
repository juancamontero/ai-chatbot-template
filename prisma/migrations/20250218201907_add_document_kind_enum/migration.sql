/*
  Warnings:

  - The `kind` column on the `documents` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DocumentKind" AS ENUM ('text', 'code', 'image', 'sheet');

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "kind",
ADD COLUMN     "kind" "DocumentKind" NOT NULL DEFAULT 'text';
