export class Decimal {
  constructor(public value: any) {}
}

export const Prisma = { Decimal };

export class PrismaClient {
  user = {
    create: async (_data?: any) => ({}),
    findUnique: async (_args?: any) => null
  };

  car = {
    create: async (_args?: any) => ({}),
    findMany: async (_args?: any) => [],
    delete: async (_args?: any) => ({}),
    update: async (_args?: any) => ({}),
    findUnique: async (_args?: any) => null
  };
}

export type User = import('../src/@types/prisma-models').User;
export type Car = import('../src/@types/prisma-models').Car;
