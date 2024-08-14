import { IsEmail, IsString } from 'class-validator';

export namespace AccountLogin {
  export const topic = 'auth_login_user';

  export class Request {
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    password: string;
  }

  export class Response {
    access_token: string;
  }

  export class Error {
    status: number;
    message: string;
  }
}
