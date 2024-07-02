import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async () => {
    try {
        const prisma = new PrismaClient();
        const shares = await prisma.shares.findMany({
            include: {
                user: true,
                post: true
            }
        });
        return new Response(JSON.stringify(shares));    
    } catch (error) {
        console.log(`Error Fetching Post Shares: ${error}`)
    }
    return new Response(`Error Fetching Post Shares`);
}

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    try {
        const prisma = new PrismaClient();
        const newShare = await prisma.shares.create({
            data: {
                user_id: Number(body.user_id),
                post_id: Number(body.post_id),
                is_count: Number(body.is_count),
                shared: Number(body.shared)
            }
        });
        return new Response(`${true}`);    
    } catch (error) {
        console.log(`Error Storing Post Shares: ${error}`)
    }
    return new Response(`${false}`);
}