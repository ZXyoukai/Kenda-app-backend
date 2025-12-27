/**
 * User Entity - Domínio
 * Representa um usuário do sistema (Passageiro, Motorista ou Admin)
 */
export class UserEntity {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string | null;
  avatarUrl: string | null;
  role: 'PASSENGER' | 'DRIVER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;

  // Driver specific fields
  isOnline: boolean;
  currentLat: number | null;
  currentLng: number | null;
  vehicleModel: string | null;
  vehiclePlate: string | null;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }

  /**
   * Verifica se o usuário é um motorista
   */
  isDriver(): boolean {
    return this.role === 'DRIVER';
  }

  /**
   * Verifica se o usuário é um passageiro
   */
  isPassenger(): boolean {
    return this.role === 'PASSENGER';
  }

  /**
   * Verifica se o usuário é um administrador
   */
  isAdmin(): boolean {
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
