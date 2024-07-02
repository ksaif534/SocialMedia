import { PrismaClient } from "@prisma/client";
import pusher from "../pusher/index";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest | any) => {
    const msgData = await req.json();
    try {
        const message = msgData.message;
        const sender = msgData.sender;
        const recipientUserId = msgData.recipientUserId;
        const response = await pusher.trigger("ksaif-chat-sm-nextjs", "send-msg-event", {
            message: message,
            sender: sender,
            recipientUserId: recipientUserId
        });
        const prisma = new PrismaClient();
        const newMsg = await prisma.messages.create({
            data: {
                user_id: sender.id,
                target_user_id: recipientUserId,
                message: message,
                is_allow: 1
            }
        });
        return new Response(JSON.stringify({
            response: response,
            newMsg: newMsg
        }));   
    } catch (error) {
        console.log(`Failed to Store Message: ${error}`);
    }
    return new Response(`Failed to Store Message`);
}
