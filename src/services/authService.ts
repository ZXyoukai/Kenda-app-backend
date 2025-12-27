import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { RegisterDTO, LoginDTO, AuthResponseDTO } from '../dtos/auth.dto';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(data: RegisterDTO): Promise<AuthResponseDTO> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      name: data.name,
      phone: data.phone,
      role: data.role || 'PASSENGER',
    });

    const token = this.generateToken(user.id, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
      token,
    };
  }

  async login(data: LoginDTO): Promise<AuthResponseDTO> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user.id, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
      token,
    };
  }

  private generateToken(userId: string, role: string): string {
    return jwt.sign(
      { id: userId, role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );
  }

  verifyToken(token: string): { id: string; role: string } {
    try {
      return jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
