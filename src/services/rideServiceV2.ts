import { RideRepository } from '../repositories/RideRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';
import { CreateRideDTO, UpdateRideDTO, RideResponseDTO, RideFilterDTO } from '../dtos/ride.dto';
import { RideType } from '@prisma/client';
import { getIO } from '../socket';

export class RideServiceV2 {
  private rideRepository: RideRepository;
  private transactionRepository: TransactionRepository;

  constructor() {
    this.rideRepository = new RideRepository();
    this.transactionRepository = new TransactionRepository();
  }

  async createRide(data: CreateRideDTO): Promise<RideResponseDTO> {
    const ride = await this.rideRepository.create({
      passenger: { connect: { id: data.passengerId } },
      type: data.type,
      originLat: data.originLat,
      originLng: data.originLng,
      originAddress: data.originAddress,
      destLat: data.destLat,
      destLng: data.destLng,
      destAddress: data.destAddress,
      estimatedPrice: data.estimatedPrice,
      cargoDescription: data.cargoDescription,
      cargoWeight: data.cargoWeight,
      cargoDimensions: data.cargoDimensions,
      scheduledAt: data.scheduledAt,
    });

    // Notify available drivers
    const io = getIO();
    io.emit('newRideAvailable', ride);

    return this.mapToResponseDTO(ride);
  }

  async getRideById(id: string): Promise<RideResponseDTO | null> {
    const ride = await this.rideRepository.findById(id);
    if (!ride) {
      return null;
    }
    return this.mapToResponseDTO(ride);
  }

  async getRides(filter?: RideFilterDTO): Promise<RideResponseDTO[]> {
    const rides = await this.rideRepository.findAll(filter);
    return rides.map(ride => this.mapToResponseDTO(ride));
  }

  async getPendingRides(): Promise<RideResponseDTO[]> {
    const rides = await this.rideRepository.findPendingRides();
    return rides.map(ride => this.mapToResponseDTO(ride));
  }

  async acceptRide(rideId: string, driverId: string): Promise<RideResponseDTO> {
    const ride = await this.rideRepository.acceptRide(rideId, driverId);
    
    // Notify passenger and driver
    const io = getIO();
    io.to(ride.passengerId).emit('rideAccepted', ride);
    io.to(driverId).emit('rideAccepted', ride);

    return this.mapToResponseDTO(ride);
  }

  async startRide(rideId: string): Promise<RideResponseDTO> {
    const ride = await this.rideRepository.startRide(rideId);
    
    const io = getIO();
    io.to(ride.passengerId).emit('rideStarted', ride);
    if (ride.driverId) {
      io.to(ride.driverId).emit('rideStarted', ride);
    }

    return this.mapToResponseDTO(ride);
  }

  async completeRide(
    rideId: string, 
    finalPrice: number, 
    distanceKm: number, 
    durationMin: number,
    paymentMethod: 'CASH' | 'MULTICAIXA_EXPRESS'
  ): Promise<RideResponseDTO> {
    const ride = await this.rideRepository.completeRide(rideId, finalPrice, distanceKm, durationMin);
    
    // Create transaction
    await this.transactionRepository.create({
      user: { connect: { id: ride.passengerId } },
      ride: { connect: { id: rideId } },
      amount: finalPrice,
      type: 'RIDE_PAYMENT',
      paymentMethod: paymentMethod,
      description: `Pagamento da viagem de ${ride.originAddress} para ${ride.destAddress}`,
    });

    const io = getIO();
    io.to(ride.passengerId).emit('rideCompleted', ride);
    if (ride.driverId) {
      io.to(ride.driverId).emit('rideCompleted', ride);
    }

    return this.mapToResponseDTO(ride);
  }

  async cancelRide(rideId: string): Promise<RideResponseDTO> {
    const ride = await this.rideRepository.cancelRide(rideId);
    
    const io = getIO();
    io.to(ride.passengerId).emit('rideCancelled', ride);
    if (ride.driverId) {
      io.to(ride.driverId).emit('rideCancelled', ride);
    }

    return this.mapToResponseDTO(ride);
  }

  async updateRide(rideId: string, data: UpdateRideDTO): Promise<RideResponseDTO> {
    const ride = await this.rideRepository.update(rideId, data);
    return this.mapToResponseDTO(ride);
  }

  async deleteRide(rideId: string): Promise<void> {
    await this.rideRepository.delete(rideId);
  }

  calculatePrice(distanceKm: number, durationMin: number, type: RideType): number {
    const basePrice = type === 'CARGO' ? 10.0 : 5.0;
    const pricePerKm = type === 'CARGO' ? 2.0 : 1.5;
    const pricePerMin = 0.5;

    const total = basePrice + (distanceKm * pricePerKm) + (durationMin * pricePerMin);
    return parseFloat(total.toFixed(2));
  }

  private mapToResponseDTO(ride: any): RideResponseDTO {
    return {
      id: ride.id,
      passengerId: ride.passengerId,
      driverId: ride.driverId,
      status: ride.status,
      type: ride.type,
      originLat: ride.originLat,
      originLng: ride.originLng,
      originAddress: ride.originAddress,
      destLat: ride.destLat,
      destLng: ride.destLng,
      destAddress: ride.destAddress,
      distanceKm: ride.distanceKm,
      durationMin: ride.durationMin,
      estimatedPrice: ride.estimatedPrice,
      finalPrice: ride.finalPrice,
      cargoDescription: ride.cargoDescription,
      cargoWeight: ride.cargoWeight,
      cargoDimensions: ride.cargoDimensions,
      scheduledAt: ride.scheduledAt,
      startedAt: ride.startedAt,
      completedAt: ride.completedAt,
      createdAt: ride.createdAt,
      updatedAt: ride.updatedAt,
    };
  }
}
