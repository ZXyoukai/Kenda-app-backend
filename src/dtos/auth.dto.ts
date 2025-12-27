import { Role } from '@prisma/client';

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: Role;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  user: {
    id: string;
    email: string;
    name: string;
    phone: string | null;
    role: Role;
    avatarUrl: string | null;
  };
  token: string;
}
