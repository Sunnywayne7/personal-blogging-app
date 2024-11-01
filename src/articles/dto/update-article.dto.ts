import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class updateArticleDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    content?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    slug?: string;

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