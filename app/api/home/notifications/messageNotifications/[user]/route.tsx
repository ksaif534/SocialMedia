import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const userId = req.nextUrl.pathname.split('/')[5];
    const prisma = new PrismaClient();
    const newMsgNotif = await prisma.notifications.findMany({
        where: {
            AND: [
                {
                    user_id: Number(userId)
                },
                {
                    type: 2
                },
                {
                    notifiable_type: 2
                }
            ]
        }
    });
    return new Response(JSON.stringify(newMsgNotif));
}