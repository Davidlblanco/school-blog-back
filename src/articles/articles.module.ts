import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ArticlesService } from './articles.service';
import { ArticleController } from './articles.controller';

@Module({
  imports: [
    JwtModule.register({
      // secret: 'your-secret-key', // Replace with your secret key
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [ArticleController],
  providers: [ArticlesService, PrismaService],
})
export class ArticlesModule {}
