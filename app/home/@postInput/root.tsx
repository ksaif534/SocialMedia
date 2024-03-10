'use client'
import * as React from 'react';
import { CardContent, Typography, Grid } from '@mui/material';
import ProfileLogo from '../@profileLogo/page';
import { PostInputCard, ProfileGridItem } from './style'
import PostInputModalForm from './modal'

const RootComp = () => {
    
    return (
        <>
            <PostInputCard>
                <CardContent>
                    <Grid container spacing={2}>
                        <ProfileGridItem item md={1} sm={1} xs={12}>
                            <ProfileLogo name="SK" imageUrl="/images/beautiful-bg-custom.jpg" />
                        </ProfileGridItem>
                        <Grid item md={11} sm={11} xs={12}>
                            <PostInputModalForm />
                        </Grid>
                    </Grid>
                </CardContent>
            </PostInputCard>
        </>
    )
}

export default RootComp