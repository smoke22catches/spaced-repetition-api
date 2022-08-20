import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document} from "mongoose";

@Schema()
export class Card {
    @Prop()
    question: string;

    @Prop()
    answer: string;

    @Prop()
    revealDate: Date;
}

export type CardDocument = Card & Document;
export const CardSchema = SchemaFactory.createForClass(Card);
