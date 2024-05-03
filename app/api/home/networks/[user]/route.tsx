import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const userId = req.nextUrl.pathname.split('/')[4];
    const prisma = new PrismaClient();
    const pendingRecipientUserNetworks = await prisma.networks.findMany({
        include: {
            user: true
        },
        where: {
            user_id_to: Number(userId),
            status: 2
        }
    });
    return new Response(JSON.stringify(pendingRecipientUserNetworks));
}