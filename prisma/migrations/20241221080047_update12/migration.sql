/*
  Warnings:

  - Added the required column `image` to the `Agence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Auberge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agence" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Auberge" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "image" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BlackList" (
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "idCard" TEXT NOT NULL,

    CONSTRAINT "BlackList_pkey" PRIMARY KEY ("idCard")
);

-- CreateTable
CREATE TABLE "employee" (
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "job" TEXT NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("lastName","firstName")
);
