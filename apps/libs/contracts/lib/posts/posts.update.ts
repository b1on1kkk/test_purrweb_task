import { UpdatePostDto } from 'apps/api/src/dtos/postUpdate.dto';

export namespace PostsUpdate {
  export const topic = 'update_post';

  export class Request extends UpdatePostDto {
    id: number;
  }

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
