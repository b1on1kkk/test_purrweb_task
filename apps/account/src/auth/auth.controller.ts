import { EventPattern } from '@nestjs/microservices';
import { Controller, UseFilters } from '@nestjs/common';

import { UnauthorizedFilter } from '../filters/unauthorized.filters';

import { AuthService } from './auth.service';

import { LoginDto } from 'apps/api/src/dtos/login.dto';
import { RegisterDto } from 'apps/api/src/dtos/register.dto';
import { AccountLogin } from 'apps/libs/contracts/lib/account/account.login';
import { AccountRegister } from 'apps/libs/contracts/lib/account/account.registration';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('auth_login_user')
  @UseFilters(UnauthorizedFilter)
  async handleUserLogin(data: LoginDto): Promise<AccountLogin.Response> {
    const { id, role } = await this.authService.validateUser(
      data.email,
      data.password,
    );

    return await this.authService.login(id, role);
  }

  @EventPattern('auth_register_user')
  @UseFilters(UnauthorizedFilter)
  async handleUserRegistration(
    data: RegisterDto,
  ): Promise<AccountRegister.Response> {
    return await this.authService.register(data);
  }
}
