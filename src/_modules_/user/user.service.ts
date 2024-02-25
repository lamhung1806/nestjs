import { Injectable } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { RegisterUserDto } from '../auth/register-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { exclude } from 'src/utils/transform.util';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: RegisterUserDto): Promise<PrismaUser> {
    const { email, firstName, lastName, password } = createUserDto;

    return await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password,
        role: 'ADMIN',
      },
    });
  }

  async findByEmail(email: string): Promise<any> {
    const foundUser = await this.prisma.user.findUnique({
      where: { email },
    });
    return foundUser;
  }

  async findById(id: number) {
    const me = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return exclude(me, ['password', 'refreshToken']);
  }

  async getAll(query: UserDto) {
    const { page, size, sortOrder } = query;
    const skip = (page - 1) * size;
    const [userList, count] = await Promise.all([
      this.prisma.user.findMany({
        take: +size,
        skip,
        orderBy: { id: sortOrder },
      }),
      await this.prisma.user.count(),
    ]);

    const result = userList.map((item) =>
      exclude(item, ['password', 'refreshToken']),
    );

    return {
      data: result,
      page: page,
      size: size,
      totalPages: Math.ceil(count / size) || 0,
      totalElement: count,
    };
  }

  async deleteById(id: number) {
    try {
      const data = await this.prisma.user.delete({ where: { id } });

      return data;
    } catch (error) {
      console.log('error', error);
      return 'Failed to delete user';
    }
  }
}
