import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async () => {
    try {
        const prisma = new PrismaClient();
        const likes = await prisma.likes.findMany({
            include: {
                user: true,
                post: true
            }
        });
        return new Response(JSON.stringify(likes));   
    } catch (error) {
        console.log(`Failed to Fetch Likes: ${error}`);
    }
    return new Response(`Failed to Fetch Likes`);
}

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    try {
        const prisma = new PrismaClient();
        const newLike = await prisma.likes.create({
            data: {
                user_id: Number(body.userId),
                post_id: Number(body.postId),
                is_count: Number(body.isCount)
            }
        });
        return new Response(`${true}`);   
    } catch (error) {
        console.log(`Failed to Store Like Record: ${error}`);
    }
    return new Response(`Failed to Store Like Record`);
}