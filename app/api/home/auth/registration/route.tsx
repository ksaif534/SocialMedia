import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import bcrypt from 'bcryptjs';

export const POST = async (req: NextRequest | any, res: NextResponse | any) => {
    const formData = await req.formData();
    const body: any = Object.fromEntries(formData);
    const bodyTextData = JSON.parse(body.formData); 
    const hashedPassword = await bcrypt.hash(bodyTextData.password,10);
    try {
        //Call Imgur API to Store Image File
        const imgurFormData = new FormData();
        imgurFormData.append('image',body.image);
        const imgurResponse = await axios.post(`https://api.imgur.com/3/image`,imgurFormData, {
            headers: {
                Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
            }
        });
        const { link } = imgurResponse.data.data;
        //Store the User Registration
        const prisma = new PrismaClient();
        const newUser = await prisma.users.create({
            data: JSON.parse(JSON.stringify({
                email: bodyTextData.email,
                password: hashedPassword,
                image: link,
                is_active: Number(bodyTextData.is_active),
                name: bodyTextData.name,
                phone: bodyTextData.phone
            }))
        });
        return new Response(`User Registered`);
    } catch (error) {
        console.error(error);
    }
    return new Response(`Sorry, User Not Registered`);
}