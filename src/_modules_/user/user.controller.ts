import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { UsersService } from './user.service';
@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @Auth('ALL')
  whoAmI(@User('id') userId: number) {
    return this.userService.findById(userId);
  }

  @Delete()
  @Auth('ADMIN')
  async delete(@Param('id') id: number) {
    return this.userService.deleteById(+id);
  }

  @Post('/sendMail')
  // @Auth('ADMIN')
  async getAllUser() {
    return this.userService.sendMail();
  }
}
