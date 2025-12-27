import { TransactionType, PaymentMethod } from '@prisma/client';

export interface CreateTransactionDTO {
  userId: string;
  rideId?: string;
  amount: number;
  type: TransactionType;
  paymentMethod: PaymentMethod;
  description?: string;
}

export interface TransactionResponseDTO {
  id: string;
  userId: string;
  rideId: string | null;
  amount: number;
  type: TransactionType;
  paymentMethod: PaymentMethod;
  description: string | null;
  createdAt: Date;
}

export interface TransactionFilterDTO {
  userId?: string;
  rideId?: string;
  type?: TransactionType;
  paymentMethod?: PaymentMethod;
  startDate?: Date;
  endDate?: Date;
}
