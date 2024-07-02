import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const srchGrpKey = req.nextUrl.pathname.split('/')[5];
    try {
        const prisma = new PrismaClient();
        const srchGrp = await prisma.groups.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: srchGrpKey,
                        }
                    },
                    {
                        description: {
                            contains: srchGrpKey
                        }
                    },
                    {
                        group_mods: {
                            contains: srchGrpKey
                        }
                    }
                ]
            }
        });
        return new Response(JSON.stringify(srchGrp));    
    } catch (error) {
        console.log(`Error Fetching Groups with Search Key: ${error}`)
    }
    return new Response(`Error Fetching Groups with Search Key`);
}