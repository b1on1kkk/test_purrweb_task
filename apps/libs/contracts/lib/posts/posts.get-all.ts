import { MultiFiltrationData } from 'apps/libs/interfaces';

export namespace PostsGetAll {
  export const topic = 'get_all_posts';

  export class Request {
    to_filter: MultiFiltrationData;
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
