import { PrismaClient } from "@prisma/client";

export const GET = async () => {
    const prisma = new PrismaClient();
    const groupPosts = await prisma.posts.findMany({
        include: {
            user: true,
            comments: {
                include: {
                    user: true
                }
            }
        },
        where: {
            is_group: 1
        }
    });
    return new Response(JSON.stringify(groupPosts));
}