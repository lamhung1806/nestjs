import { UserRole } from '@prisma/client';

export class RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  // status: number;
}
export class LoginDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // status: number;
}
