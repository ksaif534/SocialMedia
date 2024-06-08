import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async(req: NextRequest) => {
    const searchKey = req.nextUrl.pathname.split('/')[5];
    const prisma = new PrismaClient();
    const searchQuery = await prisma.posts.findMany({
        include: {
            user: true,
            comments: {
                include: {
                    user: true
                }
            }
        },
        where: {
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
    });
    return new Response(JSON.stringify(searchQuery));
}