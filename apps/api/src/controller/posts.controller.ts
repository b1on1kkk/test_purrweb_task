import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxy } from '@nestjs/microservices';

import { catchError, lastValueFrom, throwError } from 'rxjs';

import { newPost } from '../dtos/post.dto';
import { UpdatePostDto } from '../dtos/postUpdate.dto';

import { ParseId } from '../decorator/parse_id.decorator';
import { HasRoles } from '../decorator/has-role.decorator';

import {
  PostsCreate,
  PostsDelete,
  PostsGetAll,
  PostsGetById,
  PostsUpdate,
} from 'apps/libs/contracts';
import { Roles } from 'apps/libs/enums';
import { MultiFiltrationData } from 'apps/libs/interfaces';

import { JWTAuthGuard } from '../guards/jwt.guard';

import { MultiFiltration } from '../pipes/multi_filtration.pipe';

@Controller('posts')
export class PostsController {
  constructor(@Inject('POSTS') private readonly postsClient: ClientProxy) {}

  @Get()
  async getPosts(@Query(MultiFiltration) to_filter: MultiFiltrationData) {
    return await lastValueFrom(
      this.postsClient
        .send<
          Array<PostsGetAll.Response>,
          PostsGetAll.Request
        >(PostsGetAll.topic, { to_filter })
        .pipe(
          catchError((err: PostsGetAll.Error) =>
            throwError(() => new HttpException(err.message, err.status)),
          ),
        ),
    );
  }

  @Post()
  @HasRoles(Roles.USER, Roles.ADMIN)
  @UseGuards(AuthGuard('jwt'), JWTAuthGuard)
  async createPost(@Body() dto: newPost) {
    return await lastValueFrom(
      this.postsClient
        .send<PostsCreate.Response, PostsCreate.Request>(PostsCreate.topic, dto)
        .pipe(
          catchError((err: PostsCreate.Error) =>
            throwError(() => new HttpException(err.message, err.status)),
          ),
        ),
    );
  }

  @Get(':id')
  async getPostById(@ParseId() id: number) {
    return await lastValueFrom(
      this.postsClient
        .send<
          PostsGetById.Response,
          PostsGetById.Request
        >(PostsGetById.topic, { id })
        .pipe(
          catchError((err: PostsGetById.Error) =>
            throwError(() => new HttpException(err.message, err.status)),
          ),
        ),
    );
  }

  @Put(':id')
  @HasRoles(Roles.USER)
  @UseGuards(AuthGuard('jwt'), JWTAuthGuard)
  async updatePostById(@ParseId() id: number, @Body() dto: UpdatePostDto) {
    return await lastValueFrom(
      this.postsClient
        .send<
          PostsUpdate.Response,
          PostsUpdate.Request
        >(PostsUpdate.topic, { id, ...dto })
        .pipe(
          catchError((err: PostsUpdate.Error) =>
            throwError(() => new HttpException(err.message, err.status)),
          ),
        ),
    );
  }

  @Delete(':id')
  @HasRoles(Roles.ADMIN, Roles.USER)
  @UseGuards(AuthGuard('jwt'), JWTAuthGuard)
  async deletePostById(@ParseId() id: number) {
    return await lastValueFrom(
      this.postsClient
        .send<
          PostsDelete.Response,
          PostsDelete.Request
        >(PostsDelete.topic, { id })
        .pipe(
          catchError((err: PostsDelete.Error) =>
            throwError(() => new HttpException(err.message, err.status)),
          ),
        ),
    );
  }
}
