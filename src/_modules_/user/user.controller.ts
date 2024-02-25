import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './user.service';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './user.dto';
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

  @Get('/all')
  @Auth('ADMIN')
  async getAllUser(@Query() query: UserDto) {
    return this.userService.getAll(query);
  }
}
