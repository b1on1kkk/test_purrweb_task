import { UpdateUserDto } from '../../../../api/src/dtos/userUpdate.dto';

export namespace UsersUpdate {
  export const topic = 'update_user';

  export class Request extends UpdateUserDto {
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
