import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const userId = req.nextUrl.pathname.split('/')[4];
    try {
        const prisma = new PrismaClient();
        const pendingRecipientUserNetworks = await prisma.networks.findMany({
            include: {
                user: true
            },
            where: {
                user_id_to: Number(userId),
                status: 2
            }
        });
        return new Response(JSON.stringify(pendingRecipientUserNetworks));    
    } catch (error) {
        console.log(`Failed to Fetch User/Profile Networks: ${error}`);
    }
    return new Response(`Failed to Fetch User/Profile Networks`);
}