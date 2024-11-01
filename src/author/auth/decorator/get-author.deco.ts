import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetAuthor = createParamDecorator(
  (data : string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
        return request.user[data]
        //incase we have something like  get(@GetAuthor('id') authorId: number)
    }
    return request.user
  },
);