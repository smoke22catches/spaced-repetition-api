import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory, AsyncModelFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as crypto from "crypto";
import { Group } from "src/groups/groups.schema";
import { Card } from "src/cards/cards.schema";

const HASH_ITERATIONS = 1000;
const HASH_KEYLEN = 64;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false }) // salt must be set after password hashing
    salt: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }] })
    subgroups: Group[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }] })
    cards: Card[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

export const UserFactory: AsyncModelFactory = {
    name: User.name,
    useFactory: () => {
        const schema = UserSchema;
        schema.pre("save", function() {
            if (this.isModified("password") || this.isNew) {
                this.salt = crypto.randomBytes(16).toString("hex");
                this.password = crypto.pbkdf2Sync(this.password, this.salt, HASH_ITERATIONS, HASH_KEYLEN, "sha256").toString("hex");
            }
        })
        schema.methods.validatePassword = function(password) {
            const hash = crypto.pbkdf2Sync(password, this.salt, HASH_ITERATIONS, HASH_KEYLEN, "sha256").toString("hex");
            return this.hash == hash;
        }
        return schema;
    }
}
