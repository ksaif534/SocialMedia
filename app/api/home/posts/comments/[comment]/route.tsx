import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
    const url = req.nextUrl;
    const commentId = url.pathname.split('/')[5];
    const body = await req.json();
    console.log(body);
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
}

export const DELETE = async (req: NextRequest) => {
    const url = req.nextUrl;
    const commentId = url.pathname.split('/')[5];
    const prisma = new PrismaClient();
    const deleteComment = await prisma.comments.delete({
        where: { id: Number(commentId) }
    })
    return new Response(`${deleteComment}`);
}
