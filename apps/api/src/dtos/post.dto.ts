import { IsNumber, IsString } from 'class-validator';

export class newPost {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  user_id: number;
}
