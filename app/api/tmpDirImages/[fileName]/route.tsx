import path from "path";
import os from 'os';
import fs from 'fs';
import { NextRequest, NextResponse } from "next/server";

process.env.TMPDIR = '/tmp';

export const GET = async (req: NextRequest, res: NextResponse) => {
    const filename = req.nextUrl.pathname.split('/')[3];
    try {
        const tmpDir = os.tmpdir();
        const imagePath = path.join(tmpDir,filename);
        //Check if the file exists or not
        if (!fs.existsSync(imagePath)) {
            return new NextResponse('Image Not Found', { status: 404 });
        }
        //Read the Image File
        const imageBuffer = fs.readFileSync(imagePath);
        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': `image/${path.extname(filename).substring(1)}`
            }
        });
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}