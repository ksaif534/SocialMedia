import { PrismaClient } from "@prisma/client";

export const GET = async () => {
    const prisma = new PrismaClient();
    const users = await prisma.users.findMany({
        include: {
            networks: true,
            profile: true
        }
    });
    return new Response(JSON.stringify(users));
}