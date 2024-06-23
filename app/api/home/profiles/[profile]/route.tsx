import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
import axios from "axios";

export const GET = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[4];
    const prisma  = new PrismaClient();
    const profile = await prisma.profiles.findFirst({
        include: {
            user: true
        },
        where: {
            user_id: Number(profileUserId)
        }
    });
    return new Response(JSON.stringify(profile));
}

export const PUT = async (req: NextRequest | any) => {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const profilePhoto = JSON.parse(body.fileObj).profile_photo.name;
    // const profilePhotoPath = path.join(process.cwd(), 'public/images/', profilePhoto);
    const fData = JSON.parse(body.formData);
    const userId = JSON.parse(body.sessionData);
    //Update File Stream
    // const profilePhotoStream = body.profile_photo.stream();
    // const profilePhotoChunks = [];
    // for await (const chunk of profilePhotoStream) {
    //     profilePhotoChunks.push(chunk);
    // }
    // const profilePhotoBuffer = Buffer.concat(profilePhotoChunks);
    // fs.writeFileSync(profilePhotoPath, profilePhotoBuffer);
    try {
        //Update Profile Data
        const prisma = new PrismaClient();
        //Find the profile
        const profileToUpdate = await prisma.profiles.findFirst({
            where: {
                user_id: Number(userId)
            }
        });
        //Update the Profile Record
        const updatedProfile = await prisma.profiles.update({
            where: {
                id: Number(profileToUpdate?.id)
            },
            data: JSON.parse(JSON.stringify({
                firstname: fData.firstname,
                lastname: fData.lastname,
                marital_status: Number(fData.marital_status),
                gender: Number(fData.gender),
                birthdate: new Date(fData.birthdate),
                education_level: Number(fData.education_level),
                occupation: Number(fData.occupation),
                country: Number(fData.country),
                city: Number(fData.city),
                address: fData.address,
                profile_photo: profileToUpdate?.profile_photo
            }))
        });
        return new Response(`${updatedProfile}`);
    } catch (error) {
        console.log(error);
    }
    return new Response(`${false}`);
}