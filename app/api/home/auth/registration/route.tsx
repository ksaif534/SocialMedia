import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import bcrypt from 'bcryptjs';

export const POST = async (req: NextRequest | any, res: NextResponse | any) => {
    const formData = await req.formData();
    const body: any = Object.fromEntries(formData);
    const bodyTextData = JSON.parse(body.formData); 
    const hashedPassword = await bcrypt.hash(bodyTextData.password,10);
    const bodyFileData = JSON.parse(body.fileData);
    //Fix Image Path
    const imagePath = path.join('/', 'tmp', bodyFileData.image);
    //Create File Streams to Convert to Buffer Chunks
    const imageStream = body.image.stream();
    const imageChunks = [];
    for await (const chunk of imageStream) {
        imageChunks.push(chunk);
    }
    const imageBuffer = Buffer.concat(imageChunks);
    fs.writeFileSync(imagePath, imageBuffer);
    //Store the User Registration
    const prisma = new PrismaClient();
    const newUser = await prisma.users.create({
        data: JSON.parse(JSON.stringify({
            email: bodyTextData.email,
            password: hashedPassword,
            image: bodyFileData.image,
            is_active: Number(bodyTextData.is_active),
            name: bodyTextData.name,
            phone: bodyTextData.phone
        }))
    });
    return new Response(`User Registered`);
}