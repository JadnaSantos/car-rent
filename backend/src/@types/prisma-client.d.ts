declare module '@prisma/client' {
  export namespace Prisma {
    export import Decimal = import('@prisma/client/runtime').Decimal;
  }

  export class PrismaClient {
    user: {
      create(data: any): Promise<any>
      findUnique(args: any): Promise<any>
    }
    car: {
      create(args: any): Promise<any>
      findMany(args: any): Promise<any[]>
      delete(args: any): Promise<any>
      update(args: any): Promise<any>
      findUnique(args: any): Promise<any>
    }
  }

  export type User = import('./prisma-models').User;
  export type Car = import('./prisma-models').Car;
}
