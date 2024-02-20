import { PrismaClient } from "@prisma/client";

export const GET = async () => {
    const prisma = new PrismaClient();
    const users = await prisma.users.findMany();
    return new Response(JSON.stringify(users));
}