import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[4];
    const pendingNetwork = await req.json();
    const prisma = new PrismaClient();
    const networkToUpdate = await prisma.networks.update({
        include: {
            user: true
        },
        where: {
            id: pendingNetwork.id
        },
        data: {
            user_id_from: Number(pendingNetwork.user_id_from),
            user_id_to: Number(pendingNetwork.user_id_to),
            status: 1
        }
    });
    return new Response(`${networkToUpdate}`);
}