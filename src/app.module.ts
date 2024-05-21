import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './_modules_/auth/auth.module';
import { PrismaModule } from './_modules_/prisma/prisma.module';
import { UsersModule } from './_modules_/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';
import { CommentService } from './comment/comment.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'lamvanhung41@gmail.com',
          pass: 'umsn vthu kvlj ajyx',
        },
      },
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot(),
    CommentModule,
  ],
  controllers: [AppController, CommentController],
  providers: [AppService, CommentService],
})
export class AppModule {}
