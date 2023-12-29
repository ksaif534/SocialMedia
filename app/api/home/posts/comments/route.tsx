import { PrismaClient } from "@prisma/client";

export const GET = async () => {
    const prisma = new PrismaClient();
    const comments  = prisma.comments.findMany();
}