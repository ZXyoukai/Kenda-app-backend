/**
 * Ride Entity - Domínio
 * Representa uma viagem (pessoa ou carga)
 */
export class RideEntity {
  id: string;
  passengerId: string;
  driverId: string | null;
  status: 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  type: 'PERSON' | 'CARGO';

  originLat: number;
  originLng: number;
  originAddress: string;

  destLat: number;
  destLng: number;
  destAddress: string;

  distanceKm: number | null;
  durationMin: number | null;
  estimatedPrice: number;
  finalPrice: number | null;

  // Cargo specific
  cargoDescription: string | null;
  cargoWeight: number | null;
  cargoDimensions: string | null;

  scheduledAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<RideEntity>) {
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
  isPending(): boolean {
    return this.status === 'PENDING';
  }

  /**
   * Verifica se a viagem foi aceita
   */
  isAccepted(): boolean {
    return this.status === 'ACCEPTED';
  }

  /**
   * Verifica se a viagem está em progresso
   */
  isInProgress(): boolean {
    return this.status === 'IN_PROGRESS';
  }

  /**
   * Verifica se a viagem foi completada
   */
  isCompleted(): boolean {
    return this.status === 'COMPLETED';
  }

  /**
   * Verifica se a viagem foi cancelada
   */
  isCancelled(): boolean {
    return this.status === 'CANCELLED';
  }

  /**
   * Verifica se a viagem é de carga
   */
  isCargo(): boolean {
    return this.type === 'CARGO';
  }

  /**
   * Verifica se pode ser aceita por um motorista
   */
  canBeAccepted(): boolean {
    return this.status === 'PENDING' && this.driverId === null;
  }

  /**
   * Verifica se pode ser iniciada
   */
  canBeStarted(): boolean {
    return this.status === 'ACCEPTED' && this.driverId !== null;
  }

  /**
   * Verifica se pode ser completada
   */
  canBeCompleted(): boolean {
    return this.status === 'IN_PROGRESS';
  }
}
