export interface IPost {
  id?: number;
  title: string;
  content: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
