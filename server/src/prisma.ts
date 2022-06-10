import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({

    log: ['query'] // tells prisma to log any query it creates (SELECT, INSERT, UPDATE, DELETE..)
})