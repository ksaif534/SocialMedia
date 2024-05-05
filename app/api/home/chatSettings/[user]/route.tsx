import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
    const userId = req.nextUrl.pathname.split('/')[4];
    const body = await req.json();
    const isActive = body.activeOrNot;
    const prisma = new PrismaClient();
    const updateOrCreateChatSettings = await prisma.chat_settings.upsert({
        where: {
            user_id: Number(userId)
        },
        update: {
            is_active: Number(isActive)
        },
        create: {
            user_id: Number(userId),
            is_shown: 1,
            is_active: Number(isActive)
        }
    });
    return new Response(`${updateOrCreateChatSettings}`);
}

export const GET = async (req: NextRequest) => {
    const userId = req.nextUrl.pathname.split('/')[4];
    const prisma = new PrismaClient();
    const getChatSettings = await prisma.chat_settings.findMany({
        where: {
            user_id: Number(userId)
        },
        include: {
            user: true
        }
    });
    return new Response(JSON.stringify(getChatSettings));
}