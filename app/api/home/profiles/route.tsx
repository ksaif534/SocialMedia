import { PrismaClient } from "@prisma/client";

export const GET = async () => {
    const prisma = new PrismaClient();
    try {
        const profiles = await prisma.profiles.findMany({
            include: {
                user: true
            }
        });
        return new Response(JSON.stringify(profiles));    
    } catch (error) {
        console.log(`Failed to Fetch Profiles: ${error}`);
    }
    return new Response(`Failed to Fetch Profiles`);
}