import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory, AsyncModelFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from "bcryptjs";
import { Group } from "src/groups/groups.schema";
import { Card } from "src/cards/cards.schema";

const SALT_ROUNDS = 10;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }] })
    subgroups: Group[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }] })
    cards: Card[];

    [x: string]: any; // for calling methods, that defined in factory
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

export const UserFactory: AsyncModelFactory = {
    name: User.name,
    useFactory: () => {
        const schema = UserSchema;
        schema.pre("save", function(next) {
            if (this.isModified("password") || this.isNew) {
                bcrypt.genSalt(SALT_ROUNDS, function(saltErr, salt) {
                    if (saltErr) {
                        return next(saltErr);
                    }

                    bcrypt.hash(this.password, salt, function(hashErr, hash) {
                        if (hashErr) {
                            return next(hashErr);
                        }

                        this.password = hash;
                        next();
                    })
                })
            } else {
                next();
            }
        })
        schema.methods.validatePassword = function(password) {
            return new Promise((res, rej) => {
                bcrypt.compare(this.password, password, function(err, match) {
                    if (err) {
                        rej(err)
                    } else {
                        res(match)
                    }                    
                })
            })
        }
        return schema;
    }
}
