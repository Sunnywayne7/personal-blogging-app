import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, articleSchema } from 'schemas/Article.schema';
import { Author, authorSchema } from 'schemas/Author.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Author.name,
      schema: authorSchema
    },
    {
      name: Article.name,
      schema: articleSchema
    }
  ])],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
