'use client'
import * as React from 'react';
import { CardContent, Grid } from '@mui/material';
import ProfileLogo from '../@profileLogo/page';
import { PostInputCard, ProfileGridItem } from './style'
import PostInputModalForm from './modal'
import { useEffect, useState } from 'react';
import fetchUser from '@/app/profile/@profileCoverHeading/fetchUser';
import Cookies from 'js-cookie';
import fetchTmpDirImages from '../@navsidebar/fetchTmpDirImages';
import path from 'path';

const RootComp = (props: any) => {
    const { group } = props;
    const authUserId = Cookies.get("authUserId");
    const [authenticatedUser,setAuthenticatedUser] = useState({ id: 0, name: '', email: '', password: '', image: null, phone: 0, is_active: 0 })
    const [tmpDirImage,setTmpDirImage] = useState('');

    useEffect(() => {
        fetchUser(authUserId).then((user: any) => {
            setAuthenticatedUser(user);
            fetchTmpDirImages(user?.image).then(async (imageBuffer: any) => {
                const buffer = await imageBuffer.arrayBuffer();
                const blob = new Blob([buffer], { type: `${path.extname(user?.image).substring(1)}` });
                setTmpDirImage(URL.createObjectURL(blob));
            })
        })
    },[])
    
    return (
        <>
            <PostInputCard>
                <CardContent>
                    <Grid container spacing={2}>
                        <ProfileGridItem item md={1} sm={1} xs={12}>
                            <ProfileLogo name={authenticatedUser?.name} imageUrl={tmpDirImage} />
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