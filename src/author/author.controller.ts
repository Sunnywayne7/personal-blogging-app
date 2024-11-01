import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Author } from 'schemas/Author.schema';
import { JwtGuard } from './auth/guard';
import { GetAuthor } from './auth/decorator/get-author.deco';


@UseGuards(JwtGuard)
@Controller('author')
export class AuthorController {
    @Get('admin')
    get(@GetAuthor() author: Author) {
        return author;
    }


}
