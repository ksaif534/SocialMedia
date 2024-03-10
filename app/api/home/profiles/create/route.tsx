import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

export const POST = async (req: NextRequest | any) => {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const profilePhoto = JSON.parse(body.fileObj).profile_photo.name;
    const profilePhotoPath = path.join(process.cwd(),'public/images',profilePhoto);
    const fData = JSON.parse(body.formData);
    const userId = JSON.parse(body.sessionData);
    //Create File Stream
    const profilePhotoStream = body.profile_photo.stream();
    const profilePhotoChunks = [];
    for await (const chunk of profilePhotoStream){
        profilePhotoChunks.push(chunk);
    }
    const proPhotoBuffer = Buffer.concat(profilePhotoChunks);
    fs.writeFileSync(profilePhotoPath,proPhotoBuffer);
    //Store Profile Record
    const prisma = new PrismaClient();
    const newProfile = await prisma.profiles.create({
        data: JSON.parse(JSON.stringify({
            user_id: Number(userId),
            firstname: fData.firstname,
            lastname: fData.lastname,
            marital_status: Number(fData.marital_status),
            gender: Number(fData.gender),
            birthdate: new Date(fData.birthDate),
            education_level: Number(fData.education_level),
            occupation: Number(fData.occupation),
            country: Number(fData.country),
            city: Number(fData.city),
            address: fData.address,
            profile_photo: profilePhoto
        }))
    });
    return new Response(`${true}`);
}