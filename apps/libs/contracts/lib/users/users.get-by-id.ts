export namespace UsersGetById {
  export const topic = 'get_user_by_id';

  export class Request {
    id: number;
  }

  export class Response {
    id: number;
    email: string;
    role: 'admin' | 'user';
    created_at: Date;
    updated_at: Date;
  }

  export class Error {
    status: number;
    message: string;
  }
}
