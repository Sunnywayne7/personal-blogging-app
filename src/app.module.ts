import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorModule } from './author/author.module';
import { AuthModule } from './author/auth/auth.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath: '.env'  
  }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(config: ConfigService) => {
        const connectionString = config.get('CONNECTION_STRING');
        if(!connectionString) {
          throw new Error('CONNECTION_STRING environment variable not found');
        
        }
        return ({uri: connectionString})
      }
    }),
    ArticlesModule,
    AuthModule,
    AuthorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
    