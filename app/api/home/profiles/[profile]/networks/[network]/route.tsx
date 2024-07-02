import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[4];
    const otherProfileUserId = req.nextUrl.pathname.split('/')[6];
    try {
        const prisma = new PrismaClient();
        const profile = await prisma.profiles.findFirst({
            include: {
                user: true
            },
            where: {
                user_id: Number(otherProfileUserId)
            }
        });
        const networks = await prisma.networks.create({
            include: {
                user: true
            },
            data: {
                user_id_from: Number(profileUserId),
                user_id_to: Number(otherProfileUserId),
                profile_id: Number(profile?.id),
                status: 2
            }
        });
        return new Response(`${true}`);    
    } catch (error) {
        console.log(`Failed to Store Specific Network: ${error}`)
    }
    return new Response(`${false}`);
}
