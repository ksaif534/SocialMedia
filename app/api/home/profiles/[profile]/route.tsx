import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

export const GET = async (req: NextRequest) => {
    const profileUserId = req.nextUrl.pathname.split('/')[4];
    try {
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
    } catch (error) {
        console.log(`Failed to Find Profile: ${error}`);
    }
    return new Response(`Failed to Find Profile`)
}

export const PUT = async (req: NextRequest | any) => {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const fData = JSON.parse(body.formData);
    const userId = JSON.parse(body.sessionData);
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
        console.log(`Failed to Update Profile: ${error}`);
    }
    return new Response(`${false}`);
}