import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const DELETE = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[4];
    const profileNetworkUserIdTo = req.nextUrl.pathname.split('/')[6];
    try {
        const prisma = new PrismaClient();
        const findNetwork = await prisma.networks.findFirst({
            where: {
                OR: [
                    {
                        AND: [
                            {
                                user_id_from: Number(profileUserId)
                            },
                            {
                                user_id_to: Number(profileNetworkUserIdTo)
                            }
                        ]
                    },
                    {
                        AND: [
                            {
                                user_id_from: Number(profileNetworkUserIdTo)
                            },
                            {
                                user_id_to: Number(profileUserId)
                            }
                        ]
                    }
                ]
            }
        });
        const unfriendNetwork = await prisma.networks.delete({
            where: {
                id: Number(findNetwork?.id)
            }
        });
        return new Response(`${unfriendNetwork}`);   
    } catch (error) {
        console.log(`Failed to Delete/Unfriend Profile/Network: ${error}`);
    }
    return new Response(`${false}`);
}