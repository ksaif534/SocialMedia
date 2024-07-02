import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const postId = req.nextUrl.pathname.split('/')[4];
    try {
        const prisma = new PrismaClient();
        const likes = await prisma.likes.findMany({
            include: {
                user: true,
                post: true
            },
            where: {
                post_id: Number(postId)
            }
        });
        return new Response(JSON.stringify(likes));   
    } catch (error) {
        console.log(`Failed to Fetch Post Likes: ${error}`);
    }
    return new Response(`Failed to Fetch Post Likes`);
}