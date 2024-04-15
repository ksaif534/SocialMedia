import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const groupId = req.nextUrl.pathname.split('/')[4];
    const prisma = new PrismaClient();
    const specificGroupMods = await prisma.groupModerators.findMany({
        include: {
            user: true
        },
        where: {
            group_id: Number(groupId)
        }
    });
    return new Response(JSON.stringify(specificGroupMods));
}