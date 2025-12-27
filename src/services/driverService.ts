import { UserRepository } from '../repositories/UserRepository';
import { UpdateDriverDTO, DriverResponseDTO } from '../dtos/user.dto';

export class DriverService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getProfile(id: string): Promise<DriverResponseDTO | null> {
    const user = await this.userRepository.findById(id);
    if (!user || user.role !== 'DRIVER') {
      return null;
    }

    const stats = await this.userRepository.getDriverStats(id);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      role: user.role,
      isOnline: user.isOnline,
      currentLat: user.currentLat,
      currentLng: user.currentLng,
      vehicleModel: user.vehicleModel,
      vehiclePlate: user.vehiclePlate,
      createdAt: user.createdAt,
      averageRating: stats.averageRating,
      totalRides: stats.totalRides,
    };
  }

  async updateProfile(id: string, data: UpdateDriverDTO): Promise<DriverResponseDTO> {
    const user = await this.userRepository.update(id, data);
    const stats = await this.userRepository.getDriverStats(id);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      role: user.role,
      isOnline: user.isOnline,
      currentLat: user.currentLat,
      currentLng: user.currentLng,
      vehicleModel: user.vehicleModel,
      vehiclePlate: user.vehiclePlate,
      createdAt: user.createdAt,
      averageRating: stats.averageRating,
      totalRides: stats.totalRides,
    };
  }

  async getAllDrivers(): Promise<DriverResponseDTO[]> {
    const drivers = await this.userRepository.findAll('DRIVER');
    
    const driversWithStats = await Promise.all(
      drivers.map(async (driver) => {
        const stats = await this.userRepository.getDriverStats(driver.id);
        return {
          id: driver.id,
          email: driver.email,
          name: driver.name,
          phone: driver.phone,
          avatarUrl: driver.avatarUrl,
          role: driver.role,
          isOnline: driver.isOnline,
          currentLat: driver.currentLat,
          currentLng: driver.currentLng,
          vehicleModel: driver.vehicleModel,
          vehiclePlate: driver.vehiclePlate,
          createdAt: driver.createdAt,
          averageRating: stats.averageRating,
          totalRides: stats.totalRides,
        };
      })
    );

    return driversWithStats;
  }

  async getOnlineDrivers(): Promise<DriverResponseDTO[]> {
    const drivers = await this.userRepository.findOnlineDrivers();
    
    const driversWithStats = await Promise.all(
      drivers.map(async (driver) => {
        const stats = await this.userRepository.getDriverStats(driver.id);
        return {
          id: driver.id,
          email: driver.email,
          name: driver.name,
          phone: driver.phone,
          avatarUrl: driver.avatarUrl,
          role: driver.role,
          isOnline: driver.isOnline,
          currentLat: driver.currentLat,
          currentLng: driver.currentLng,
          vehicleModel: driver.vehicleModel,
          vehiclePlate: driver.vehiclePlate,
          createdAt: driver.createdAt,
          averageRating: stats.averageRating,
          totalRides: stats.totalRides,
        };
      })
    );

    return driversWithStats;
  }

  async updateLocation(id: string, lat: number, lng: number): Promise<void> {
    await this.userRepository.updateLocation(id, lat, lng);
  }

  async setOnlineStatus(id: string, isOnline: boolean): Promise<DriverResponseDTO> {
    const user = await this.userRepository.update(id, { isOnline });
    const stats = await this.userRepository.getDriverStats(id);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      role: user.role,
      isOnline: user.isOnline,
      currentLat: user.currentLat,
      currentLng: user.currentLng,
      vehicleModel: user.vehicleModel,
      vehiclePlate: user.vehiclePlate,
      createdAt: user.createdAt,
      averageRating: stats.averageRating,
      totalRides: stats.totalRides,
    };
  }

  async deleteDriver(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user || user.role !== 'DRIVER') {
      throw new Error('Driver not found');
    }

    await this.userRepository.delete(id);
  }
}
