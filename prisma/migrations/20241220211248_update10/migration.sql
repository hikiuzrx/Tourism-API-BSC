/*
  Warnings:

  - The primary key for the `TouristiquePlaces` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `planId` on the `TouristiquePlaces` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TouristiquePlaces" DROP CONSTRAINT "TouristiquePlaces_planId_fkey";

-- DropIndex
DROP INDEX "TouristiquePlaces_adress_key";

-- AlterTable
ALTER TABLE "TouristiquePlaces" DROP CONSTRAINT "TouristiquePlaces_pkey",
DROP COLUMN "planId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "planIds" INTEGER[],
ADD CONSTRAINT "TouristiquePlaces_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "_TouristiquePlacePlans" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TouristiquePlacePlans_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TouristiquePlacePlans_B_index" ON "_TouristiquePlacePlans"("B");

-- AddForeignKey
ALTER TABLE "_TouristiquePlacePlans" ADD CONSTRAINT "_TouristiquePlacePlans_A_fkey" FOREIGN KEY ("A") REFERENCES "TourismPlan"("toursimId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TouristiquePlacePlans" ADD CONSTRAINT "_TouristiquePlacePlans_B_fkey" FOREIGN KEY ("B") REFERENCES "TouristiquePlaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
