import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [AuthModule, UserModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
