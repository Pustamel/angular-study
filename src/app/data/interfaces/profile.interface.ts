export interface Profile {
  id: number | string;
  username: string;
  avatarUrl: string | null;
  subscribersAmount: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  stack: string[] | [];
  city: string;
  description: string;
}

export interface Pageable<T>{
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
