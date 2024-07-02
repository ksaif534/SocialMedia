import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

export const POST = async (req: NextRequest | any) => {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const profilePhoto = JSON.parse(body.fileObj).profile_photo.name;
    const fData = JSON.parse(body.formData);
    const userId = JSON.parse(body.sessionData);
    try {
        //Call Imgur API to Store Image File
        const imgurFormData = new FormData();
        imgurFormData.append('image',body.profile_photo);
        const imgurResponse = await axios.post(`https://api.imgur.com/3/image`,imgurFormData, {
            headers: {
                Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
            }
        });
        const { link } = imgurResponse.data.data;
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
                profile_photo: link
            }))
        });
    } catch (error) {
        console.log(error);
    }
    return new Response(`${true}`);
}