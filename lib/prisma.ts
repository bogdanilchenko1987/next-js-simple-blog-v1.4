/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => new PrismaClient();

export const prisma = (globalThis as any).prisma || prismaClientSingleton();

// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
// }

declare global {
  const prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

if (process.env.NODE_ENV !== "production") {
  (globalThis as any).prisma = prisma;
}
