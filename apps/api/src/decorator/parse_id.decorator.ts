import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParseId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const id = request.params.id;

    return typeof id === 'string' ? parseInt(id, 10) : id;
  },
);
