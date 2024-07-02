import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[5];
    const searchKey = req.nextUrl.pathname.split('/')[6];
    try {
        const prisma = new PrismaClient();
        const profileUserPosts = await prisma.posts.findMany({
            where: {
                AND: [
                    {
                        user_id: Number(profileUserId)
                    },
                    {
                        OR: [
                            {
                                title: {
                                    contains: searchKey
                                }
                            },
                            {
                                sub_title: {
                                    contains: searchKey
                                }
                            },
                            {
                                description: {
                                    contains: searchKey
                                }
                            },
                            {
                                tags: {
                                    contains: searchKey
                                }
                            }
                        ]
                    }
                ]
            },
            include: {
                user: true
            }
        });
        return new Response(JSON.stringify(profileUserPosts));   
    } catch (error) {
        console.log(`Error Fetching Profile User Posts With Search Key: ${error}`)
    }
    return new Response(`Error Fetching Profile User Posts With Search Key`);
}