/*
  Warnings:

  - You are about to drop the `Monument` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "planId" INTEGER;

-- AlterTable
ALTER TABLE "Auberge" ADD COLUMN     "number" TEXT[];

-- AlterTable
ALTER TABLE "ReservationAuberge" ADD COLUMN     "Minor" BOOLEAN;

-- DropTable
DROP TABLE "Monument";

-- CreateTable
CREATE TABLE "TouristiquePlaces" (
    "adress" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "planId" INTEGER,
    "description" TEXT NOT NULL,

    CONSTRAINT "TouristiquePlaces_pkey" PRIMARY KEY ("title")
);

-- CreateTable
CREATE TABLE "Agence" (
    "agenceId" SERIAL NOT NULL,
    "agenceName" TEXT NOT NULL,
    "agenceAdress" TEXT NOT NULL,

    CONSTRAINT "Agence_pkey" PRIMARY KEY ("agenceId")
);

-- CreateTable
CREATE TABLE "TourismPlan" (
    "toursimId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "transporatation" BOOLEAN NOT NULL,

    CONSTRAINT "TourismPlan_pkey" PRIMARY KEY ("toursimId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TouristiquePlaces_adress_key" ON "TouristiquePlaces"("adress");

-- CreateIndex
CREATE UNIQUE INDEX "Agence_agenceName_key" ON "Agence"("agenceName");

-- AddForeignKey
ALTER TABLE "TouristiquePlaces" ADD CONSTRAINT "TouristiquePlaces_planId_fkey" FOREIGN KEY ("planId") REFERENCES "TourismPlan"("toursimId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_planId_fkey" FOREIGN KEY ("planId") REFERENCES "TourismPlan"("toursimId") ON DELETE SET NULL ON UPDATE CASCADE;
