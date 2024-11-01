import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Author {
    @Prop({ required: true})
    authorName: String;

    @Prop({required: true, unique: true })
    email: string;

    @Prop({required: true})
    hash: string;

    @Prop({default: Date.now})
    createdAt: Date;

    @Prop({default: Date.now})
    updatedAt: Date;

}

export const authorSchema = SchemaFactory.createForClass(Author)