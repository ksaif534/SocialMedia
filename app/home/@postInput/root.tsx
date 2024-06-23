'use client'
import * as React from 'react';
import { CardContent, Grid } from '@mui/material';
import ProfileLogo from '../@profileLogo/page';
import { PostInputCard, ProfileGridItem } from './style'
import PostInputModalForm from './modal'
import { useEffect, useState } from 'react';
import fetchUser from '@/app/profile/@profileCoverHeading/fetchUser';
import Cookies from 'js-cookie';

const RootComp = (props: any) => {
    const { group } = props;
    const authUserId = Cookies.get("authUserId");
    const [authenticatedUser,setAuthenticatedUser] = useState({ id: 0, name: '', email: '', password: '', image: '', phone: 0, is_active: 0 })

    useEffect(() => {
        fetchUser(authUserId).then((user: any) => {
            setAuthenticatedUser(user);
        })
    },[])
    
    return (
        <>
            <PostInputCard>
                <CardContent>
                    <Grid container spacing={2}>
                        <ProfileGridItem item md={1} sm={1} xs={12}>
                            <ProfileLogo name={authenticatedUser?.name} imageUrl={authenticatedUser?.image} />
                        </ProfileGridItem>
                        <Grid item md={11} sm={11} xs={12}>
                            <PostInputModalForm group={group} />
                        </Grid>
                    </Grid>
                </CardContent>
            </PostInputCard>
        </>
    )
}

export default RootComp