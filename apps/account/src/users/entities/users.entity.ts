import { IUser } from 'apps/libs/interfaces';

import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUser {
  id?: number;
  email: string;
  password: string;
  role: 'user' | 'admin';
  created_at: Date;
  updated_at: Date;

  constructor(user: IUser) {
    this.id = user.id;
    this.role = user.role;
    this.email = user.email;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
    this.password = user.password;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.password = await hash(password, salt);
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.password);
  }
}
