import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[4];
    try {
        const prisma = new PrismaClient();
        const profileNetworks = await prisma.networks.findMany({
            include: {
                user: true,
                profile: true
            },
            where: {
                AND: [
                    {
                        user_id_from: Number(profileUserId)
                    },
                    {
                        status: 1
                    }
                ]
            }
        });
        return new Response(JSON.stringify(profileNetworks));   
    } catch (error) {
        console.log(`Failed to Fetch Networks: ${error}`)
    }
    return new Response(`Failed to Fetch Networks`);
}