import { IPost } from 'apps/libs/interfaces';

export class PostEntity implements IPost {
  id?: number;
  title: string;
  content: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;

  constructor(post: IPost) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.user_id = post.user_id;
    this.created_at = post.created_at;
    this.updated_at = post.updated_at;
  }
}
