import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from './shared/jwt/jwt.module';

@Module({
  imports: [JwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
