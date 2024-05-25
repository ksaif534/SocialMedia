import { PrismaClient } from "@prisma/client";

export const GET = async () => {
    const prisma = new PrismaClient();
    const profiles = await prisma.profiles.findMany({
        include: {
            user: true
        }
    });
    return new Response(JSON.stringify(profiles));
}