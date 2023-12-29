'use client'
import * as React from 'react';
import { CardContent, Typography, Grid } from '@mui/material';
import ProfileLogo from '../@profileLogo/page';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { PostInputCard, ProfileGridItem, PostInputGrid, PostInputGridItem, PostInputIconButton } from './style'
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
                    <PostInputGrid container spacing={2}>
                        <PostInputGridItem item md={4} sm={6} xs={12}>
                            <PostInputIconButton>
                                <VideoCameraBackIcon fontSize="large" />
                                <Typography variant="h5" color="text.primary">Video</Typography>
                            </PostInputIconButton>
                        </PostInputGridItem>
                        <PostInputGridItem item md={4} sm={6} xs={12}>
                            <PostInputIconButton>
                                <InsertPhotoIcon fontSize="large" />
                                <Typography variant="h5" color="text.primary">Photos/Images</Typography>
                            </PostInputIconButton>
                        </PostInputGridItem>
                        <PostInputGridItem item md={4} sm={6} xs={12}>
                            <PostInputIconButton>
                                <EmojiEmotionsIcon fontSize="large" />
                                <Typography variant="h5" color="text.primary">Feeling</Typography>
                            </PostInputIconButton>
                        </PostInputGridItem>
                    </PostInputGrid>
                </CardContent>
            </PostInputCard>
        </>
    )
}

export default RootComp