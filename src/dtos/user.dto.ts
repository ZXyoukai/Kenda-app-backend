import { Role } from '@prisma/client';

export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: Role;
  avatarUrl?: string;
}

export interface UpdateUserDTO {
  name?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface UpdateDriverDTO {
  name?: string;
  phone?: string;
  avatarUrl?: string;
  vehicleModel?: string;
  vehiclePlate?: string;
  vehicleColor?: string;
  vehicleYear?: number;
  isOnline?: boolean;
  currentLat?: number;
  currentLng?: number;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  avatarUrl: string | null;
  role: Role;
  createdAt: Date;
}

export interface DriverResponseDTO extends UserResponseDTO {
  isOnline: boolean;
  currentLat: number | null;
  currentLng: number | null;
  vehicleModel: string | null;
  vehiclePlate: string | null;
  vehicleColor: string | null;
  vehicleYear: number | null;
  averageRating?: number;
  totalRides?: number;
}
