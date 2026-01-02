/*
  Warnings:

  - A unique constraint covering the columns `[rideId,raterId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Rating_rideId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Rating_rideId_raterId_key" ON "Rating"("rideId", "raterId");
