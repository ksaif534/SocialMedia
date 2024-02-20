'use client'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProfileLogo from "@/app/home/@profileLogo/page";
import { CommentGrid, CommentGridItem, ExpandMore, ProfilePostCard, RelevantCommentsCard, RelevantCommentsGrid, RelevantCommentsGridItem, TopCommentCard, TopCommentGrid, TopCommentGridItem } from './style';
import { Avatar, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export const ProfilePost = () => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <ProfilePostCard>
                <CardHeader avatar={<Avatar src="/images/saif.jpeg" />} title={<Typography variant="h6">Best Restaurants in Dhaka</Typography>} />
                <CardMedia component="img" height="194" image="/images/beautiful-bg-custom.jpg" alt="Best Restaurants" />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        What are the best chinese restaurants in Banani area in Dhaka?
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="Favorite Icon">
                        <FavoriteIcon fontSize="medium" />
                    </IconButton>
                    <IconButton aria-label="Share">
                        <ShareIcon fontSize="medium" />
                    </IconButton>
                    <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="Show More">
                        <ExpandMoreIcon fontSize="medium" />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant="h5"><strong>Top Comment:</strong></Typography>
                        <TopCommentGrid container spacing={2}>
                            <TopCommentGridItem item md={2} sm={2} xs={12}>
                                <ProfileLogo name="Safat Shahin" imageUrl="/images/safat-shahin.jpeg" />
                            </TopCommentGridItem>
                            <TopCommentGridItem item md={10} sm={10} xs={12}>
                                <TopCommentCard elevation={3}>
                                    <CardContent>
                                        <Typography variant="body2">
                                            To be honest, I didn't have a good experience trying out this chinese dish called ...
                                        </Typography>
                                    </CardContent>
                                </TopCommentCard>
                            </TopCommentGridItem>
                        </TopCommentGrid>
                        <Typography variant="h5"><strong>Relevant Comments:</strong></Typography>
                        <RelevantCommentsGrid container spacing={2}>
                            <RelevantCommentsGridItem item md={2} sm={2} xs={12}>
                                <ProfileLogo name="Nayeem Ahmad" imageUrl="/images/nayeem-ahmad.jpeg" />
                            </RelevantCommentsGridItem>
                            <RelevantCommentsGridItem item md={10} sm={10} xs={12}>
                                <RelevantCommentsCard elevation={3}>
                                    <CardContent>
                                        <Typography variant="body2">
                                            I'm gonna share my particular experience. Yesterday I went to a Chinese restaurant named ...
                                        </Typography>
                                    </CardContent>
                                </RelevantCommentsCard>
                            </RelevantCommentsGridItem>
                            <RelevantCommentsGridItem item md={2} sm={2} xs={12}>
                                <ProfileLogo name="Ivdad Ahmed" imageUrl="/images/ivdad-ahmed.jpeg" />
                            </RelevantCommentsGridItem>
                            <RelevantCommentsGridItem item md={10} sm={10} xs={12}>
                                <RelevantCommentsCard elevation={3}>
                                    <CardContent>
                                        <Typography variant="body2">
                                            There are many good chinese restaurants in banani. One of them that I highly recommed is ...
                                        </Typography>
                                    </CardContent>
                                </RelevantCommentsCard>
                            </RelevantCommentsGridItem>
                        </RelevantCommentsGrid>
                        <CommentGrid container spacing={2}>
                            <CommentGridItem item md={2} sm={2} xs={12}>
                                <ProfileLogo name="Saif Kamal" imageUrl="/images/saif.jpeg" />
                            </CommentGridItem>
                            <Grid item md={10} sm={10} xs={12}>
                                <TextField variant="standard" label="Write a Comment" fullWidth />
                            </Grid>
                        </CommentGrid>
                    </CardContent>
                </Collapse>
            </ProfilePostCard>
        </>
    )
}

export default ProfilePost