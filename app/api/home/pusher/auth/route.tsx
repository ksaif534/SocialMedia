import pusher from '../index';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest | any) => {
    const body = await req.json();
    const username = body.user_info.name;
    const user_id = body.user_info.id;
    const user_image = body.user_info.image;
    const socket_id = body.socket_id;
    const user = {
        id: user_id,
        user_info: {
            name: username,
            image: user_image
        }
    }
    try {
        const auth = pusher.authenticateUser(socket_id, user);
    } catch (error) {
        console.log(error);
    }
}