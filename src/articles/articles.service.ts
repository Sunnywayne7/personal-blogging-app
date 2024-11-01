import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { CreateArticleDto } from './dto/create-Article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from 'schemas/Article.schema';
import { updateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
    constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}
    async createArticle(authorId: ObjectId, dto: CreateArticleDto){
       try {
        const newArticle = await this.articleModel.create({
            author: authorId,
            ...dto

        })
        return newArticle;
       } catch(error) {
         throw error;
    }
}

async getArticle() {
    try {
        const allArticles = await this.articleModel.find().populate('author');
        if(!allArticles) {
            throw new NotFoundException("sorry!...no articles found!!")
        }
        return allArticles;
    } catch(error) {
        throw error;
    }
}

async getArticleBySlug(slug: string) {
    try {
        const getSlug = await this.articleModel.findOne({slug});
        if(!getSlug){
            throw new NotFoundException('sorry!...article not founnd!!')
        }
        return getSlug;
    } catch(error) {
        console.error(error);
        throw error;

    }
}

async updateArticleBySlug(slug: string, dto: updateArticleDto) {
    try {
        const updateArticle = await this.articleModel.findOneAndUpdate(
            { slug },
            { $set: {...dto} },
            { new: true }
        )
        if(!updateArticle){
            throw new NotFoundException('sorry!...article not found!!')
        }
        return updateArticle;
    } catch (error) {
        throw error;
    }
}

async deleteArticleById(id: string){
    return this.articleModel.findByIdAndDelete(id)

}
}
