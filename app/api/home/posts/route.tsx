import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const GET = async () => {
    const prisma = new PrismaClient();
    const posts = await prisma.posts.findMany();
    return new Response(JSON.stringify(posts));
}

export const POST = async (req: NextRequest | any, res: NextResponse | any) => {
    const formData = await req.formData();
    const body: any = Object.fromEntries(formData);
    const figure = JSON.parse(body.fileObj).figure.name;
    const thumbnail = JSON.parse(body.fileObj).thumbnail.name;
    //Fix Figure & Thumbnail Paths
    const figurePath = path.join(process.cwd(), 'public/images', figure);
    const thumbPath = path.join(process.cwd(), 'public/images', thumbnail);
    const bodyText = JSON.parse(body.text);
    //Create File streams & convert to buffer chunks
    const figureStream = body.figure.stream();
    const figureChunks = [];
    for await(const chunk of figureStream){
        figureChunks.push(chunk);
    }
    const figBuffer = Buffer.concat(figureChunks);
    const thumbStream = body.thumbnail.stream();
    const thumbChunks = [];
    for await(const chunk of thumbStream){
        thumbChunks.push(chunk);
    }
    const thumbBuffer = Buffer.concat(thumbChunks);
    fs.writeFileSync(figurePath, figBuffer);
    fs.writeFileSync(thumbPath, thumbBuffer);
    //Move the files
    const prisma = new PrismaClient();
    const newPost = await prisma.posts.create({
        data: JSON.parse(JSON.stringify(
            {
                user_id: Number(bodyText.user_id),
                group_id: Number(bodyText.group_id),
                title: bodyText.title,
                sub_title: bodyText.sub_title,
                description: bodyText.description,
                type: Number(bodyText.type),
                tags: bodyText.tags,
                is_share: Number(bodyText.is_share),
                video_post_url: bodyText.video_post_url,
                figure: figure,
                thumbnail: thumbnail
            }
        ))
    })
    return new Response(`Post created`);
}