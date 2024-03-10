import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[4];
    const otherProfileUserId = req.nextUrl.pathname.split('/')[6];
    console.log(profileUserId);
    console.log(otherProfileUserId);
    const prisma = new PrismaClient();
    const networks = await prisma.networks.create({
        include: {
            users: true
        },
        data: {
            user_id_from: Number(profileUserId),
            user_id_to: Number(otherProfileUserId),
            status: 2
        }
    })
}
