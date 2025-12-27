import { UserRepository } from '../repositories/UserRepository';
import { UpdateUserDTO, UserResponseDTO } from '../dtos/user.dto';

export class PassengerService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getProfile(id: string): Promise<UserResponseDTO | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async updateProfile(id: string, data: UpdateUserDTO): Promise<UserResponseDTO> {
    const user = await this.userRepository.update(id, data);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async getAllPassengers(): Promise<UserResponseDTO[]> {
    const passengers = await this.userRepository.findAll('PASSENGER');
    
    return passengers.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      role: user.role,
      createdAt: user.createdAt,
    }));
  }

  async deletePassenger(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user || user.role !== 'PASSENGER') {
      throw new Error('Passenger not found');
    }

    await this.userRepository.delete(id);
  }
}
