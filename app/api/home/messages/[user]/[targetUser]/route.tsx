import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const userId = req.nextUrl.pathname.split('/')[4];
    const targetUserId = req.nextUrl.pathname.split('/')[5];
    try {
        const prisma = new PrismaClient();
        const relevantMessages = await prisma.messages.findMany({
            include: {
                user: true
            },
            where: {
                OR: [
                    {
                        user_id: Number(userId),
                        target_user_id: Number(targetUserId)
                    },
                    {
                        user_id: Number(targetUserId),
                        target_user_id: Number(userId)
                    }
                ]
            }
        });
        return new Response(JSON.stringify(relevantMessages));    
    } catch (error) {
        console.log(`Failed to Fetch Message: ${error}`);
    }
    return new Response(`Failed to Fetch Message`);
}