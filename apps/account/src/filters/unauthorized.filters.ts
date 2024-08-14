import {
  Catch,
  Logger,
  HttpStatus,
  RpcExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';

@Catch(UnauthorizedException)
export class UnauthorizedFilter
  implements RpcExceptionFilter<UnauthorizedException>
{
  private readonly logger = new Logger();

  constructor() {}

  catch(exception: UnauthorizedException): Observable<any> {
    this.logger.error(`${HttpStatus.UNAUTHORIZED} error: ${exception.message}`);

    return throwError(() => ({
      statusCode: exception.getStatus(),
      message: exception.message,
    }));
  }
}
