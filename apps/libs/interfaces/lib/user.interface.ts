type roles = 'admin' | 'user';

export interface IUser {
  id?: number;
  email: string;
  password: string;
  role: roles;
  created_at: Date;
  updated_at: Date;
}
