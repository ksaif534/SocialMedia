import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const userId = req.nextUrl.pathname.split('/')[5];
    try {
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
                    },
                    {
                        read_at: null
                    }
                ]
            },
            include: {
                message: true
            }
        });
        return new Response(JSON.stringify(newMsgNotif));    
    } catch (error) {
        console.log(`Failed to Fetch User Message Notifications: ${error}`);
    }
}

export const PUT = async (req: NextRequest) => {
    const userId = req.nextUrl.pathname.split('/')[5];
    const msgNotifBody = await req.json();
    try {
        const prisma = new PrismaClient();
        const updateMsgNotifAsRead = await prisma.notifications.update({
            where: {
                id: Number(msgNotifBody.id)
            },
            data: {
                user_id: Number(userId),
                type: Number(msgNotifBody.type),
                notifiable_type: Number(msgNotifBody.notifiable_type),
                notifiable_id: Number(msgNotifBody.notifiable_id),
                data: msgNotifBody.data,
                read_at: new Date()
            }
        });
        return new Response(`${updateMsgNotifAsRead}`);    
    } catch (error) {
        console.log(`Failed to Update User Message Notification: ${error}`);
    }
    return new Response(`${false}`);
}