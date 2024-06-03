'use client'
import { Button, CardContent, CardHeader, CardMedia, Grid, IconButton, InputAdornment, MenuItem, Radio, Typography } from "@mui/material"
import { ProfileUpdateCard, ProfileUpdateFormBox, ProfileUpdateFormControlLabel, ProfileUpdateFormSubmissionStyle, ProfileUpdateInputFieldsGrid, ProfileUpdateInputFormSelect, ProfileUpdateInputRadioGroup, ProfileUpdateInputTextField } from "./style"
import { useState, useEffect } from "react"
import fetchProfile from "@/app/profile/@profileCoverHeading/fetchProfile"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from "@/app/home/@postInput/style"
import AccountCircleIcon  from '@mui/icons-material/AccountCircle';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Update from "./update"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

const RootComp = () => {
    const router = useRouter();
    const authUserId = Cookies.get("authUserId");
    const [profile,setProfile] = useState({ user_id: 0, firstname: '', lastname: '', marital_status: 1, gender: 1, birthdate: null, education_level: 1, occupation: 0, country: '', city: '', address: '' })
    const [profileFile,setProfileFile] = useState({ profile_photo: null })
    const fData = new FormData();

    useEffect(() => {
        fetchProfile(authUserId).then((profile: any) => setProfile(profile))
    },[])

    const handleProfileUpdateTextInputChange = (event: any) => {
        const { name, value } = event.target;
        setProfile((prevProfileData) => ({
            ...prevProfileData,
            [name]: value
        }))
    }

    const handleProfileUpdateFileInputChange = (event: any) => {
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
        setProfileFile((prevProfileFileData) => ({
            ...prevProfileFileData,
            [name]: fileObj
        }))
    }

    const handleSubmit = async () => {
        if (profile) {
            const profilePhotoInput = document.getElementById("profile_photo");
            if (profilePhotoInput instanceof HTMLInputElement && profilePhotoInput.type == "file") {
                if (profilePhotoInput.files) {
                    const profilePhoto = profilePhotoInput.files[0];
                    fData.append("profile_photo",profilePhoto);
                }
            }
        }
        //Append the File Data
        fData.append("fileObj",JSON.stringify(profileFile));
        //Append the Form Data
        fData.append("formData",JSON.stringify(profile));
        //Append Session Data
        fData.append("sessionData",JSON.stringify(authUserId));
        //Backend Call
        const updateProfile = await Update(fData,authUserId);
        if (Boolean(updateProfile)) {
            Swal.fire(`Profile Updated Successfully`);
            router.push(`/profile`);
        }else{
            Swal.fire(`Profile Not Updated`);
            router.push(`/profile`);
        }
    }

    return (
        <>
            <ProfileUpdateCard>
                <CardHeader 
                title={<Typography variant="h6" align="center"><strong>Profile Edit Form</strong></Typography>}
                />
                <CardMedia component='img' height="300" image="/images/user-reg-form.jpg" />
                <CardContent>
                    <Typography variant="h6" align="center">
                        <strong>Edit/Update User Profile</strong>
                    </Typography>
                    <ProfileUpdateFormBox>
                        <ProfileUpdateInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={3}>
                                <Typography variant="h6" align="center">
                                    <strong>First Name:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={3}>
                                <ProfileUpdateInputTextField title="Edit/Update User First Name" name="firstname" value={profile.firstname} InputProps={{ startAdornment: <InputAdornment position="start"><IconButton aria-label="Update User First Name"><AccountCircleIcon /></IconButton></InputAdornment> }} onChange={handleProfileUpdateTextInputChange} />
                            </Grid>
                        </ProfileUpdateInputFieldsGrid>
                        <ProfileUpdateInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Last Name:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileUpdateInputTextField title="Edit/Update User Last Name" name="lastname" value={profile.lastname} InputProps={{ startAdornment: <InputAdornment position="start"><IconButton aria-label="Update User Last Name"><AccountCircleIcon /></IconButton></InputAdornment> }} onChange={handleProfileUpdateTextInputChange} />
                            </Grid>
                        </ProfileUpdateInputFieldsGrid>
                        <ProfileUpdateInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Marital Status:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileUpdateInputRadioGroup name="marital_status" value={Number(profile.marital_status)} onChange={handleProfileUpdateTextInputChange}>
                                    <ProfileUpdateFormControlLabel label="Married" value={Number("0")} control={<Radio />} />
                                    <ProfileUpdateFormControlLabel label="Unmarried" value={Number("1")} control={<Radio />} />
                                </ProfileUpdateInputRadioGroup>
                            </Grid>
                        </ProfileUpdateInputFieldsGrid>
                        <ProfileUpdateInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Gender:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileUpdateInputRadioGroup name="gender" value={Number(profile.gender)} onChange={handleProfileUpdateTextInputChange}>
                                    <ProfileUpdateFormControlLabel label="Male" value={Number("0")} control={<Radio />} />
                                    <ProfileUpdateFormControlLabel label="Female" value={Number("1")} control={<Radio />} />
                                </ProfileUpdateInputRadioGroup>
                            </Grid>
                        </ProfileUpdateInputFieldsGrid>
                        <ProfileUpdateInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Birth Date:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileUpdateInputTextField title="Update User Birth Date" type="date" name="birthdate" onChange={handleProfileUpdateTextInputChange} />
                            </Grid>
                        </ProfileUpdateInputFieldsGrid>
                        <ProfileUpdateInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={3}>
                                <Typography variant="h6" align="center">
                                    <strong>Education Level:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={3}>
                                <ProfileUpdateInputFormSelect labelId="profile-update-type-select" id="profile-update-education-type" name="education_level" value={Number(profile.education_level)} onChange={handleProfileUpdateTextInputChange}>
                                    <MenuItem value={1}>Primary(Max)</MenuItem>
                                    <MenuItem value={2}>Secondary(Max)</MenuItem>
                                    <MenuItem value={3}>Tertiary(Max)</MenuItem>
                                </ProfileUpdateInputFormSelect>
                            </Grid>
                        </ProfileUpdateInputFieldsGrid>
                        <ProfileUpdateInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Occupation:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileUpdateInputFormSelect labelId="profile-update-type-select" id="profile-update-occupation-select" name="occupation" value={Number(profile.occupation)} onChange={handleProfileUpdateTextInputChange}>
                                    <MenuItem value={1}>Service Holder</MenuItem>
                                    <MenuItem value={2}>Business Man/Entrepreneur</MenuItem>
                                    <MenuItem value={0}>No Occupation</MenuItem>
                                </ProfileUpdateInputFormSelect>
                            </Grid>
                        </ProfileUpdateInputFieldsGrid>
                        <ProfileUpdateInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Country:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileUpdateInputFormSelect labelId="profile-update-type-select" id="profile-update-country-select" name="country" value={Number(profile.country)} onChange={handleProfileUpdateTextInputChange}>
                                    <MenuItem value={0}>Bangladesh</MenuItem>
                                    <MenuItem value={1}>USA</MenuItem>
                                    <MenuItem value={2}>UK</MenuItem>
                                </ProfileUpdateInputFormSelect>
                            </Grid>
                        </ProfileUpdateInputFieldsGrid>
                        <ProfileUpdateInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>City:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileUpdateInputFormSelect labelId="profile-update-type-select" id="profile-update-city-select" name="city" value={Number(profile.city)} onChange={handleProfileUpdateTextInputChange}>
                                    <MenuItem value={0}>Dhaka</MenuItem>
                                    <MenuItem value={1}>New York</MenuItem>
                                    <MenuItem value={2}>London</MenuItem>
                                </ProfileUpdateInputFormSelect>
                            </Grid>
                        </ProfileUpdateInputFieldsGrid>
                        <ProfileUpdateInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Address:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <ProfileUpdateInputTextField title="Edit/Update Address" name="address" value={profile.address} InputProps={{ startAdornment: <InputAdornment position="start"><IconButton aria-label="Enter User Address"><AddLocationIcon /></IconButton></InputAdornment> }} onChange={handleProfileUpdateTextInputChange} />
                            </Grid>
                        </ProfileUpdateInputFieldsGrid>
                        <ProfileUpdateInputFieldsGrid container spacing={2}>
                            <Grid item md={3} sm={3} xs={12}>
                                <Typography variant="h6" align="center">
                                    <strong>Profile Photo:</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={9} sm={9} xs={12}>
                                <Button component='label' variant="contained" startIcon={<CloudUploadIcon />} sx={{ width: '100%' }} onChange={handleProfileUpdateFileInputChange}>
                                    Upload Profile Photo:
                                    <VisuallyHiddenInput type="file" name="profile_photo" id="profile_photo" />
                                </Button>
                            </Grid>
                        </ProfileUpdateInputFieldsGrid>
                        <br />
                        <ProfileUpdateFormSubmissionStyle>
                            <Button variant="contained" color="success" type="submit" onClick={handleSubmit}>
                                Update User Profile
                            </Button>
                        </ProfileUpdateFormSubmissionStyle>
                    </ProfileUpdateFormBox>
                </CardContent>
            </ProfileUpdateCard>
        </>
    )
}

export default RootComp