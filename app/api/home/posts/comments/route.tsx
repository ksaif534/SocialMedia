import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async () => {
    const prisma = new PrismaClient();
    const comments  = await prisma.comments.findMany({
        include: {
            user: true,
            post: true
        }
    });
    return new Response(JSON.stringify(comments));
}

export const POST = async (req: NextRequest) => {
    const formData = await req.json();
    const prisma = new PrismaClient();
    const newComment = await prisma.comments.create({
        data: {
            user_id: formData.user_id,
            post_id: formData.post_id,
            description: formData.description,
            is_allow: Number(formData.is_allow),
        }
    });
    return new Response(`Comment Created Successfully`);
}