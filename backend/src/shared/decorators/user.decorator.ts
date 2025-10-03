import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser, RequestWithUser } from './../types/user-request.interface';

export const User = createParamDecorator(
  (
    key?: keyof AuthUser,
    ctx?: ExecutionContext,
  ): AuthUser | string | undefined => {
    const request = ctx?.switchToHttp().getRequest<RequestWithUser>();
    const user = request?.user;

    if (!user) return undefined;

    return key ? user[key] : user;
  },
);
