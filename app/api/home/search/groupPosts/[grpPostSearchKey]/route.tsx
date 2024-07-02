import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const grpPostSrchKey = req.nextUrl.pathname.split('/')[5];
    try {
        const prisma = new PrismaClient();
        const grpPosts = await prisma.posts.findMany({
            where: {
                AND: [
                    {
                        is_group: 1
                    },
                    {
                        OR: [
                            {
                                title: {
                                    contains: grpPostSrchKey
                                }
                            },
                            {
                                sub_title: {
                                    contains: grpPostSrchKey
                                }
                            },
                            {
                                description: {
                                    contains: grpPostSrchKey
                                }
                            },
                            {
                                tags: {
                                    contains: grpPostSrchKey
                                }
                            }
                        ]
                    }
                ]
            },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true
                    }
                }
            }
        });
        return new Response(JSON.stringify(grpPosts));    
    } catch (error) {
        console.log(`Error Searching Group Posts with Search Key: ${error}`)
    }
    return new Response(`Error Searching Group Posts with Search Key`);
}