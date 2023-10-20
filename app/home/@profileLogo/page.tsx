'use client'
import React from "react";
import { Avatar, Box } from "@mui/material";

type ProfileLogoProps = {
    name: string,
    imageUrl: string
}

const ProfileLogo : React.FC<ProfileLogoProps> = ({ name, imageUrl }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Avatar alt={name} src={imageUrl} />
        </Box>
    )
}

export default ProfileLogo