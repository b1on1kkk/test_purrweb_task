export namespace PostsGetById {
  export const topic = 'get_by_id_post';

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
