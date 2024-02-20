'use client'
import React, { useState } from 'react';
import { AuthCard } from './style';
import { Button, CardContent, CardHeader, CardMedia, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { AuthRegFormBox, AuthInputFieldsGrid, AuthInputTextField, AuthSubmissionStyle, SubmitButton } from './style';
import AccountCircleIcon  from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from '@/app/home/@postInput/style';
import createUser from './createUser';
import Swal from 'sweetalert2';

const RootComp = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [formData,setFormData] = useState({ name: '', email: '', password: '', phone: '', is_active: 0 });
    const [fileData,setFileData] = useState({ image: null });
    const fData = new FormData();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleTextFieldInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const handleFileInputChange = (event: any) => {
        const { name } = event.target;
        const file = event.target.files[0];
        const fileObj = {
            name: file.name
        }
        setFileData((prevFileData) => ({
            ...prevFileData,
            [name]: fileObj.name
        }))
    }

    const handleSubmit = async () => {
        if (fileData) {
           const imageInput = document.getElementById("image");
            if (imageInput instanceof HTMLInputElement && imageInput.type == "file") {
                if (imageInput.files) {
                    const image = imageInput.files[0];
                    fData.append("image",image);
                }
            } 
           fData.append("fileData",JSON.stringify(fileData));
           fData.append("formData",JSON.stringify(formData));
        }else{

        }
        //Apend Text/Other Inputs
        const response = await createUser(fData);
        if (response.data == `User Registered`) {
            Swal.fire(`User Registered Successfully`);
        }else{
            Swal.fire(`User Not Registered`);
        }
    }

    return (
        <>
            <AuthCard>
                <CardHeader
                title={
                    <Typography variant='h5' align='center'><strong>User Registration Form</strong></Typography>
                }
                />
                <CardMedia component='img' height="194" image="/images/user-reg-form.jpg" />
                <CardContent>
                    <Typography variant='h6' align='center'>
                        <strong>Register a User Account</strong>
                    </Typography>
                    <AuthRegFormBox>
                        <AuthInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant='h6' align="center"><strong>Username:</strong></Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <AuthInputTextField title="Your name" placeholder="Enter your Name/Username" name="name" InputProps={{ startAdornment: <InputAdornment position="start"><IconButton aria-label="Get User Name"><AccountCircleIcon /></IconButton></InputAdornment> }} onChange={handleTextFieldInputChange} />
                            </Grid>
                        </AuthInputFieldsGrid>
                        <AuthInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center"><strong>Email:</strong></Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <AuthInputTextField title="Your Email" placeholder="Enter your Email" name="email" InputProps={{ startAdornment: <InputAdornment position="start"><IconButton aria-label="get-user-email"><EmailIcon /></IconButton></InputAdornment> }} onChange={handleTextFieldInputChange} />
                            </Grid>
                        </AuthInputFieldsGrid>
                        <AuthInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center"><strong>Password:</strong></Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <AuthInputTextField title="Your Password" placeholder="Enter your password" name="password" type={ showPassword ? 'text' : 'password' } InputProps={{ startAdornment: <InputAdornment position="start"><IconButton aria-label="get-user-pass" onClick={handleClickShowPassword}>{ !showPassword ? <VisibilityOff /> : <Visibility /> }</IconButton></InputAdornment> }} onChange={handleTextFieldInputChange} />
                            </Grid>
                        </AuthInputFieldsGrid>
                        <AuthInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center"><strong>Phone Number:</strong></Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <AuthInputTextField title="Phone Number" placeholder="Enter Phone Number" name="phone" InputProps={{ startAdornment: <InputAdornment position='start'><IconButton aria-label="Get Phone Number"><LocalPhoneIcon /></IconButton></InputAdornment> }} onChange={handleTextFieldInputChange} />
                            </Grid>
                        </AuthInputFieldsGrid>
                        <AuthInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center"><strong>Your Photo:</strong></Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ width: '100%' }} onChange={handleFileInputChange}>
                                    Upload Your Image
                                    <VisuallyHiddenInput type="file" name="image" id="image" />
                                </Button>
                            </Grid>
                        </AuthInputFieldsGrid>
                        <AuthSubmissionStyle>
                            <SubmitButton variant="contained" color="success" type="submit" onClick={handleSubmit}>Submit Registration Data</SubmitButton>
                        </AuthSubmissionStyle>
                    </AuthRegFormBox>
                </CardContent>
            </AuthCard>
        </>
    )
}

export default RootComp