/**
 * Transaction Entity - Domínio
 * Representa uma transação financeira
 */
export class TransactionEntity {
  id: string;
  userId: string;
  rideId: string | null;
  amount: number;
  type: 'RIDE_PAYMENT' | 'REFUND';
  paymentMethod: 'CASH' | 'MULTICAIXA_EXPRESS';
  description: string | null;
  createdAt: Date;

  constructor(data: Partial<TransactionEntity>) {
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
  isRidePayment(): boolean {
    return this.type === 'RIDE_PAYMENT';
  }

  /**
   * Verifica se é um reembolso
   */
  isRefund(): boolean {
    return this.type === 'REFUND';
  }

  /**
   * Verifica se o pagamento foi em dinheiro
   */
  isCashPayment(): boolean {
    return this.paymentMethod === 'CASH';
  }

  /**
   * Verifica se o pagamento foi via Multicaixa Express
   */
  isMulticaixaPayment(): boolean {
    return this.paymentMethod === 'MULTICAIXA_EXPRESS';
  }

  /**
   * Formata o valor para moeda local
   */
  getFormattedAmount(currency: string = 'AOA'): string {
    return `${this.amount.toFixed(2)} ${currency}`;
  }
}
