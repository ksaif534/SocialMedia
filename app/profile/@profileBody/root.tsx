'use client'
import { Grid, CardContent, Typography, Button, ImageList, ImageListItem, CardHeader } from "@mui/material";
import { FriendListCard, IntroBox, IntroBoxCard, IntroGrid, IntroTG, ProfilePhotosCard, ProfilePostDivider, ProfilePostIconButton, ProfilePostIconGridItem, ProfilePostInputCard, ProfilePostInputGrid, ProfilePostInputGridItem, ProfilePostInputTextField, RoundedAvatar, SeeAllFriends, SeeAllPhotos } from "./style";
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ProfilePost from "./profilePost";

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

const RootComp = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={2} sm={12} xs={12}></Grid>
                <Grid item md={8} sm={12} xs={12}>
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
                                                <Typography variant="h6">Lives in <strong>Dhaka, Bangladesh</strong></Typography>
                                            </Grid>
                                            <Grid item md={2} sm={12} xs={12}>
                                                <LocationOnIcon fontSize="large" />
                                            </Grid>
                                            <Grid item md={10} sm={12} xs={12}>
                                                <Typography variant="h6">From <strong>Dhaka, Bangladesh</strong></Typography>
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
                            <ProfilePhotosCard>
                                <CardHeader title={<Typography variant="h4" sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex'}}><strong>Photos</strong></Typography>} />
                                <CardContent>
                                    <ImageList cols={3} rowHeight={164}>
                                        {itemData.map((item) => (
                                        <ImageListItem key={item.img}>
                                        <img
                                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.title}
                                            loading="lazy"
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
                                <CardHeader title={<Typography variant="h4" sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}><strong>Friends</strong></Typography>} />
                                <CardContent>
                                    <ImageList cols={3} rowHeight={164}>
                                        {itemData.map((item) => (
                                        <ImageListItem key={item.img}>
                                        <img
                                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                        </ImageListItem>
                                    ))}
                                    </ImageList>
                                    <SeeAllFriends>
                                        <Button variant="outlined" color="warning">See All Friends</Button>
                                    </SeeAllFriends>
                                </CardContent>
                            </FriendListCard>
                        </Grid>
                        <Grid item md={8} sm={12} xs={12}>
                            <ProfilePostInputCard variant="outlined">
                                <CardContent>
                                    <ProfilePostInputGrid container spacing={2}>
                                        <ProfilePostInputGridItem item md={1} sm={1} xs={12}>
                                            <RoundedAvatar alt="Profile Photo" src="/images/saif.jpeg" />
                                        </ProfilePostInputGridItem>
                                        <ProfilePostInputGridItem item md={11} sm={11} xs={12}>
                                            <ProfilePostInputTextField id="standard-basic" label="Write Something" placeholder="What's on your mind?"variant="standard" />
                                        </ProfilePostInputGridItem>
                                    </ProfilePostInputGrid>
                                    <ProfilePostDivider />
                                    <Grid container spacing={2}>
                                        <ProfilePostIconGridItem item md={4} sm={6} xs={12}>
                                            <ProfilePostIconButton>
                                                <VideoCameraFrontIcon fontSize="large" />
                                                <Typography variant="h5">Videos</Typography>
                                            </ProfilePostIconButton>
                                        </ProfilePostIconGridItem>
                                        <ProfilePostIconGridItem item md={4} sm={6} xs={12}>
                                            <ProfilePostIconButton>
                                                <InsertPhotoIcon fontSize="large" />
                                                <Typography variant="h5">Photos</Typography>
                                            </ProfilePostIconButton>
                                        </ProfilePostIconGridItem>
                                        <ProfilePostIconGridItem item md={4} sm={6} xs={12}>
                                            <ProfilePostIconButton>
                                                <EmojiEmotionsIcon fontSize="large" />
                                                <Typography variant="h5">Reactions</Typography>
                                            </ProfilePostIconButton>
                                        </ProfilePostIconGridItem>
                                    </Grid>
                                </CardContent>
                            </ProfilePostInputCard>
                            <ProfilePost />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={2} sm={12} xs={12}></Grid>
            </Grid>
        </>
    )
}

export default RootComp