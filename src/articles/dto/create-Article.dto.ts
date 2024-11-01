import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsString({ each: true })
    @IsOptional()
    @IsArray()
    keywords?: string[];

    @IsString({ each: true })
    @IsOptional()
    @IsArray()
    tags?: string[];

    @IsString({ each: true })
    @IsOptional()
    @IsArray()
    categories?: string[];
}