import { PrismaClient } from "@prisma/client"
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[4];
    try {
        const prisma = new PrismaClient();
        const profilePosts = await prisma.posts.findMany({
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
                type: 1
            }
        });
        return new Response(JSON.stringify(profilePosts));   
    } catch (error) {
        console.log(`Failed to Fetch Profile Posts: ${error}`)
    }
    return new Response(`Failed to Fetch Profile Posts`);
}