import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Author } from 'schemas/Author.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(@InjectModel(Author.name) private authorModel: Model<Author>, private jwt: JwtService, private config: ConfigService) {}
    
    private get adminSignedUp(): boolean {
        return this.config.get('ADMIN_SIGNED_UP') === 'true';
    }

    async signUp({password, ...dto}: AuthDto) {

        if(this.adminSignedUp) {
            console.log(this.config.get('ADMIN_SIGNED_UP'))
            throw new UnauthorizedException('you are not permitted to sign up on this page');
        }
        
         //hash the password
        const hash = await argon.hash(password)

        //save the author in the db
        const newAuthor = await this.authorModel.create({
            email: dto.email,
            authorName: dto.authorName,
            hash
        })
        console.log(this.config.get('ADMIN_SIGNED_UP'))
        const authorObject = newAuthor.toObject()
        this.config.set('ADMIN_SIGNED_UP', 'true');
        return this.signToken(authorObject._id, authorObject.email);
        
    

        //return the authors
    }

    async signIn(dto: AuthDto) {

        //find the author by email
        const author = await this.authorModel.findOne({email: dto.email});

        //if author does not exist throw an error
        if(!author) throw new NotFoundException('invalid credentials');

        //compare the password
        const pwMatches = await argon.verify(author.hash, dto.password);
        if(!pwMatches) throw new UnauthorizedException('incorrect password');
        return this.signToken(author._id, author.email)
    }

   async signToken(authorId: Types.ObjectId, email: string): Promise<{token: string}> {
        const payload = ({
            sub: authorId,
            email
         })

         const secret = this.config.get('SECRET')
         const token = await this.jwt.signAsync(payload, ({
            expiresIn: '20m',
            secret: secret
         }))
         return {token: token}
         //this function is just to generate a token for the author
         //A strategy is used to verify if a token is correct in order for an authorization to take place
         
    }
}

