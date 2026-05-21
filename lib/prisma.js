import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // Avoid instantiating multiple instances of Prisma in development
  if (!globalThis._prismaClient) {
    globalThis._prismaClient = new PrismaClient();
  }
  prisma = globalThis._prismaClient;
}

export { prisma as db };
