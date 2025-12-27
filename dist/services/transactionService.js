"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const TransactionRepository_1 = require("../repositories/TransactionRepository");
class TransactionService {
    constructor() {
        this.transactionRepository = new TransactionRepository_1.TransactionRepository();
    }
    async createTransaction(data) {
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
    async getTransactionById(id) {
        const transaction = await this.transactionRepository.findById(id);
        if (!transaction) {
            return null;
        }
        return this.mapToResponseDTO(transaction);
    }
    async getTransactions(filter) {
        const transactions = await this.transactionRepository.findAll(filter);
        return transactions.map(transaction => this.mapToResponseDTO(transaction));
    }
    async getTransactionByRideId(rideId) {
        const transaction = await this.transactionRepository.findByRideId(rideId);
        if (!transaction) {
            return null;
        }
        return this.mapToResponseDTO(transaction);
    }
    async getUserTransactionTotal(userId, type) {
        return await this.transactionRepository.getTotalByUser(userId, type);
    }
    async deleteTransaction(id) {
        await this.transactionRepository.delete(id);
    }
    mapToResponseDTO(transaction) {
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
exports.TransactionService = TransactionService;
