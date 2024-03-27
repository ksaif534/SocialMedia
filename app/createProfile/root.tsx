'use client'
import { Button, CardContent, CardHeader, CardMedia, Grid, IconButton, InputAdornment, MenuItem, Radio, Typography } from "@mui/material"
import { ProfileCreateCard, ProfileCreationFormBox, ProfileCreationFormControlLabel, ProfileCreationFormSubmissionStyle, ProfileCreationInputFieldsGrid, ProfileCreationInputFormSelect, ProfileCreationInputRadioGroup, ProfileCreationInputTextField } from "./style"
import AccountCircleIcon  from '@mui/icons-material/AccountCircle';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from "../home/@postInput/style";
import { useState, useEffect } from "react";
import storeProfile from "./storeProfile";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const RootComp = () => {
    const router = useRouter();
    const [profileFormData,setProfileFormData] = useState({ user_id: 0, firstname: '', lastname: '', marital_status: 1, gender: 1, birthDate: null, education_level: 1, occupation: 0, country: '', city: '', address: '' });
    const [profileFileData,setProfileFileData] = useState({ profile_photo: null });
    const fData = new FormData();

    useEffect(() => {
        if (sessionStorage.length > 0) {
            if (sessionStorage.getItem("authUser") == "" || sessionStorage.getItem("sessionToken") == "") {
                router.push(`/auth/login`);
            }   
        }else{
            router.push(`/auth/login`);
        }
    },[])

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setProfileFormData((prevProfileData) => ({
            ...prevProfileData,
            [name]: value
        }));
    }

    const handleFileInputChange = (event: any) => {
        const { name } = event.target;
        const file = event.target.files[0];
        const fileObj = {
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            name: file.name,
            size: file.size,
            type: file.type,
            webkitRelativePath: file.webkitRelativePath
        }
        setProfileFileData((prevFileData) => ({
            ...prevFileData,
            [name]: fileObj
        }))
    }

    const handleSubmit = async () => {
        if (profileFileData) {
            const profilePhotoInput = document.getElementById("profile_photo");
            if (profilePhotoInput instanceof HTMLInputElement && profilePhotoInput.type == "file") {
                if (profilePhotoInput.files) {
                    const profilePhoto = profilePhotoInput.files[0];
                    fData.append("profile_photo", profilePhoto);   
                }
            }  
        }
        //Append the File Data
        fData.append("fileObj",JSON.stringify(profileFileData));
        fData.append("formData",JSON.stringify(profileFormData));
        //Append Session Data
        fData.append("sessionData",JSON.stringify(sessionStorage.getItem("authUserId")));
        //Backend Call
        const newProfile = await storeProfile(fData);
        if (Boolean(newProfile)) {
            Swal.fire({
                title: `Success`,
                text: `Profile Created Successfully`
            });
            router.push(`/home`);
        }else{
            Swal.fire({
                title: `Failure`,
                text: `Profile Not Created`
            });
            router.push(`/home`);
        }
    }

    return (
        <>
            <ProfileCreateCard>
                <CardHeader 
                    title={<Typography variant="h5" align="center"><strong>Profile Creation Form</strong></Typography>}
                />
                <CardMedia component='img' height="300" image="images/user-reg-form.jpg" />
                <CardContent>
                    <Typography variant="h6" align="center">
                        <strong>Create User Profile</strong>
                    </Typography>
                    <ProfileCreationFormBox>
                        <ProfileCreationInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>First Name:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileCreationInputTextField title="Enter Your First Name" placeholder="Enter first name" name="firstname" InputProps={{ startAdornment: <InputAdornment position="start"><IconButton aria-label="Get User First Name"></IconButton><AccountCircleIcon /></InputAdornment> }} onChange={handleInputChange} />
                            </Grid>
                        </ProfileCreationInputFieldsGrid>
                        <ProfileCreationInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Last Name:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileCreationInputTextField title="Enter Your Last Name" placeholder="Enter last name" name="lastname" InputProps={{ startAdornment: <InputAdornment position="start"><IconButton aria-label="Get User Last Name"><AccountCircleIcon /></IconButton></InputAdornment> }} onChange={handleInputChange} />
                            </Grid>
                        </ProfileCreationInputFieldsGrid>
                        <ProfileCreationInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Marital Status:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileCreationInputRadioGroup name="marital_status" onChange={handleInputChange}>
                                    <ProfileCreationFormControlLabel label="Married" value={Number("0")} control={<Radio />} />
                                    <ProfileCreationFormControlLabel label="Unmarried" value={Number("1")} control={<Radio />} />
                                </ProfileCreationInputRadioGroup>
                            </Grid>
                        </ProfileCreationInputFieldsGrid>
                        <ProfileCreationInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Gender:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileCreationInputRadioGroup name="gender" onChange={handleInputChange}>
                                    <ProfileCreationFormControlLabel label="Male" value={Number("0")} control={<Radio />} />
                                    <ProfileCreationFormControlLabel label="Female" value={Number("1")} control={<Radio />} />
                                </ProfileCreationInputRadioGroup>
                            </Grid>
                        </ProfileCreationInputFieldsGrid>
                        <ProfileCreationInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Birth Date:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileCreationInputTextField title="Enter User Birth Date" placeholder="Enter User Birth Date" type="date" name="birthDate" onChange={handleInputChange} />
                            </Grid>
                        </ProfileCreationInputFieldsGrid>
                        <ProfileCreationInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Education Level:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileCreationInputFormSelect labelId="profile-creation-type-select" id="profile-creation-education-type" name="education_level" value={Number(profileFormData.education_level)} onChange={handleInputChange}>
                                    <MenuItem value={1}>Primary(Max)</MenuItem>
                                    <MenuItem value={2}>Secondary(Max)</MenuItem>
                                    <MenuItem value={3}>Tertiary(Max)</MenuItem>
                                </ProfileCreationInputFormSelect>
                            </Grid>
                        </ProfileCreationInputFieldsGrid>
                        <ProfileCreationInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Occupation:</strong>
                                </Typography>
                            </Grid> 
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileCreationInputFormSelect labelId="profile-creation-type-select" id="profile-creation-occupation-select" name="occupation" value={Number(profileFormData.occupation)} onChange={handleInputChange}>
                                    <MenuItem value={1}>Service Holder</MenuItem>
                                    <MenuItem value={2}>Business Man/Entrepreneur</MenuItem>
                                    <MenuItem value={0}>No Occupation</MenuItem>
                                </ProfileCreationInputFormSelect>
                            </Grid>
                        </ProfileCreationInputFieldsGrid>
                        <ProfileCreationInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Country:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileCreationInputFormSelect labelId="profile-creation-type-select" id="profile-creation-country-select" name="country" value={Number(profileFormData.country)} onChange={handleInputChange}>
                                    <MenuItem value={0}>Bangladesh</MenuItem>
                                    <MenuItem value={1}>USA</MenuItem>
                                    <MenuItem value={2}>UK</MenuItem>
                                </ProfileCreationInputFormSelect>
                            </Grid>
                        </ProfileCreationInputFieldsGrid>
                        <ProfileCreationInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>City</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileCreationInputFormSelect labelId="profile-creation-type-select" id="profile-creation-city-select" name="city" value={Number(profileFormData.city)} onChange={handleInputChange}>
                                    <MenuItem value={0}>Dhaka</MenuItem>
                                    <MenuItem value={1}>New York</MenuItem>
                                    <MenuItem value={2}>London</MenuItem>
                                </ProfileCreationInputFormSelect>
                            </Grid>
                        </ProfileCreationInputFieldsGrid>
                        <ProfileCreationInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Address:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileCreationInputTextField title="Enter Address" name="address" placeholder="Enter Your Address" InputProps={{ startAdornment: <InputAdornment position="start"><IconButton aria-label="Enter User Address"><AddLocationIcon /></IconButton></InputAdornment> }} onChange={handleInputChange} />
                            </Grid>
                        </ProfileCreationInputFieldsGrid>
                        <ProfileCreationInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Profile Photo:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <Button component='label' variant="contained" startIcon={<CloudUploadIcon />} sx={{ width: '100%' }} onChange={handleFileInputChange}>
                                    Upload Profile Photo:
                                    <VisuallyHiddenInput type="file" name="profile_photo" id="profile_photo" />
                                </Button>
                            </Grid>
                        </ProfileCreationInputFieldsGrid>
                        <br />
                        <ProfileCreationFormSubmissionStyle>
                            <Button variant="contained" color="success" type="submit" onClick={handleSubmit}>Create User Profile</Button>
                        </ProfileCreationFormSubmissionStyle>
                    </ProfileCreationFormBox>
                </CardContent>
            </ProfileCreateCard>
        </>
    )
}

export default RootComp