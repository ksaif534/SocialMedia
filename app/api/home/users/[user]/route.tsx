import { PrismaClient } from "@prisma/client"
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest | any) => {
    const prisma = new PrismaClient();
    const userId = await req.nextUrl.pathname.split('/')[4];
    const getUser = await prisma.users.findFirst({
        include: {
            profile: true
        },
        where: {
            id: Number(userId)
        }
    })
    return new Response(JSON.stringify(getUser));
}