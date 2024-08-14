import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { map, Observable } from 'rxjs';

import { User } from '@prisma/client';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: Array<User> | User) => {
        if (Array.isArray(data) && data.length > 0) {
          return data.map((item) => {
            const { password, ...rest } = item;
            return rest;
          });
        }

        if (Array.isArray(data) && data.length === 0) return [];

        if (!Array.isArray(data)) {
          const { password, ...rest } = data;
          return rest;
        }
      }),
    );
  }
}
