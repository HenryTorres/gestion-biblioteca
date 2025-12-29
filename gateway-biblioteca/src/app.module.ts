import { Module } from '@nestjs/common';
import { UsersModule } from './ms_client/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
