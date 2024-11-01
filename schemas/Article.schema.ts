import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date } from "mongoose";
import { Author } from "./Author.schema";

@Schema()
export class Article {
    @Prop({ required: true, unique: true })
    title: String;

    @Prop({ required: true})
    content: String;

    @Prop({type: Date})
    createdAt: Date;

    @Prop({ type: Date})
    updatedAt: Date;

    @Prop({unique: true})
    slug: String;

    @Prop()
    keywords: [String];

    @Prop()
    categories: [String];

    @Prop()
    tags: [String];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref:'Author'})
    author: Author;
}

export const articleSchema = SchemaFactory.createForClass(Article);