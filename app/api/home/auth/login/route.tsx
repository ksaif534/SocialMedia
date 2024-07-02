import { NextRequest } from "next/server";
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export const POST = async (req: NextRequest) => {
    const jsonData = await req.json();
    const loginFormData = jsonData.loginFormData;
    const users = jsonData.users;
    let isUserLoggedIn: boolean = false;
    let sessionToken: string = '';
    let passwordMatch: boolean = false;
    try {
        for(const user of users) {
            passwordMatch = await bcrypt.compare(loginFormData.password,user.password);
            if(passwordMatch){
                if(user.name == loginFormData.login || user.email == loginFormData.login){
                    isUserLoggedIn = true;
                    sessionToken = sign({ userId: user.id }, process.env.JWT_SECRET ?? '10491', {
                        expiresIn: '24h'
                    });
                    return new Response(JSON.stringify({ isUserLoggedIn: isUserLoggedIn, sessionToken: sessionToken, authenticatedUser: user.email, authUserId: user.id }));
                }
            }
        }
        return new Response(JSON.stringify({ isUserLoggedIn: isUserLoggedIn, sessionToken: sessionToken, authenticatedUser: "" }));   
    } catch (error) {
        console.log(`Login Error: ${error}`)
    }
    return new Response(`Login Failure`);
}