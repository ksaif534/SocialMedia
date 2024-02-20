'use client'
import React from "react"
import { useState, useEffect } from "react";
import { CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import fetchPosts from "./fetchPosts";
import fetchComments from "../@posts/@commentInput/fetchComments";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, Menu, MenuItem } from '@mui/material';
import ProfileLogo from '../@profileLogo/page';
import { ExpandMore, PostCard, TopAnswerCard, TopAnswerGrid, TopAnswerGridItem, TopAnswerTG, RelevantAnswersCard, RelevantAnswersGrid, RelevantAnswersGridItem, RelevantAnswersTG, ProfileGrid } from './style'
import CommentInputModalForm from './@commentInput/modal';
import fetchUsers from "@/app/auth/login/fetchUsers";
import PostEditModalForm from "./editModal";
import deletePost from "./deletePost";
import Swal from "sweetalert2";
import DeleteIcon from '@mui/icons-material/Delete';
import CommentEditModalForm from "./@commentInput/editModal";
import deleteComment from "./@commentInput/deleteComment";

const RootComp = () => {
    const [users,setUsers] = useState([]);
    const [authUser,setAuthUser] = useState({ id: 0 ,name: '', email: '', image: null });
    const [posts,setPosts] = useState([]);
    const [comments,setComments] = useState([]);

    useEffect(() => {
        fetchPosts().then((posts: any) => setPosts(posts));
        fetchComments().then((comments: any) => setComments(comments));
        fetchUsers().then((users: any) => setUsers(users));
        const user = users.find((user: any) => user.email == sessionStorage.getItem("authUser"));
    },[])

    const [expanded, setExpanded] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleExpandClick = () => {
        users.map((user: any) => {
            if(user.email == sessionStorage.getItem("authUser")){
                setAuthUser((prevAuthUser) => ({
                    ...prevAuthUser,
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                }))
            }
        })
        setExpanded(!expanded);
    }

    const handleVertIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleVertClose = () => {
        setAnchorEl(null);
    }

    const handleDeletion = async (post: any) => {
        const deletePostBool = await deletePost(post);
        if(Boolean(deletePostBool)) {
            Swal.fire(`Post Deleted Successfully`);
        }else{
            Swal.fire(`Post haven't been Deleted`);
        }
    }

    const handleCommentDelete = async (comment: any) => {
        const deleteCommentBool = await deleteComment(comment);
        if (Boolean(deleteCommentBool)) {
            Swal.fire(`Comment Deleted Successfully`);
        }else{
            Swal.fire(`Comment Not Deleted`);
        }
    }

    return (
        <>
            {
                posts.map((post: any,index) => (
                    <PostCard key={`${post.user_id}-${index}`}>
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
                                    <MenuItem>
                                        <PostEditModalForm post={post} />
                                    </MenuItem>
                                    <MenuItem onClick={() => handleDeletion(post)}>
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
                                {
                                    comments.map((comment: any,index) => 
                                    {
                                        if(comment.is_allow == 1){
                                            return (
                                                <RelevantAnswersGrid container spacing={2} key={`${comment.user_id}-${index}`}>
                                                    <RelevantAnswersGridItem item md={2} sm={2} xs={12}>
                                                        <ProfileLogo name="Nayeem Ahmad" imageUrl={`/images/` + comment.user.image} />
                                                    </RelevantAnswersGridItem>
                                                    <RelevantAnswersGridItem item md={10} sm={10} xs={12}>
                                                        <RelevantAnswersCard elevation={3}>
                                                            <CardContent>
                                                                <Typography>
                                                                    <strong>{ comment.user.name }</strong>
                                                                </Typography>
                                                                <Grid container spacing={2}>
                                                                    <Grid item md={9} sm={9} xs={12}>
                                                                        <RelevantAnswersTG paragraph>
                                                                            { comment.description }
                                                                        </RelevantAnswersTG>
                                                                    </Grid>
                                                                    <Grid item md={3} sm={3} xs={12}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item md={6} sm={6} xs={12}>
                                                                                {
                                                                                    (authUser.id == comment.user_id) && (
                                                                                        <>
                                                                                            <CommentEditModalForm comment={comment} />
                                                                                        </>
                                                                                    )
                                                                                }
                                                                            </Grid>
                                                                            <Grid item md={6} sm={6} xs={12}>
                                                                                {
                                                                                    (authUser.id == comment.user_id) && (
                                                                                        <>
                                                                                            <IconButton title="Delete Comment" onClick={() => handleCommentDelete(comment)}>
                                                                                                <DeleteIcon />
                                                                                            </IconButton>
                                                                                        </>
                                                                                    )
                                                                                }
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </CardContent>
                                                        </RelevantAnswersCard>
                                                    </RelevantAnswersGridItem>
                                                </RelevantAnswersGrid>
                                            )
                                        }
                                    })
                                }
                                <Grid container spacing={2}>
                                    <ProfileGrid item md={1}>
                                        <ProfileLogo name={authUser.name} imageUrl={`/images/` + authUser.image} />
                                    </ProfileGrid>
                                    <Grid item md={11}>
                                        <CommentInputModalForm post={post} authUser={authUser} />
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