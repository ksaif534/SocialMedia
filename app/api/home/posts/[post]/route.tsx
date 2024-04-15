import { PrismaClient } from '@prisma/client';
import { NextRequest } from "next/server";
import path from 'path';
import fs from 'fs';

export const PUT = async (req: NextRequest) => {
    const url = req.nextUrl;
    const postId = url.pathname.split('/')[4];
    const formData = await req.formData();
    const body: any = Object.fromEntries(formData);
    const figure = JSON.parse(body.fileObj).figure.name;
    const thumbnail = JSON.parse(body.fileObj).thumbnail.name;
    //Fix Figure & Thumbnail Paths
    const figurePath = path.join(process.cwd(),'public/images',figure);
    const thumbPath = path.join(process.cwd(),'public/images',thumbnail);
    const bodyText = JSON.parse(body.text);
    //Create File streams & convert to buffer chunks
    const figureStream = body.figure.stream();
    const figureChunks = [];
    for await (const chunk of figureStream){
        figureChunks.push(chunk);
    }
    const figBuffer = Buffer.concat(figureChunks);
    const thumbStream = body.thumbnail.stream();
    const thumbChunks = [];
    for await (const chunk of thumbStream){
        thumbChunks.push(chunk);
    }
    const thumbBuffer = Buffer.concat(thumbChunks);
    fs.writeFileSync(figurePath, figBuffer);
    fs.writeFileSync(thumbPath, thumbBuffer);
    //Store data in Database
    const prisma = new PrismaClient();
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
            figure: figure,
            thumbnail: thumbnail
        }))
    })
    return new Response(`${updatedPost}`);
}

export const DELETE = async (req: NextRequest) => {
    const url = req.nextUrl;
    const postId = url.pathname.split('/')[4];
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
}