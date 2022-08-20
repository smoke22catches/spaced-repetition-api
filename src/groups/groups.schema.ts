import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Card } from 'src/cards/cards.schema';

@Schema()
export class Group {
    @Prop()
    name: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }] })
    subgroups: Group[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }] })
    cards: Card[];
}

export type GroupDocument = Group & Document;
export const GroupSchema = SchemaFactory.createForClass(Group);
