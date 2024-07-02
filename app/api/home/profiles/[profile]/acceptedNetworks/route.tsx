import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[4];
    try {
        const prisma = new PrismaClient();
        const acceptedNetworks = await prisma.networks.findMany({
            include: {
                user: true,
                profile: true
            },
            where: {
                OR: [
                    {
                        user_id_from: Number(profileUserId)
                    },
                    {
                        user_id_to: Number(profileUserId)
                    }
                ],
                status: 1
            }
        });
        let recipientUser: any;
        let index: any = 0;
        for await(const acceptedNetwork of acceptedNetworks) {
            if (acceptedNetwork.user_id_to == Number(profileUserId)) {
                index++;
                if (index < 2) {
                    recipientUser = await prisma.users.findFirst({
                        include: {
                            profile: true
                        },
                        where: {
                            id: Number(acceptedNetwork.user_id_from)
                        }
                    });    
                }    
            }
        }
        return new Response(JSON.stringify({
            acceptedNetworks: acceptedNetworks,
            recipientUser: recipientUser
        }));    
    } catch (error) {
        console.log(`Failed to Fetch Accepted Profile Networks: ${error}`);
    }
    return new Response(`Failed to Fetch Accepted Profile Networks`);
}