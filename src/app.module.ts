import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from './orders/doctors.module';
import { config } from './orm.config';

@Module({
  imports: [TypeOrmModule.forRoot(config), DoctorsModule]
})
export class AppModule {}
