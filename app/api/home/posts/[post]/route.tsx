import { PrismaClient } from '@prisma/client';
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
    const url = req.nextUrl;
    const postId = url.pathname.split('/')[4];
    const formData = await req.formData();
    const body: any = Object.fromEntries(formData);
    const bodyText = JSON.parse(body.text);
    try {
        //Store data in Database
        const prisma = new PrismaClient();
        const fetchPost = await prisma.posts.findFirst({
            where: {
                id: Number(postId)
            }
        });
        const updatedPost = await prisma.posts.update({
            where: { id: Number(postId) },
            data: JSON.parse(JSON.stringify({
                user_id: Number(bodyText.user_id),
                group_id: Number(bodyText.group_id),
                title: bodyText.title,
                sub_title: bodyText.sub_title,
                description: bodyText.description,
                type: Number(bodyText.type),
                tags: bodyText.tags,
                is_share: Number(bodyText.is_share),
                video_post_url: bodyText.video_post_url,
                is_group: bodyText.is_group,
                figure: fetchPost?.figure,
                thumbnail: fetchPost?.thumbnail
            }))
        })
        return new Response(`${updatedPost}`);    
    } catch (error) {
        console.log(`Failed to Update Post: ${error}`);
    }
    return new Response(`${false}`);
}

export const DELETE = async (req: NextRequest) => {
    const url = req.nextUrl;
    const postId = url.pathname.split('/')[4];
    try {
        const prisma = new PrismaClient();
        const deletePost = await prisma.posts.delete({
            where: { id: Number(postId) }
        })
        //Delete All Post comments
        const deleteComments = await prisma.comments.findMany({
            where: { post_id: Number(postId) }
        });
        deleteComments.map(async (comment: any) => {
            const deleteComment = await prisma.comments.delete({
                where: { id: Number(comment.id) }
            })
        });
        return new Response(`${deletePost}`);    
    } catch (error) {
        console.log(`Failed to Delete Post: ${error}`);
    }
    return new Response(`${false}`);
}