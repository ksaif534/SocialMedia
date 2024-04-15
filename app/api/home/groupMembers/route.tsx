import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async () => {
    const prisma = new PrismaClient();
    const groupMembers = await prisma.groupMembers.findMany({
        include: {
            user: true
        }
    });
    return new Response(JSON.stringify(groupMembers));
}

export const POST = async (req: NextRequest) => {
    const formData = await req.json();
    const prisma = new PrismaClient();
    const newGroupMember = await prisma.groupMembers.create({
        data: {
            user_id: Number(formData.userId),
            group_id: Number(formData.groupId),
            name: formData.userName,
        }
    });
    return new Response(`${true}`);
}