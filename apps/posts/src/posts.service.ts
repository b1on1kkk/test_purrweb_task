import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';

import { PostsRepository } from './repositories/posts.repository';
import { UsersRepository } from 'apps/account/src/users/repositories/users.repository';

import { PostEntity } from './entities/posts.entity';

import { PostsGetAll } from 'apps/libs/contracts';
import { PostsCreate } from 'apps/libs/contracts/lib/posts/posts.create';
import { PostsUpdate } from 'apps/libs/contracts/lib/posts/posts.update';
import { PostsDelete } from 'apps/libs/contracts/lib/posts/posts.delete';
import { PostsGetById } from 'apps/libs/contracts/lib/posts/posts.get-by-id';

import { buildFilteringQuery } from './utils/buildFilteringQuery.util';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getPosts(
    data: PostsGetAll.Request,
  ): Promise<Array<PostsGetAll.Response>> {
    try {
      const filtering = buildFilteringQuery(data);

      return await this.postsRepository.getPosts({ ...filtering });
    } catch (error) {
      throw new ServiceUnavailableException('Service unavailable right now!');
    }
  }

  async createPost(data: PostsCreate.Request): Promise<PostsCreate.Response> {
    try {
      const user = await this.usersRepository.findUserBy({
        where: { id: data.user_id },
      });

      if (!user) throw new NotFoundException('User is not found!');

      const newPostEntity = new PostEntity({
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const newPost = this.postsRepository.createPost({ data: newPostEntity });

      return newPost;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new ServiceUnavailableException('Service unavailable right now!');
    }
  }

  async getPostById({
    id,
  }: PostsGetById.Request): Promise<PostsGetById.Response> {
    try {
      const post = await this.postsRepository.findPostBy({ where: { id } });

      if (!post) throw new NotFoundException('Post not found!');

      return post;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new ServiceUnavailableException('Service unavailable right now!');
    }
  }

  async updatePostById(
    data: PostsUpdate.Request,
  ): Promise<PostsUpdate.Response> {
    try {
      const post = await this.postsRepository.findPostBy({
        where: { id: data.id },
      });
      if (!post) throw new NotFoundException('Post not found!');

      const user = await this.usersRepository.findUserBy({
        where: { id: data.user_id },
      });
      if (!user) throw new NotFoundException('User is not found!');

      const { id, ...rest } = data;
      const newPostEntity = new PostEntity({ ...post, ...rest });

      return this.postsRepository.updatePost({
        where: { id },
        data: newPostEntity,
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new ServiceUnavailableException('Service unavailable right now!');
    }
  }

  async deletePostById({
    id,
  }: PostsDelete.Request): Promise<Array<PostsDelete.Response>> {
    try {
      const post = await this.postsRepository.findPostBy({
        where: { id },
      });
      if (!post) throw new NotFoundException('Post not found!');

      await this.postsRepository.deletePost({ where: { id } });

      return await this.postsRepository.getPosts({});
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new ServiceUnavailableException('Service unavailable right now!');
    }
  }
}
