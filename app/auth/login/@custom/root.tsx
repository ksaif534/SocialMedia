'use client'
import { CardContent, CardHeader, CardMedia, Grid, IconButton, InputAdornment, Typography } from "@mui/material"
import { AuthLoginFormBox, AuthLoginInputFieldsGrid, AuthLoginInputTextField, AuthLoginSubmissionStyle, LoginCard, SubmitButton } from "./style"
import AccountCircleIcon  from '@mui/icons-material/AccountCircle';
import { useState, useEffect, createContext, useContext } from "react";
import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import checkLoginData from '../checkLoginData';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import fetchUsers from "../fetchUsers";
import Cookies from 'js-cookie';

export const LoginCardForUnitTesting = () => {
    return (
        <LoginCard>
            <CardHeader 
            title={
                <Typography variant="h5" align="center"><strong>Authentication Form</strong></Typography>
            }
            />
            <CardMedia component='img' height='194' image="/images/user-reg-form.jpg" />
            <CardContent>
                <Typography variant="h6" align="center">
                    <strong>Login to the User/Admin Account</strong>
                </Typography>
                <AuthLoginFormBox>
                    <AuthLoginInputFieldsGrid container spacing={2}>
                        <Grid item md={3} sm={3} xs={12}>
                            <Typography variant="h6" align="center"><strong>Username/Email:</strong></Typography>
                        </Grid>
                        <Grid item md={9} sm={9} xs={12}>
                            <AuthLoginInputTextField title="Your Username/Email" placeholder="Enter your Username/Email" name="login" InputProps={{ startAdornment: <InputAdornment position="start"><IconButton aria-label="get-username"><AccountCircleIcon /></IconButton></InputAdornment> }} />
                        </Grid>
                    </AuthLoginInputFieldsGrid>
                    <AuthLoginInputFieldsGrid container spacing={2}>
                        <Grid item md={3} sm={3} xs={12}>
                            <Typography variant="h6" align="center"><strong>Password:</strong></Typography>
                        </Grid>
                        <Grid item md={9} sm={9} xs={12}>
                            <AuthLoginInputTextField title="Your Password" placeholder="Enter your Password" name="password" type="password" InputProps={{ startAdornment: <InputAdornment position='start'><IconButton aria-label="get-user-pass"><VisibilityOff /></IconButton></InputAdornment> }} />
                        </Grid>
                    </AuthLoginInputFieldsGrid>
                    <AuthLoginSubmissionStyle>
                        <SubmitButton variant="contained" color="success" type="submit" id="submit">Login to Account</SubmitButton>
                    </AuthLoginSubmissionStyle>
                </AuthLoginFormBox>
            </CardContent>
        </LoginCard>
    )
}

interface SessionDataContextProps {
    authUser: string,
    setAuthUser: (newAuthUser: any) => void,
    authUserId: string | number,
    setAuthUserId: (newAuthUserId: any) => void,
    sessionToken: string,
    setSessionToken: (newSessionToken: any) => void
}

export const SessionDataContext = createContext<SessionDataContextProps>({
    authUser: '',
    setAuthUser: () => {},
    authUserId: '',
    setAuthUserId: () => {},
    sessionToken: '',
    setSessionToken: () => {}
})

const RootComp = () => {
    const router = useRouter();
    const [users,setUsers] = useState([]);
    const [showPassword,setShowPassword] = useState(false);
    const [loginFormData,setLoginFormData] = useState({ login: '', password: ''});

    useEffect(() => {
        fetchUsers().then((users: any) => setUsers(users))
    },[])

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleTextFieldInputChange = (event: any) => {
        const { name, value } = event.target;
        setLoginFormData((prevLoginFormData) => ({
            ...prevLoginFormData,
            [name]: value
        }))
    }

    const handleLoginFormSubmit = async () => {
        const response = await checkLoginData(loginFormData,users);
        Cookies.set("authUser",response.data.authenticatedUser);
        Cookies.set("authUserId",response.data.authUserId);
        Cookies.set("sessionToken",response.data.sessionToken);
        if(Boolean(response.data.isUserLoggedIn)){
            //Authenticated Successfully
            router.push(`/home`);
        }else{
            Swal.fire({
                title: `Authentication Failure`,
                text: `Login/Authentication Failed`
            });
        }
    }

    return (
        <>
            <LoginCard>
                <CardHeader 
                title={
                    <Typography variant="h5" align="center"><strong>Authentication Form</strong></Typography>
                }
                />
                <CardMedia component='img' height='194' image="/images/user-reg-form.jpg" />
                <CardContent>
                    <Typography variant="h6" align="center">
                        <strong>Login to the User/Admin Account</strong>
                    </Typography>
                    <AuthLoginFormBox>
                        <AuthLoginInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center"><strong>Username/Email:</strong></Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <AuthLoginInputTextField title="Your Username/Email" placeholder="Enter your Username/Email" name="login" InputProps={{ startAdornment: <InputAdornment position="start"><IconButton aria-label="get-username"><AccountCircleIcon /></IconButton></InputAdornment> }} onChange={handleTextFieldInputChange} />
                            </Grid>
                        </AuthLoginInputFieldsGrid>
                        <AuthLoginInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center"><strong>Password:</strong></Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <AuthLoginInputTextField title="Your Password" placeholder="Enter your Password" name="password" type={showPassword ? 'text' : 'password' } InputProps={{ startAdornment: <InputAdornment position='start'><IconButton aria-label="get-user-pass" onClick={handleClickShowPassword}>{ !showPassword ? <VisibilityOff /> : <Visibility /> }</IconButton></InputAdornment> }} onChange={handleTextFieldInputChange} />
                            </Grid>
                        </AuthLoginInputFieldsGrid>
                        <AuthLoginSubmissionStyle>
                            <SubmitButton variant="contained" color="success" type="submit" onClick={handleLoginFormSubmit}>Login to Account</SubmitButton>
                        </AuthLoginSubmissionStyle>
                    </AuthLoginFormBox>
                </CardContent>
            </LoginCard>
        </>
    )
}

export default RootComp