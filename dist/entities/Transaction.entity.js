"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionEntity = void 0;
/**
 * Transaction Entity - Domínio
 * Representa uma transação financeira
 */
class TransactionEntity {
    constructor(data) {
        this.id = data.id || '';
        this.userId = data.userId || '';
        this.rideId = data.rideId || null;
        this.amount = data.amount || 0;
        this.type = data.type || 'RIDE_PAYMENT';
        this.paymentMethod = data.paymentMethod || 'CASH';
        this.description = data.description || null;
        this.createdAt = data.createdAt || new Date();
    }
    /**
     * Verifica se é um pagamento de viagem
     */
    isRidePayment() {
        return this.type === 'RIDE_PAYMENT';
    }
    /**
     * Verifica se é um reembolso
     */
    isRefund() {
        return this.type === 'REFUND';
    }
    /**
     * Verifica se o pagamento foi em dinheiro
     */
    isCashPayment() {
        return this.paymentMethod === 'CASH';
    }
    /**
     * Verifica se o pagamento foi via Multicaixa Express
     */
    isMulticaixaPayment() {
        return this.paymentMethod === 'MULTICAIXA_EXPRESS';
    }
    /**
     * Formata o valor para moeda local
     */
    getFormattedAmount(currency = 'AOA') {
        return `${this.amount.toFixed(2)} ${currency}`;
    }
}
exports.TransactionEntity = TransactionEntity;
