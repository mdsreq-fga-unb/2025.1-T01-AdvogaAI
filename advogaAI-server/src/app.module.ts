import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './client/clients.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [ClientsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
