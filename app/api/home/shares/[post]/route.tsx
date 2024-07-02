import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const postId = req.nextUrl.pathname.split('/')[4];
    try {
        const prisma = new PrismaClient();
        const sharesByPost = await prisma.shares.findMany({
            include: {
                user: true,
                post: true
            },
            where: {
                post_id: Number(postId)
            }
        });
        return new Response(JSON.stringify(sharesByPost));    
    } catch (error) {
        console.log(`Error Fetching Shares By Post: ${error}`)
    }
    return new Response(`Error Fetching Shares By Post`);
}