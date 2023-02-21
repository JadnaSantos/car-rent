import { Decimal } from '@prisma/client/runtime';

interface CarsDTO {
  id?: string;
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

interface UpdateCar {
  id: string;
}

export { CarsDTO, UpdateCar };
