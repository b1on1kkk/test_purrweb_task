export namespace UsersDelete {
  export const topic = 'delete_user';

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
