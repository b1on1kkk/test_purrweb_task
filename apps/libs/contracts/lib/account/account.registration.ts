import { IsEmail, IsString } from 'class-validator';

export namespace AccountRegister {
  export const topic = 'auth_register_user';

  export class Request {
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    password: string;
  }

  export class Response {
    email: string;
  }

  export class Error {
    status: number;
    message: string;
  }
}
