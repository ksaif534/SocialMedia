import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const DELETE = async (req: NextRequest) => {
    const groupId = req.nextUrl.pathname.split('/')[4];
    const userId = req.nextUrl.pathname.split('/')[5];
    const prisma = new PrismaClient();
    const findGroupRecord = await prisma.groupMembers.findFirst({
        where: {
            group_id: Number(groupId),
            user_id: Number(userId)
        }
    });
    const leaveGroup = await prisma.groupMembers.delete({
        where: {
            id: Number(findGroupRecord?.id)
        }
    });
    return new Response(`${leaveGroup}`);
}