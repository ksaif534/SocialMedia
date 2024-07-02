import { PrismaClient } from "@prisma/client";

export const GET = async () => {
    try {
        const prisma = new PrismaClient();
        const totalNetworks = await prisma.networks.findMany({
            include: {
                user: true,
                profile: true
            }
        });
        return new Response(JSON.stringify(totalNetworks));    
    } catch (error) {
        console.log(`Failed to Fetch Networks: ${error}`);
    }
    return new Response(`Failed to Fetch Networks`);
}