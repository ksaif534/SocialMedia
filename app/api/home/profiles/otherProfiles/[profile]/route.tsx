import { PrismaClient } from "@prisma/client"
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[5];
    const prisma = new PrismaClient();
    const otherProfiles = await prisma.profiles.findMany({
        include: {
            user: true
        },
        where: {
            NOT: {
                user_id: {
                    equals: Number(profileUserId)
                }
            }
        }
    });
    return new Response(JSON.stringify(otherProfiles));
}