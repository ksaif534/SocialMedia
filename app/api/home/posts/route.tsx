import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const GET = async () => {
    try {
        const prisma = new PrismaClient();
        const posts = await prisma.posts.findMany({
            include: {
                user: true,
                comments: {
                    include: {
                        user: true
                    }
                }
            }
        });
        return new Response(JSON.stringify(posts));    
    } catch (error) {
        console.log(`Failed to Fetch Posts: ${error}`);
    }
    return new Response(`Failed to Fetch Posts`);
}

export const POST = async (req: NextRequest | any, res: NextResponse | any) => {
    const formData = await req.formData();
    const body: any = Object.fromEntries(formData);
    const bodyText = JSON.parse(body.text);
    try {
        //Call Imgur API to Store Image File
        const imgurFigureFormData = new FormData();
        imgurFigureFormData.append('image',body.figure);
        const imgurFigureResponse = await axios.post(`https://api.imgur.com/3/image`,imgurFigureFormData, {
            headers: {
                Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            }
        });
        const imgurThumbFormData = new FormData();
        imgurThumbFormData.append('image',body.thumbnail);
        const imgurThumbResponse = await axios.post(`https://api.imgur.com/3/image`,imgurThumbFormData, {
            headers: {
                Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
            }
        });
        //Store the Post Data
        const prisma = new PrismaClient();
        //Get Auth User
        const authUserId = JSON.parse(body.sessionData);
        //Move the files
        const newPost = await prisma.posts.create({
            data: JSON.parse(JSON.stringify(
                {
                    user_id: Number(authUserId),
                    group_id: Number(bodyText.group_id),
                    title: bodyText.title,
                    sub_title: bodyText.sub_title,
                    description: bodyText.description,
                    type: Number(bodyText.type),
                    tags: bodyText.tags,
                    is_share: Number(bodyText.is_share),
                    video_post_url: bodyText.video_post_url,
                    is_group: Number(bodyText.is_group),
                    figure: imgurFigureResponse.data.data.link,
                    thumbnail: imgurThumbResponse.data.data.link
                }
            ))
        });
        return new Response(`${true}`);
    } catch (error) {
        console.log(error);
    }
    return new Response(`${false}`);
}