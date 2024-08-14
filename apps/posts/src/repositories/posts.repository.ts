import { Injectable } from '@nestjs/common';

import { PrismaService } from 'apps/prisma';

import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(params: { data: Prisma.PostCreateInput }): Promise<Post> {
    const { data } = params;
    return this.prismaService.post.create({ data });
  }

  async findPostBy(params: { where?: Prisma.PostWhereInput }): Promise<Post> {
    const { where } = params;
    return this.prismaService.post.findFirst({ where });
  }

  async getPosts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Array<Post>> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { where, data } = params;
    return this.prismaService.post.update({ where, data });
  }

  async deletePost(params: {
    where: Prisma.PostWhereUniqueInput;
  }): Promise<Post> {
    const { where } = params;
    return this.prismaService.post.delete({ where });
  }
}
