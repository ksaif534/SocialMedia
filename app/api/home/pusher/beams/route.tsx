import beamsClient from "../beams";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

export const POST = async (req: NextRequest) => {
    const dataObj = await req.json();
    const authUser = dataObj.authUser;
    const post = dataObj.post;
    const response = await beamsClient.publishToInterests(['hello'],{
        web: {
            notification: {
                title: `Comment Creation Notification`,
                body: `${authUser.name} commented on your post`,
                deep_link: `https://www.pusher.com`
            }
        }
    });
    //Save New Notification to DB
    const prisma = new PrismaClient();
    const newNotif = await prisma.notifications.create({
        data: {
            user_id: Number(post?.user_id),
            type: 1,
            notifiable_type: 1,
            notifiable_id: Number(post?.id),
            data: `${authUser.name} commented on your post`,
            read_at: null
        }
    });
    return new Response(JSON.stringify(response));
}