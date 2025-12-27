import { TransactionRepository } from '../repositories/TransactionRepository';
import { CreateTransactionDTO, TransactionResponseDTO, TransactionFilterDTO } from '../dtos/transaction.dto';

export class TransactionService {
  private transactionRepository: TransactionRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async createTransaction(data: CreateTransactionDTO): Promise<TransactionResponseDTO> {
    const transaction = await this.transactionRepository.create({
      user: { connect: { id: data.userId } },
      ride: data.rideId ? { connect: { id: data.rideId } } : undefined,
      amount: data.amount,
      type: data.type,
      paymentMethod: data.paymentMethod,
      description: data.description,
    });

    return this.mapToResponseDTO(transaction);
  }

  async getTransactionById(id: string): Promise<TransactionResponseDTO | null> {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      return null;
    }
    return this.mapToResponseDTO(transaction);
  }

  async getTransactions(filter?: TransactionFilterDTO): Promise<TransactionResponseDTO[]> {
    const transactions = await this.transactionRepository.findAll(filter);
    return transactions.map(transaction => this.mapToResponseDTO(transaction));
  }

  async getTransactionByRideId(rideId: string): Promise<TransactionResponseDTO | null> {
    const transaction = await this.transactionRepository.findByRideId(rideId);
    if (!transaction) {
      return null;
    }
    return this.mapToResponseDTO(transaction);
  }

  async getUserTransactionTotal(userId: string, type?: 'RIDE_PAYMENT' | 'REFUND'): Promise<number> {
    return await this.transactionRepository.getTotalByUser(userId, type);
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.transactionRepository.delete(id);
  }

  private mapToResponseDTO(transaction: any): TransactionResponseDTO {
    return {
      id: transaction.id,
      userId: transaction.userId,
      rideId: transaction.rideId,
      amount: transaction.amount,
      type: transaction.type,
      paymentMethod: transaction.paymentMethod,
      description: transaction.description,
      createdAt: transaction.createdAt,
    };
  }
}
