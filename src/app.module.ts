import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsController } from './cards/cards.controller';
import { UserFactory } from './users/users.schema';
require('dotenv').config();

console.log(process.env.MONGO_DB_INSTANCE_URL)
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_INSTANCE_URL),
    MongooseModule.forFeatureAsync([
      UserFactory,
    ])
  ],
  controllers: [AppController, CardsController],
  providers: [AppService],
})
export class AppModule {}
