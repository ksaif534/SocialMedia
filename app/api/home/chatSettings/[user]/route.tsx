import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
    const userId = req.nextUrl.pathname.split('/')[4];
    const body = await req.json();
    const isActive = body.activeOrNot;
    try {
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
    } catch (error) {
        console.log(`Failed to Update Chat Settings: ${error}`);
    }
    return new Response(`${true}`);
}

export const GET = async (req: NextRequest) => {
    const userId = req.nextUrl.pathname.split('/')[4];
    try {
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
    } catch (error) {
        console.log(`Error Fetching Chat Settings Data: ${error}`)
    }
    return new Response(`Error Fetching Chat Settings Data`);
}