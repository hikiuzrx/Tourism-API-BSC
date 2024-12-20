/*
  Warnings:

  - Added the required column `password` to the `Agence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agence" ADD COLUMN     "password" TEXT NOT NULL;
