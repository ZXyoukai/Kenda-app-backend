"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingEntity = void 0;
/**
 * Rating Entity - Domínio
 * Representa uma avaliação de um usuário por outro
 */
class RatingEntity {
    constructor(data) {
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
    isValid() {
        return this.stars >= 1 && this.stars <= 5;
    }
    /**
     * Retorna a classificação em texto
     */
    getRatingText() {
        const ratings = ['Muito Ruim', 'Ruim', 'Regular', 'Bom', 'Excelente'];
        return ratings[this.stars - 1] || 'Inválido';
    }
    /**
     * Verifica se a avaliação é positiva (4 ou 5 estrelas)
     */
    isPositive() {
        return this.stars >= 4;
    }
    /**
     * Verifica se a avaliação é negativa (1 ou 2 estrelas)
     */
    isNegative() {
        return this.stars <= 2;
    }
}
exports.RatingEntity = RatingEntity;
