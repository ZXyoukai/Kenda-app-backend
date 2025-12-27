"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideEntity = void 0;
/**
 * Ride Entity - Domínio
 * Representa uma viagem (pessoa ou carga)
 */
class RideEntity {
    constructor(data) {
        this.id = data.id || '';
        this.passengerId = data.passengerId || '';
        this.driverId = data.driverId || null;
        this.status = data.status || 'PENDING';
        this.type = data.type || 'PERSON';
        this.originLat = data.originLat || 0;
        this.originLng = data.originLng || 0;
        this.originAddress = data.originAddress || '';
        this.destLat = data.destLat || 0;
        this.destLng = data.destLng || 0;
        this.destAddress = data.destAddress || '';
        this.distanceKm = data.distanceKm || null;
        this.durationMin = data.durationMin || null;
        this.estimatedPrice = data.estimatedPrice || 0;
        this.finalPrice = data.finalPrice || null;
        this.cargoDescription = data.cargoDescription || null;
        this.cargoWeight = data.cargoWeight || null;
        this.cargoDimensions = data.cargoDimensions || null;
        this.scheduledAt = data.scheduledAt || null;
        this.startedAt = data.startedAt || null;
        this.completedAt = data.completedAt || null;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }
    /**
     * Verifica se a viagem está pendente
     */
    isPending() {
        return this.status === 'PENDING';
    }
    /**
     * Verifica se a viagem foi aceita
     */
    isAccepted() {
        return this.status === 'ACCEPTED';
    }
    /**
     * Verifica se a viagem está em progresso
     */
    isInProgress() {
        return this.status === 'IN_PROGRESS';
    }
    /**
     * Verifica se a viagem foi completada
     */
    isCompleted() {
        return this.status === 'COMPLETED';
    }
    /**
     * Verifica se a viagem foi cancelada
     */
    isCancelled() {
        return this.status === 'CANCELLED';
    }
    /**
     * Verifica se a viagem é de carga
     */
    isCargo() {
        return this.type === 'CARGO';
    }
    /**
     * Verifica se pode ser aceita por um motorista
     */
    canBeAccepted() {
        return this.status === 'PENDING' && this.driverId === null;
    }
    /**
     * Verifica se pode ser iniciada
     */
    canBeStarted() {
        return this.status === 'ACCEPTED' && this.driverId !== null;
    }
    /**
     * Verifica se pode ser completada
     */
    canBeCompleted() {
        return this.status === 'IN_PROGRESS';
    }
}
exports.RideEntity = RideEntity;
