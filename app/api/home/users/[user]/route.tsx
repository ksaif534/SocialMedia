import { PrismaClient } from "@prisma/client"
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest | any) => {
    const prisma = new PrismaClient();
    const userId = await req.nextUrl.pathname.split('/')[4];
    try {
        const getUser = await prisma.users.findFirst({
            include: {
                profile: true
            },
            where: {
                id: Number(userId)
            }
        })
        return new Response(JSON.stringify(getUser));    
    } catch (error) {
        console.log(`Error Fetching Specific User: ${error}`)
    }
    return new Response(`Error Fetching Specific User`);
}