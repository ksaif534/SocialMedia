import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
    const url = req.nextUrl;
    const commentId = url.pathname.split('/')[5];
    const body = await req.json();
    try {
        const prisma = new PrismaClient();
        const updateComment = await prisma.comments.update({
            where: { id: Number(commentId) },
            data: {
                user_id: Number(body.user_id),
                post_id: Number(body.post_id),
                description: body.description,
                is_allow: Number(body.is_allow)
            }
        });
        return new Response(`${updateComment}`);    
    } catch (error) {
        console.log(`Sorry, Failed to Update Comment: ${error}`)
    }
    return new Response(`${false}`);
}

export const DELETE = async (req: NextRequest) => {
    const url = req.nextUrl;
    const commentId = url.pathname.split('/')[5];
    try {
        const prisma = new PrismaClient();
        const deleteComment = await prisma.comments.delete({
            where: { id: Number(commentId) }
        })
        return new Response(`${deleteComment}`);    
    } catch (error) {
        console.log(`Failed to Delete Comment: ${error}`);
    }
    return new Response(`${false}`);
}
