import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const srchGrpKey = req.nextUrl.pathname.split('/')[5];
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
    console.log(srchGrp);
    return new Response(JSON.stringify(srchGrp));
}