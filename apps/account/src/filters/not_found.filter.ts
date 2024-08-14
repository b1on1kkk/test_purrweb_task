import {
  Catch,
  Logger,
  HttpStatus,
  NotFoundException,
  RpcExceptionFilter,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';

@Catch(NotFoundException)
export class NotFoundFilter implements RpcExceptionFilter<NotFoundException> {
  private readonly logger = new Logger();

  constructor() {}

  catch(exception: NotFoundException): Observable<any> {
    this.logger.error(`${HttpStatus.NOT_FOUND} error: ${exception.message}`);

    return throwError(() => ({
      statusCode: exception.getStatus(),
      message: exception.message,
    }));
  }
}
