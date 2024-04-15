import { PrismaClient } from "@prisma/client";

export const GET = async () => {
    const prisma = new PrismaClient();
    const totalNetworks = await prisma.networks.findMany({
        include: {
            user: true,
            profile: true
        }
    });
    return new Response(JSON.stringify(totalNetworks));
}