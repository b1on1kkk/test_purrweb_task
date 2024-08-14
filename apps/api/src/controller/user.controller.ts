import {
  Get,
  Put,
  Body,
  Query,
  Delete,
  Inject,
  UseGuards,
  Controller,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxy } from '@nestjs/microservices';

import { catchError, lastValueFrom, throwError } from 'rxjs';

import { JWTAuthGuard } from '../guards/jwt.guard';

import { ParseId } from '../decorator/parse_id.decorator';
import { HasRoles } from '../decorator/has-role.decorator';

import { UpdateUserDto } from '../dtos/userUpdate.dto';

import {
  UsersGetAll,
  UsersUpdate,
  UsersDelete,
  UsersGetById,
} from 'apps/libs/contracts';

import { Roles } from 'apps/libs/enums';
import { MultiFiltrationData } from 'apps/libs/interfaces';

import { MultiFiltration } from '../pipes/multi_filtration.pipe';

@Controller('users')
export class UserController {
  constructor(@Inject('ACCOUNT') private readonly accountClient: ClientProxy) {}

  @Get()
  @HasRoles(Roles.ADMIN)
  @UseGuards(AuthGuard('jwt'), JWTAuthGuard)
  async getAllUsers(
    @Query(MultiFiltration) to_filter: MultiFiltrationData,
  ): Promise<Array<UsersGetAll.Response>> {
    return await lastValueFrom(
      this.accountClient
        .send<
          Array<UsersGetAll.Response>,
          UsersGetAll.Request
        >(UsersGetAll.topic, { to_filter })
        .pipe(
          catchError((err: UsersGetAll.Error) =>
            throwError(() => new HttpException(err.message, err.status)),
          ),
        ),
    );
  }

  @Get(':id')
  @HasRoles(Roles.ADMIN, Roles.USER)
  @UseGuards(AuthGuard('jwt'), JWTAuthGuard)
  async getUserById(@ParseId() id: number): Promise<UsersGetById.Response> {
    return await lastValueFrom(
      this.accountClient
        .send<
          UsersGetById.Response,
          UsersGetById.Request
        >(UsersGetById.topic, { id })
        .pipe(
          catchError((err: UsersGetById.Error) =>
            throwError(() => new HttpException(err.message, err.status)),
          ),
        ),
    );
  }

  @Put(':id')
  @HasRoles(Roles.ADMIN, Roles.USER)
  @UseGuards(AuthGuard('jwt'), JWTAuthGuard)
  async updateUserById(
    @ParseId() id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<UsersUpdate.Response> {
    return await lastValueFrom(
      this.accountClient
        .send<
          UsersUpdate.Response,
          UsersUpdate.Request
        >(UsersUpdate.topic, { id, ...dto })
        .pipe(
          catchError((err: UsersUpdate.Error) =>
            throwError(() => new HttpException(err.message, err.status)),
          ),
        ),
    );
  }

  @Delete(':id')
  @HasRoles(Roles.ADMIN, Roles.USER)
  @UseGuards(AuthGuard('jwt'), JWTAuthGuard)
  async deleteUserById(@ParseId() id: number): Promise<UsersDelete.Response> {
    return await lastValueFrom(
      this.accountClient
        .send<
          UsersDelete.Response,
          UsersDelete.Request
        >(UsersDelete.topic, { id })
        .pipe(
          catchError((err: UsersDelete.Error) =>
            throwError(() => new HttpException(err.message, err.status)),
          ),
        ),
    );
  }
}
