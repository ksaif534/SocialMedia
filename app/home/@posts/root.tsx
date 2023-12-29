'use client'
import React from "react"
import { useState, useEffect } from "react";
import { CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import fetchPosts from "./fetchPosts";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, Menu, MenuItem } from '@mui/material';
import ProfileLogo from '../@profileLogo/page';
import { ExpandMore, PostCard, CommentTextField, TopAnswerCard, TopAnswerGrid, TopAnswerGridItem, TopAnswerTG, RelevantAnswersCard, RelevantAnswersGrid, RelevantAnswersGridItem, RelevantAnswersTG, ProfileGrid } from './style'

const RootComp = () => {
    const [posts,setPosts] = useState([]);

    useEffect(() => {
        fetchPosts().then((posts: any) => setPosts(posts));
    },[])

    const [expanded, setExpanded] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const handleVertIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleVertClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            {
                posts.map((post: any,index) => (
                    <PostCard key={index}>
                        <CardHeader
                            avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                R
                            </Avatar>
                            }
                            action={
                            <div>
                                <IconButton aria-label="settings" onClick={handleVertIconClick}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu id="vertical-dropdown-menu" anchorEl={anchorEl} open={open} onClose={handleVertClose} MenuListProps={{ 'aria-labelledby': 'icon' }}>
                                    <MenuItem onClick={handleVertClose}>
                                        Edit Post
                                    </MenuItem>
                                    <MenuItem onClick={handleVertClose}>
                                        Delete Post
                                    </MenuItem>
                                </Menu>
                            </div>
                            }
                            title={<Typography variant="h6">{post.title}</Typography>}
                            subheader={post.sub_title}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={`/images/${post.figure}`}
                            alt=""
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                { post.description }
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography variant="h6">
                                    <strong>Top Comment:</strong>
                                </Typography>
                                <TopAnswerGrid container spacing={2}>
                                    <TopAnswerGridItem item md={2} sm={2} xs={12}>
                                        <ProfileLogo name="Ivdad Ahmed" imageUrl="/images/ivdad-ahmed.jpeg" />
                                    </TopAnswerGridItem>
                                    <TopAnswerGridItem item md={10} sm={10} xs={12}>
                                        <TopAnswerCard elevation={3}>
                                            <CardContent>
                                                <Typography>
                                                    <strong>Ivdad Ahmed</strong>
                                                </Typography>
                                                <TopAnswerTG paragraph>
                                                    There are many good chinese restaurants in banani. One of them that I highly recommed is ...
                                                </TopAnswerTG>
                                            </CardContent>
                                        </TopAnswerCard>
                                    </TopAnswerGridItem>
                                </TopAnswerGrid>
                                <Typography variant="h6">
                                    <strong>Relevant Comments:</strong>
                                </Typography>
                                <RelevantAnswersGrid container spacing={2}>
                                    <RelevantAnswersGridItem item md={2} sm={2} xs={12}>
                                        <ProfileLogo name="Nayeem Ahmad" imageUrl="/images/nayeem-ahmad.jpeg" />
                                    </RelevantAnswersGridItem>
                                    <RelevantAnswersGridItem item md={10} sm={10} xs={12}>
                                        <RelevantAnswersCard elevation={3}>
                                            <CardContent>
                                                <Typography>
                                                    <strong>Nayeem Ahmad</strong>
                                                </Typography>
                                                <RelevantAnswersTG paragraph>
                                                    I'm gonna share my particular experience. Yesterday I went to a Chinese restaurant named ...
                                                </RelevantAnswersTG>
                                            </CardContent>
                                        </RelevantAnswersCard>
                                    </RelevantAnswersGridItem>
                                    <RelevantAnswersGridItem item md={2} sm={2} xs={12}>
                                        <ProfileLogo name="Safat Shahin" imageUrl="/images/safat-shahin.jpeg" />
                                    </RelevantAnswersGridItem>
                                    <RelevantAnswersGridItem item md={10} sm={10} xs={12}>
                                        <RelevantAnswersCard elevation={3}>
                                            <CardContent>
                                                <Typography>
                                                    <strong>Safat Shahin</strong>
                                                </Typography>
                                                <RelevantAnswersTG paragraph>
                                                    To be honest, I didn't have a good experience trying out this chinese dish called ...
                                                </RelevantAnswersTG>
                                            </CardContent>
                                        </RelevantAnswersCard>
                                    </RelevantAnswersGridItem>
                                </RelevantAnswersGrid>
                                <Grid container spacing={2}>
                                    <ProfileGrid item md={1}>
                                        <ProfileLogo name="Saif Kamal" imageUrl="/images/beautiful-bg-custom.jpg" />
                                    </ProfileGrid>
                                    <Grid item md={11}>
                                        <CommentTextField id="standard-basic" label="Comment" variant="standard" placeholder="Enter your Comment"></CommentTextField>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Collapse>
                    </PostCard>
                ))
            }
        </>
    )
}

export default RootComp