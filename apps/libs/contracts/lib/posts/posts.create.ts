import { newPost } from 'apps/api/src/dtos/post.dto';

export namespace PostsCreate {
  export const topic = 'create_post';

  export class Request extends newPost {}

  export class Response {
    id: number;
    title: string;
    content: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
  }

  export class Error {
    status: number;
    message: string;
  }
}
