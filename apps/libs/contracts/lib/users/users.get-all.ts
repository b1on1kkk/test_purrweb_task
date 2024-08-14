import { MultiFiltrationData } from 'apps/libs/interfaces';

export namespace UsersGetAll {
  export const topic = 'get_all_users';

  export class Request {
    to_filter: MultiFiltrationData;
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
