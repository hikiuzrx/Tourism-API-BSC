-- CreateTable
CREATE TABLE "reservationForClub" (
    "rservedfor" INTEGER NOT NULL,
    "resrveState" "ReservationState" NOT NULL,

    CONSTRAINT "reservationForClub_pkey" PRIMARY KEY ("rservedfor")
);

-- AddForeignKey
ALTER TABLE "reservationForClub" ADD CONSTRAINT "reservationForClub_rservedfor_fkey" FOREIGN KEY ("rservedfor") REFERENCES "Club"("clubId") ON DELETE RESTRICT ON UPDATE CASCADE;
