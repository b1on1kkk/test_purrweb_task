import { EventPattern } from '@nestjs/microservices';
import { Controller, UseFilters } from '@nestjs/common';

import { PostsService } from './posts.service';

import { NotFoundFilter } from './filters/not_found.filter';
import { ServiceUnavailableFilter } from './filters/service_unavailable.filters';

import { PostsGetAll } from 'apps/libs/contracts';
import { PostsCreate } from 'apps/libs/contracts/lib/posts/posts.create';
import { PostsUpdate } from 'apps/libs/contracts/lib/posts/posts.update';
import { PostsDelete } from 'apps/libs/contracts/lib/posts/posts.delete';
import { PostsGetById } from 'apps/libs/contracts/lib/posts/posts.get-by-id';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @EventPattern('get_all_posts')
  @UseFilters(ServiceUnavailableFilter)
  async getPosts(
    data: PostsGetAll.Request,
  ): Promise<Array<PostsGetAll.Response>> {
    return await this.postsService.getPosts(data);
  }

  @EventPattern('create_post')
  @UseFilters(ServiceUnavailableFilter, NotFoundFilter)
  async createPost(data: PostsCreate.Request): Promise<PostsCreate.Response> {
    return await this.postsService.createPost(data);
  }

  @EventPattern('get_by_id_post')
  @UseFilters(ServiceUnavailableFilter, NotFoundFilter)
  async getPostById(id: PostsGetById.Request): Promise<PostsGetById.Response> {
    return await this.postsService.getPostById(id);
  }

  @EventPattern('update_post')
  @UseFilters(ServiceUnavailableFilter, NotFoundFilter)
  async updatePostById(
    data: PostsUpdate.Request,
  ): Promise<PostsUpdate.Response> {
    return await this.postsService.updatePostById(data);
  }

  @EventPattern('delete_post')
  @UseFilters(ServiceUnavailableFilter, NotFoundFilter)
  async deletePostById(
    data: PostsDelete.Request,
  ): Promise<Array<PostsDelete.Response>> {
    return await this.postsService.deletePostById(data);
  }
}
