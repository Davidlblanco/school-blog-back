import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      // secret: 'your-secret-key', // Replace with your secret key
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
