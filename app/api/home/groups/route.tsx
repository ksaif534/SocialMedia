import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import path from "path";
import fs from "fs";
import axios from "axios";

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();
    const body: any = Object.fromEntries(formData);
    const groupPhoto = JSON.parse(body.fileObj).group_photo.name;
    //Fix Group Photo Path
    // const groupPhotoPath = path.join('/', 'tmp' , groupPhoto);
    const bodyText = JSON.parse(body.text);
    //Create File streams & convert to buffer chunks
    // const groupPhotoStream = body.groupPhoto.stream();
    // const gpChunks = [];
    // for await (const chunk of groupPhotoStream){
    //     gpChunks.push(chunk);
    // }
    // const gpBuffer = Buffer.concat(gpChunks);
    // fs.writeFileSync(groupPhotoPath,gpBuffer);
    try {
        //Store Group Photo in Imgur with Imgur API
        const imgurFormData = new FormData();
        imgurFormData.append('image',body.groupPhoto);
        const imgurResponse = await axios.post(`https://api.imgur.com/3/image`,imgurFormData, {
            headers: {
                Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
            }
        });
        const { link } = imgurResponse.data.data;
        const prisma = new PrismaClient();
        //Get Auth User
        const sessionDataObj = JSON.parse(body.sessionData);
        const authUserId = sessionDataObj.userId;
        const authUserName = sessionDataObj.userName;
        //Move the files
        const groupMods  = JSON.stringify(bodyText.group_mods);
        const newGroup = await prisma.groups.create({
            data: JSON.parse(JSON.stringify({
                name: bodyText.name,
                user_id: Number(authUserId),
                description: bodyText.description,
                status: Number(bodyText.status),
                group_photo: link,
                group_mods: groupMods
            }))
        });
        //Create Group Moderators
        const groupModsArr = JSON.parse(groupMods);
        groupModsArr.map(async (groupMod: any) => {
            const modArrUserId = groupMod.split('-')[0];
            const newModerator = await prisma.groupModerators.create({
                include: {
                    user: true
                },
                data: {
                    user_id: Number(modArrUserId),
                    group_id: Number(newGroup.id)
                }
            })
        })
        //Store the Admin as Group Member
        const groupMember = await prisma.groupMembers.create({
            data: {
                user_id: Number(authUserId),
                group_id: Number(newGroup.id),
                name: authUserName
            }
        });
        return new Response(`${true}`);
    } catch (error) {
        console.log(error);
    }
    return new Response(`${false}`);
}

export const GET = async () => {
    const prisma = new PrismaClient();
    const allGroups = await prisma.groups.findMany({
        include: {
            user: true
        }
    });
    return new Response(JSON.stringify(allGroups));
}