import { PrismaClient } from "@prisma/client";

export const GET = async () => {
    try {
        const prisma = new PrismaClient();
        const users = await prisma.users.findMany({
            include: {
                networks: true,
                profile: true
            }
        });
        return new Response(JSON.stringify(users));   
    } catch (error) {
        console.log(`Error Fetching Users: ${error}`)
    }
    return new Response(`Error Fetching Users`);
}