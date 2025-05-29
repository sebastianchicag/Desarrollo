import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PersonsModule } from './persons/persons.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    UsersModule,
    AuthModule,
    PersonsModule,
  ],
})
export class AppModule {}
