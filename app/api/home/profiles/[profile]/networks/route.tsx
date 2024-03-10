import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[4];
    const prisma = new PrismaClient();
    const networks = await prisma.networks.findMany({
        include: {
            users: true
        },
        where: {
            user_id_from: Number(profileUserId) 
        }
    });
    return new Response(JSON.stringify(networks));
}
