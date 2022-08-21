import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsController } from './cards/cards.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_INSTANCE_URL),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController, CardsController],
  providers: [AppService],
})
export class AppModule {}
