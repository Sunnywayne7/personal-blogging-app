import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtGuard } from 'src/author/auth/guard';
import { ArticlesService } from './articles.service';
import { GetAuthor } from 'src/author/auth/decorator/get-author.deco';
import { ObjectId } from 'mongoose';
import { CreateArticleDto } from './dto/create-Article.dto';
import { updateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
    constructor(private articlesService: ArticlesService) {}
    @UseGuards(JwtGuard)
    @Post('createPost')
    createArticle(@GetAuthor('id') authorId: ObjectId, @Body() dto: CreateArticleDto) {
        return this.articlesService.createArticle(authorId, dto);
    }

    @Get('posts')
    getArticle(){
        return this.articlesService.getArticle()
    }

    @Get(':slug')
    getArticleBySlug(@Param('slug') slug: string){
        return this.articlesService.getArticleBySlug(slug);

    }


    @UseGuards(JwtGuard)
    @Patch(':slug')
    updateArticleBySlug(@Param('slug') slug: string, @Body() dto: updateArticleDto){
        return this.articlesService.updateArticleBySlug(slug, dto);
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteArticleById(@Param('id') id: string) {
        return this.articlesService.deleteArticleById(id);
    }


    
}
