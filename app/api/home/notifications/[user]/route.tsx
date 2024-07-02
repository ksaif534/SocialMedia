import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const userId = req.nextUrl.pathname.split('/')[4];
    try {
        const prisma = new PrismaClient();
        const getNewNotif = await prisma.notifications.findMany({
            where: {
                AND: [
                    {
                        user_id: Number(userId)
                    },
                    {
                        NOT: {
                            type: 2
                        }
                    },
                    {
                        NOT: {
                            notifiable_type: 2
                        }
                    },
                    {
                        read_at: null
                    }
                ]
            },
            include: {
                user: true
            }
        });
        return new Response(JSON.stringify(getNewNotif));    
    } catch (error) {
        console.log(`Failed to Fetch Notifications: ${error}`);
    }
    return new Response(`Failed to Fetch Notifications`);
}

export const PUT = async (req: NextRequest) => {
    const userId = req.nextUrl.pathname.split('/')[4];
    const notifBody = await req.json();
    try {
        const prisma = new PrismaClient();
        const updateNotifAsRead = await prisma.notifications.update({
            where: {
                id: notifBody?.id
            },
            data: {
                user_id: Number(userId),
                type: Number(notifBody?.type),
                notifiable_type: Number(notifBody?.notifiable_type),
                notifiable_id: Number(notifBody?.notifiable_id),
                data: notifBody?.data,
                read_at: new Date()
            }
        });
        return new Response(`${updateNotifAsRead}`);    
    } catch (error) {
        console.log(`Failed to Update User Notifications: ${error}`);
    }
    return new Response(`${false}`);
}