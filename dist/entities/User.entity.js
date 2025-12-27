"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
/**
 * User Entity - Domínio
 * Representa um usuário do sistema (Passageiro, Motorista ou Admin)
 */
class UserEntity {
    constructor(data) {
        this.id = data.id || '';
        this.email = data.email || '';
        this.password = data.password || '';
        this.name = data.name || '';
        this.phone = data.phone || null;
        this.avatarUrl = data.avatarUrl || null;
        this.role = data.role || 'PASSENGER';
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
        this.isOnline = data.isOnline || false;
        this.currentLat = data.currentLat || null;
        this.currentLng = data.currentLng || null;
        this.vehicleModel = data.vehicleModel || null;
        this.vehiclePlate = data.vehiclePlate || null;
    }
    /**
     * Verifica se o usuário é um motorista
     */
    isDriver() {
        return this.role === 'DRIVER';
    }
    /**
     * Verifica se o usuário é um passageiro
     */
    isPassenger() {
        return this.role === 'PASSENGER';
    }
    /**
     * Verifica se o usuário é um administrador
     */
    isAdmin() {
        return this.role === 'ADMIN';
    }
    /**
     * Retorna dados públicos do usuário (sem senha)
     */
    toPublic() {
        const { password, ...publicData } = this;
        return publicData;
    }
}
exports.UserEntity = UserEntity;
