import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const groupUserId = req.nextUrl.pathname.split('/')[5];
    const searchKey = req.nextUrl.pathname.split('/')[7];
    try {
        const prisma = new PrismaClient();
        const srchGroup = await prisma.groups.findFirst({
            include: {
                user: true
            },
            where: {
                AND: [
                    {
                        group_mods: {
                            contains: searchKey
                        }
                    },
                    {
                        user_id: Number(groupUserId)
                    }
                ]
            }
        })
        if (!Number.isNaN(Number(srchGroup?.id))) {
            const srchGrpModerators = await prisma.groupModerators.findMany({
                include: {
                    user: true,
                    groups: true
                },
                where: {
                    OR: [
                        {
                            group_id: Number(srchGroup?.id)
                        },
                        {
                            user_id: Number(groupUserId)
                        }
                    ]    
                }
            })
            return new Response(JSON.stringify(srchGrpModerators))    
        }
        //If No Group
        const srchGrpModerators = await prisma.groupModerators.findMany({
            include: {
                user: true,
                groups: true
            },
            where: {
                group_id: 0
            }
        })
        return new Response(JSON.stringify(srchGrpModerators));   
    } catch (error) {
        console.log(`Error Fetching Group Moderator Search Result`);
    }
}