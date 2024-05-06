import { Module } from '@nestjs/common';
import { AuthModule } from './_modules_/auth/auth.module';
import { UsersModule } from './_modules_/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './_modules_/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
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
