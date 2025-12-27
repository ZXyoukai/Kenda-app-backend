import { RideType, RideStatus, PaymentMethod } from '@prisma/client';

export interface CreateRideDTO {
  passengerId: string;
  type: RideType;
  originLat: number;
  originLng: number;
  originAddress: string;
  destLat: number;
  destLng: number;
  destAddress: string;
  estimatedPrice: number;
  paymentMethod: PaymentMethod;
  cargoDescription?: string;
  cargoWeight?: number;
  cargoDimensions?: string;
  scheduledAt?: Date;
}

export interface UpdateRideDTO {
  status?: RideStatus;
  driverId?: string;
  distanceKm?: number;
  durationMin?: number;
  finalPrice?: number;
  startedAt?: Date;
  completedAt?: Date;
}

export interface RideResponseDTO {
  id: string;
  passengerId: string;
  driverId: string | null;
  status: RideStatus;
  type: RideType;
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
  cargoDescription: string | null;
  cargoWeight: number | null;
  cargoDimensions: string | null;
  scheduledAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RideFilterDTO {
  passengerId?: string;
  driverId?: string;
  status?: RideStatus;
  type?: RideType;
  startDate?: Date;
  endDate?: Date;
}
