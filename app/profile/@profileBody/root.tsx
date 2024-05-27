'use client'
import { Grid, CardContent, Typography, Button, ImageList, ImageListItem, CardHeader } from "@mui/material";
import { FriendListCard, IntroBox, IntroBoxCard, IntroGrid, IntroTG, ProfilePhotosCard, SeeAllFriends, SeeAllPhotos } from "./style";
import { useState, useEffect } from 'react';
import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import fetchUser from "../@profileCoverHeading/fetchUser";
import PostInput from "../../home/@postInput/page";
import Posts from "../../home/@posts/page";
import { useRouter } from "next/navigation";
import Image from 'next/image'

export const IntroBoxForUnitTesting = () => {
    return (
        <IntroBox>
            <IntroBoxCard variant="outlined">
                <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                    <IntroTG variant="h4">Intro</IntroTG>
                </div>
                <CardContent>
                    <IntroGrid container spacing={2}>
                        <Grid item md={2} sm={12} xs={12}>
                            <HomeIcon fontSize="large" />
                        </Grid>
                        <Grid item md={10} sm={12} xs={12}>
                            <Typography variant="h6">Lives in <strong>Ka-115/6/1,Mohakhali Dakkhin Para, Dhaka-1212</strong></Typography>
                        </Grid>
                        <Grid item md={2} sm={12} xs={12}>
                            <LocationOnIcon fontSize="large" />
                        </Grid>
                        <Grid item md={10} sm={12} xs={12}>
                            <Typography variant="h6">From <strong>Ka-115/6/1,Mohakhali Dakkhin Para, Dhaka-1212</strong></Typography>
                        </Grid>
                        <Grid item md={2} sm={12} xs={12}>
                            <RssFeedIcon fontSize="large" />
                        </Grid>
                        <Grid item md={10} sm={12} xs={12}>
                            <Typography variant="h6">Followed by <strong>2 People</strong></Typography>
                        </Grid>
                    </IntroGrid>
                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                        <Button variant="outlined" color="secondary">Edit Details</Button>
                    </div>
                </CardContent>
            </IntroBoxCard>
        </IntroBox>
    )
}

const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
];

const RootComp = (props: any) => {
    const { profilePosts, profile , otherProfile , videoPosts, acceptedProfileNetworks, recipientUser } = props;
    const router = useRouter();
    const [user,setUser] = useState({ id: 0, email: '', password: '', image: null, is_active: 0, name: '', phone: 0 });
    let lengthMeasureArr: any = [];

    const editProfileDetails = () => {
        router.push(`/updateProfile/${profile.user_id}`);
    }

    useEffect(() => {
        fetchUser(localStorage.getItem("authUserId")).then((user: any) => setUser(user));
    },[])

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                    <Grid container spacing={2}>
                        <Grid item md={4} sm={12} xs={12}>
                            <IntroBox>
                                <IntroBoxCard variant="outlined">
                                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                                        <IntroTG variant="h4">Intro</IntroTG>
                                    </div>
                                    <CardContent>
                                        <IntroGrid container spacing={2}>
                                            <Grid item md={2} sm={12} xs={12}>
                                                <HomeIcon fontSize="large" />
                                            </Grid>
                                            <Grid item md={10} sm={12} xs={12}>
                                                {
                                                    (otherProfile !== undefined) ? (
                                                        <Typography variant="h6">Lives in <strong>{ otherProfile?.address }</strong></Typography>
                                                    ) : (
                                                        <Typography variant="h6">Lives in <strong>{ profile?.address }</strong></Typography>
                                                    )
                                                }
                                            </Grid>
                                            <Grid item md={2} sm={12} xs={12}>
                                                <LocationOnIcon fontSize="large" />
                                            </Grid>
                                            <Grid item md={10} sm={12} xs={12}>
                                                {
                                                    (otherProfile !== undefined) ? (
                                                        <Typography variant="h6">From <strong>{ otherProfile?.address }</strong></Typography>
                                                    ) : (
                                                        <Typography variant="h6">From <strong>{ profile?.address }</strong></Typography>
                                                    )
                                                }
                                            </Grid>
                                            <Grid item md={2} sm={12} xs={12}>
                                                <RssFeedIcon fontSize="large" />
                                            </Grid>
                                            <Grid item md={10} sm={12} xs={12}>
                                                <Typography variant="h6">Followed by <strong>2 People</strong></Typography>
                                            </Grid>
                                        </IntroGrid>
                                        {
                                            (otherProfile?.user_id == 0 || otherProfile == undefined) && (
                                                <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                                                    <Button variant="outlined" color="secondary" onClick={editProfileDetails}>Edit Details</Button>
                                                </div>
                                            )
                                        }
                                    </CardContent>
                                </IntroBoxCard>
                            </IntroBox>
                            <ProfilePhotosCard>
                                <CardHeader title={<Typography variant="h4" sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex'}}><strong>Photos</strong></Typography>} />
                                <CardContent>
                                    <ImageList cols={3} rowHeight={164}>
                                        {itemData.map((item) => (
                                        <ImageListItem key={item.img}>
                                        <Image
                                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                            alt={item.title}
                                            loading="lazy"
                                            width={80}
                                            height={150}
                                        />
                                        </ImageListItem>
                                    ))}
                                    </ImageList>
                                    <SeeAllPhotos>
                                        <Button variant="outlined" color="info">See All Photos</Button>
                                    </SeeAllPhotos>
                                </CardContent>
                            </ProfilePhotosCard>
                            <FriendListCard>
                                {
                                    (acceptedProfileNetworks?.length > 0) && (
                                        <>
                                            {
                                                acceptedProfileNetworks?.map((acceptedProfileNetwork: any,index: number) => {
                                                    if (acceptedProfileNetwork.user_id_from == profile?.user_id) {
                                                        lengthMeasureArr.push(index);
                                                    }else{
                                                        if (acceptedProfileNetwork.user_id_to == profile?.user_id) {
                                                            if (JSON.stringify(recipientUser) == '{}') {
                                                                
                                                            }else{
                                                                if (recipientUser?.id == acceptedProfileNetwork.user_id_from) {
                                                                    lengthMeasureArr.push(index);
                                                                }
                                                            }
                                                        }
                                                    }
                                                })
                                            }       
                                        </>
                                    )
                                }
                                <CardHeader title={<Typography variant="h5" sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}><strong>{ lengthMeasureArr?.length } Requested Friend(s)</strong></Typography>} />
                                <CardContent>
                                    <ImageList cols={3} rowHeight={164}>
                                        {
                                            (acceptedProfileNetworks?.length > 0) && (
                                                <>
                                                    {
                                                        acceptedProfileNetworks.map((acceptedProfileNetwork: any) => {
                                                            if (acceptedProfileNetwork.user_id_from == profile?.user_id) {
                                                                return (
                                                                    <ImageListItem key={acceptedProfileNetwork.id}>
                                                                        <Image
                                                                            src={`images/${acceptedProfileNetwork?.user?.image}`}
                                                                            alt={acceptedProfileNetwork?.user?.image}
                                                                            loading="lazy"
                                                                            width={80}
                                                                            height={150}
                                                                        />
                                                                    </ImageListItem>
                                                                )    
                                                            }else{
                                                                if (acceptedProfileNetwork.user_id_to == profile?.user_id) {
                                                                    if (JSON.stringify(recipientUser) == '{}') {
                                                                        
                                                                    }else{
                                                                        if (recipientUser?.id == acceptedProfileNetwork.user_id_from) {
                                                                            return (
                                                                                <ImageListItem key={acceptedProfileNetwork.id}>
                                                                                    <Image
                                                                                        src={`images/${recipientUser?.image}`}
                                                                                        alt={acceptedProfileNetwork?.user?.image}
                                                                                        loading="lazy"
                                                                                        width={80}
                                                                                        height={150}
                                                                                    />
                                                                                </ImageListItem>
                                                                            )
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        })
                                                    }       
                                                </>
                                            )
                                        }
                                    </ImageList>
                                    <SeeAllFriends>
                                        <Button variant="outlined" color="warning">See All Friends</Button>
                                    </SeeAllFriends>
                                </CardContent>
                            </FriendListCard>
                        </Grid>
                        <Grid item md={8} sm={12} xs={12}>
                            <PostInput />
                            <Posts posts={profilePosts} videoPosts={videoPosts} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default RootComp