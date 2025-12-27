/**
 * Rating Entity - Domínio
 * Representa uma avaliação de um usuário por outro
 */
export class RatingEntity {
  id: string;
  rideId: string;
  raterId: string;
  ratedUserId: string;
  stars: number;
  comment: string | null;
  createdAt: Date;

  constructor(data: Partial<RatingEntity>) {
    this.id = data.id || '';
    this.rideId = data.rideId || '';
    this.raterId = data.raterId || '';
    this.ratedUserId = data.ratedUserId || '';
    this.stars = data.stars || 0;
    this.comment = data.comment || null;
    this.createdAt = data.createdAt || new Date();
  }

  /**
   * Valida se o número de estrelas está no intervalo válido
   */
  isValid(): boolean {
    return this.stars >= 1 && this.stars <= 5;
  }

  /**
   * Retorna a classificação em texto
   */
  getRatingText(): string {
    const ratings = ['Muito Ruim', 'Ruim', 'Regular', 'Bom', 'Excelente'];
    return ratings[this.stars - 1] || 'Inválido';
  }

  /**
   * Verifica se a avaliação é positiva (4 ou 5 estrelas)
   */
  isPositive(): boolean {
    return this.stars >= 4;
  }

  /**
   * Verifica se a avaliação é negativa (1 ou 2 estrelas)
   */
  isNegative(): boolean {
    return this.stars <= 2;
  }
}
