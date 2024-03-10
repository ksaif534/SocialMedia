'use client'
import { CardContent, CardHeader, CardMedia, Grid, IconButton, InputAdornment, Typography } from "@mui/material"
import { AuthLoginFormBox, AuthLoginInputFieldsGrid, AuthLoginInputTextField, AuthLoginSubmissionStyle, LoginCard, SubmitButton } from "./style"
import AccountCircleIcon  from '@mui/icons-material/AccountCircle';
import { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import checkLoginData from '../checkLoginData';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import fetchUsers from "../fetchUsers";

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
        sessionStorage.setItem("sessionToken",response.data.sessionToken);
        sessionStorage.setItem("authUser",response.data.authenticatedUser);
        sessionStorage.setItem("authUserId",response.data.authUserId);
        if(Boolean(response.data.isUserLoggedIn)){
            //Authenticated Successfully
            router.push(`/home`);
        }else{
            Swal.fire(`Login/Authentication Failed`);
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