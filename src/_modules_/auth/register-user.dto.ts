import { UserRole } from '@prisma/client';

export class RegisterUserDto {
  username: string;
  fullName: string;
  avatar?: string;
  email: string;
  password: string;
  role: UserRole;
}
export class LoginDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // status: number;
}
