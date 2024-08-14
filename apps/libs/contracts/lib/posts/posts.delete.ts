export namespace PostsDelete {
  export const topic = 'delete_post';

  export class Request {
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
