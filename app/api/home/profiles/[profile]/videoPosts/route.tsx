import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[4];
    try {
        const prisma = new PrismaClient();
        const videoPosts = await prisma.posts.findMany({
            include: {
                user: true,
                comments: {
                    include: {
                        user: true
                    }
                }
            },
            where: {
                user_id: Number(profileUserId),
                type: 2
            }
        });
        return new Response(JSON.stringify(videoPosts));    
    } catch (error) {
        console.log(`Failed to Fetch Video Posts: ${error}`)
    }
    return new Response(`Failed to Fetch Video Posts`);
}