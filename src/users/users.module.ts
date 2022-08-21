import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserFactory } from './users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([UserFactory])
  ],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
