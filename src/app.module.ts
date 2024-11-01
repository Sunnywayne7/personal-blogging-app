import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthorModule } from './author/author.module';
import { AuthModule } from './author/auth/auth.module';


@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://Sunnywayne:Sunday70*@sunnywayne-cluster.ss5gv.mongodb.net/personalBlog?retryWrites=true&w=majority&appName=Sunnywayne-cluster"),
    ArticlesModule,
    AuthModule,
    ConfigModule.forRoot({isGlobal:true}),
    AuthorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
    