import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[4];
    const prisma = new PrismaClient();
    const acceptedNetworks = await prisma.networks.findMany({
        include: {
            user: true,
            profile: true
        },
        where: {
            OR: [
                {
                    user_id_from: Number(profileUserId)
                },
                {
                    user_id_to: Number(profileUserId)
                }
            ]
        }
    });
    return new Response(JSON.stringify(acceptedNetworks));
}