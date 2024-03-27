import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[4];
    const prisma = new PrismaClient();
    const pendingNetworks = await prisma.networks.findMany({
        include: {
            user: true,
            profile: true
        },
        where: {
            user_id_to: Number(profileUserId),
            status: 2
        }
    });
    return new Response(JSON.stringify(pendingNetworks));
}