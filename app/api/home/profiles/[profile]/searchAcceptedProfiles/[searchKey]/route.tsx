import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[4];
    const searchKey = req.nextUrl.pathname.split('/')[6];
    const prisma = new PrismaClient();
    const otherProfileNetworks = await prisma.profiles.findMany({
        where: {
            NOT: {
                user_id: Number(profileUserId)
            },
            OR: [
                {
                    firstname: {
                        contains: searchKey
                    }
                },
                {
                    lastname: {
                        contains: searchKey
                    }
                },
                {
                    address: {
                        contains: searchKey
                    }
                },
                {
                    profile_photo: {
                        contains: searchKey
                    }
                }
            ]
        },
        include: {
            user: true,
            networks: true
        }
    })
    return new Response(JSON.stringify(otherProfileNetworks))
}