import { EventPattern } from '@nestjs/microservices';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';

import { UsersService } from './users.service';

import { ResponseTransformInterceptor } from './interceptors/responseTransform.interceptor';

import { NotFoundFilter } from '../filters/not_found.filter';
import { ServiceUnavailableFilter } from '../filters/service_unavailable.filters';

import {
  UsersUpdate,
  UsersDelete,
  UsersGetAll,
  UsersGetById,
} from 'apps/libs/contracts';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('get_all_users')
  @UseFilters(ServiceUnavailableFilter)
  @UseInterceptors(ResponseTransformInterceptor)
  async getAllUsers(
    data: UsersGetAll.Request,
  ): Promise<Array<UsersGetAll.Response>> {
    return await this.usersService.getAllUsers(data);
  }

  @EventPattern('get_user_by_id')
  @UseFilters(ServiceUnavailableFilter, NotFoundFilter)
  @UseInterceptors(ResponseTransformInterceptor)
  async getUserById(
    data: UsersGetById.Request,
  ): Promise<UsersGetById.Response> {
    return await this.usersService.getUserById(data);
  }

  @EventPattern('update_user')
  @UseFilters(ServiceUnavailableFilter, NotFoundFilter)
  @UseInterceptors(ResponseTransformInterceptor)
  async updateUserById(
    data: UsersUpdate.Request,
  ): Promise<UsersUpdate.Response> {
    return await this.usersService.updateUserById(data);
  }

  @EventPattern('delete_user')
  @UseFilters(ServiceUnavailableFilter, NotFoundFilter)
  @UseInterceptors(ResponseTransformInterceptor)
  async deleteUserById(
    data: UsersDelete.Request,
  ): Promise<Array<UsersDelete.Response>> {
    return await this.usersService.deleteUserById(data);
  }
}
