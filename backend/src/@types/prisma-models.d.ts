import { Decimal } from '@prisma/client/runtime';

export interface User {
  id: string;
  username: string;
  password: string;
  phone: string;
  avatar?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Car {
  id: string;
  name: string;
  year: string;
  description: string;
  brand: string;
  banner: string;
  price: Decimal;
  kilometers: string;
  status: boolean;
  draft: boolean;
  userId: string;
}
