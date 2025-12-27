-- CreateEnum for PaymentMethod
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'MULTICAIXA_EXPRESS');

-- CreateEnum for TransactionType
CREATE TYPE "TransactionType" AS ENUM ('RIDE_PAYMENT', 'REFUND');

-- AlterTable User - Remove balance column
ALTER TABLE "User" DROP COLUMN IF EXISTS "balance";

-- AlterTable Transaction - Update structure
ALTER TABLE "Transaction" DROP COLUMN IF EXISTS "type";
ALTER TABLE "Transaction" ADD COLUMN "type" "TransactionType" NOT NULL DEFAULT 'RIDE_PAYMENT';
ALTER TABLE "Transaction" ADD COLUMN "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'CASH';
