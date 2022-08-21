import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    async findOne(username: string): Promise<User | null> {
        return await this.userModel.findOne({ username }).exec();
    }

    async add(username: string, password: string): Promise<User> {
        const user = new this.userModel({ username, password });
        return user.save();
    }
}
