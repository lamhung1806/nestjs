import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './register-user.dto';
import { AuthService } from './auth.service';
import { Claims } from 'src/type/auth.type';
import { User } from 'src/decorators/user.decorator';
import { ApiBody } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { RenewDto, SignInDto, SignUpDto } from './auth.dto';
import { JwtRefreshAuthGuard } from 'src/guards/jwt-refresh.guard';
@Controller('auth')
export class AuthController {
  constructor(private authServeice: AuthService) {}
  @Post('/register')
  @ApiBody({ type: SignUpDto })
  register(@Body() registerUserDto: RegisterUserDto): any {
    return this.authServeice.signUp(registerUserDto);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: SignInDto })
  login(@User() claims: Claims): any {
    return this.authServeice.signIn(claims);
  }

  @Post('/renew')
  @ApiBody({ type: RenewDto })
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(
    @User('id') userId: number,
    @Body('refreshToken') refreshToken: string,
  ) {
    return this.authServeice.refreshToken(userId, refreshToken);
  }
}
