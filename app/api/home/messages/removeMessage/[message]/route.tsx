import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const DELETE = async (req: NextRequest) => {
    const msgId = req.nextUrl.pathname.split('/')[5];
    try {
        const prisma = new PrismaClient();
        const deleteMsg = await prisma.messages.delete({
            where: { 
                id: Number(msgId)
            },
            include: {
                notification: true
            }
        });
        return new Response(`${deleteMsg}`);   
    } catch (error) {
        console.log(`Failed to Remove Message: ${error}`);
    }
    return new Response(`${false}`);
}