/*
  Warnings:

  - Added the required column `password` to the `Auberge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auberge" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "password" TEXT NOT NULL;
