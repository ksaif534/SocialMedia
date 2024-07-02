import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
    const userId = req.nextUrl.pathname.split('/')[4];
    const body = await req.json();
    const isShown = body.showContact;
    try {
        const prisma = new PrismaClient();
        const updateShowContacts = await prisma.chat_settings.upsert({
            where: {
                user_id: Number(userId)
            },
            update: {
                is_shown: Number(isShown)
            },
            create: {
                user_id: Number(userId),
                is_active: 1,
                is_shown: Number(isShown)
            }
        });
        return new Response(`${updateShowContacts}`);   
    } catch (error) {
        console.log(`Failed to Show Contacts: ${error}`)
    }
    return new Response(`${false}`);
}