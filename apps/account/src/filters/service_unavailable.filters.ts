import {
  Catch,
  Logger,
  HttpStatus,
  RpcExceptionFilter,
  ServiceUnavailableException,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';

@Catch(ServiceUnavailableException)
export class ServiceUnavailableFilter
  implements RpcExceptionFilter<ServiceUnavailableException>
{
  private readonly logger = new Logger();

  constructor() {}

  catch(exception: ServiceUnavailableException): Observable<any> {
    this.logger.error(
      `${HttpStatus.SERVICE_UNAVAILABLE} error: ${exception.message}`,
    );

    return throwError(() => ({
      statusCode: exception.getStatus(),
      message: exception.message,
    }));
  }
}
