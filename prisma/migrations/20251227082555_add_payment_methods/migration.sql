/*
  Warnings:

  - The `type` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `balance` on the `User` table. All the data in the column will be lost.
  - Added the required column `paymentMethod` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'MULTICAIXA_EXPRESS');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('RIDE_PAYMENT', 'REFUND');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL DEFAULT 'RIDE_PAYMENT';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "balance";
