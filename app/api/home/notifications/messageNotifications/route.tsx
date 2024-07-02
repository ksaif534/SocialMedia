import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const msgNotifData = await req.json();
    try {
        const sender = msgNotifData.sender;
        const recipientUserId = msgNotifData.recipientUserId;
        const messageId = msgNotifData.messageId;
        const prisma = new PrismaClient();
        //New Message Notification
        const newMsgNotif = await prisma.notifications.create({
            data: {
                user_id: Number(recipientUserId),
                type: 2,
                notifiable_type: 2,
                data: `${sender.name} just messaged you`,
                notifiable_id: Number(messageId),
                read_at: null
            }
        });
        return new Response(JSON.stringify(newMsgNotif));    
    } catch (error) {
        console.log(`Failed to Store User Notifications: ${error}`);
    }
    return new Response(`${false}`);
}