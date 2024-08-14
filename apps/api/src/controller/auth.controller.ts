import { ClientProxy } from '@nestjs/microservices';
import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';

import { catchError, lastValueFrom, throwError } from 'rxjs';

import { AccountLogin, AccountRegister } from 'apps/libs/contracts';

import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject('ACCOUNT') private readonly accountClient: ClientProxy) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<AccountLogin.Response> {
    return await lastValueFrom(
      this.accountClient
        .send<
          AccountLogin.Response,
          AccountLogin.Request
        >(AccountLogin.topic, dto)
        .pipe(
          catchError((err: AccountLogin.Error) =>
            throwError(() => new HttpException(err.message, err.status)),
          ),
        ),
    );
  }

  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<AccountRegister.Response> {
    return await lastValueFrom(
      this.accountClient
        .send<
          AccountRegister.Response,
          AccountRegister.Request
        >(AccountRegister.topic, dto)
        .pipe(
          catchError((err: AccountRegister.Error) =>
            throwError(() => new HttpException(err.message, err.status)),
          ),
        ),
    );
  }
}
