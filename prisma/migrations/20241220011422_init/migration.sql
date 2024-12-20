-- CreateEnum
CREATE TYPE "ReservationState" AS ENUM ('pending', 'accepted', 'rejected', 'canceled');

-- CreateEnum
CREATE TYPE "ReservationNature" AS ENUM ('free', 'paid');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "sexe" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Club" (
    "clubId" SERIAL NOT NULL,
    "clubName" TEXT NOT NULL,
    "clubAdress" TEXT NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("clubId")
);

-- CreateTable
CREATE TABLE "Monument" (
    "adress" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Monument_pkey" PRIMARY KEY ("title")
);

-- CreateTable
CREATE TABLE "ReservationActivity" (
    "reservationId" SERIAL NOT NULL,
    "reserver" INTEGER NOT NULL,
    "reservedfor" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "reservationState" "ReservationState" NOT NULL,
    "reservationNature" "ReservationNature" NOT NULL,

    CONSTRAINT "ReservationActivity_pkey" PRIMARY KEY ("reservationId")
);

-- CreateTable
CREATE TABLE "Activity" (
    "activityId" SERIAL NOT NULL,
    "clubId" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "adress" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("activityId")
);

-- CreateTable
CREATE TABLE "ReservationAuberge" (
    "reservationId" SERIAL NOT NULL,
    "reserveTo" INTEGER NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "reserveFor" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,
    "DateOfEnter" TIMESTAMP(3) NOT NULL,
    "DateOfExist" TIMESTAMP(3) NOT NULL,
    "reservationState" "ReservationState" NOT NULL,
    "reservationNature" "ReservationNature" NOT NULL,

    CONSTRAINT "ReservationAuberge_pkey" PRIMARY KEY ("reservationId")
);

-- CreateTable
CREATE TABLE "Auberge" (
    "aubergeId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,

    CONSTRAINT "Auberge_pkey" PRIMARY KEY ("aubergeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Club_clubName_key" ON "Club"("clubName");

-- CreateIndex
CREATE UNIQUE INDEX "Monument_adress_key" ON "Monument"("adress");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_title_key" ON "Activity"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Auberge_name_key" ON "Auberge"("name");

-- AddForeignKey
ALTER TABLE "ReservationActivity" ADD CONSTRAINT "ReservationActivity_reserver_fkey" FOREIGN KEY ("reserver") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationActivity" ADD CONSTRAINT "ReservationActivity_reservedfor_fkey" FOREIGN KEY ("reservedfor") REFERENCES "Activity"("activityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("clubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationAuberge" ADD CONSTRAINT "ReservationAuberge_reserveFor_fkey" FOREIGN KEY ("reserveFor") REFERENCES "Auberge"("aubergeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationAuberge" ADD CONSTRAINT "ReservationAuberge_reserveTo_fkey" FOREIGN KEY ("reserveTo") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
