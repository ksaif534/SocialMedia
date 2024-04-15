'use client'
import React from "react"
import { useState, useEffect } from "react";
import { CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@mui/material';
import fetchPosts from "./fetchPosts";
import fetchComments from "../@posts/@commentInput/fetchComments";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, Menu, MenuItem } from '@mui/material';
import ProfileLogo from '../@profileLogo/page';
import { ExpandMore, PostCard, RelevantAnswersCard, RelevantAnswersGrid, RelevantAnswersGridItem, RelevantAnswersTG, ProfileGrid } from './style'
import CommentInputModalForm from './@commentInput/modal';
import fetchUsers from "@/app/auth/login/fetchUsers";
import PostEditModalForm from "./editModal";
import deletePost from "./deletePost";
import Swal from "sweetalert2";
import DeleteIcon from '@mui/icons-material/Delete';
import CommentEditModalForm from "./@commentInput/editModal";
import deleteComment from "./@commentInput/deleteComment";
import { useRouter } from "next/navigation";

const RootComp = (props: any) => {
    const router = useRouter();
    const { profilePosts, videoPosts } = props;
    const [users,setUsers] = useState([]);
    const [authUser,setAuthUser] = useState({ id: 0 ,name: '', email: '', image: null });
    const [posts,setPosts] = useState([]);
    const [comments,setComments] = useState([]);
    let newArr: any = [];

    useEffect(() => {
        fetchPosts().then((posts: any) => setPosts(posts));
        fetchComments().then((comments: any) => setComments(comments));
        fetchUsers().then((users: any) => setUsers(users));
        const user = users.find((user: any) => user.email == sessionStorage.getItem("authUser"));
    },[])

    const [expandedPosts, setExpandedPosts] = useState([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleExpandClick = (postId: any) => {
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
        newArr = [...expandedPosts];
        if (newArr.length == 0) {
            posts.map((post: any) => {
                newArr.push(false);
            })
        }
        if (profilePosts === undefined && videoPosts === undefined) {
            posts.map((post: any,index: number) => {
                if (Number(post.id) == Number(postId)) {
                    newArr[index] = !newArr[index];
                }else{
                    newArr[index] = false;
                }
            })    
        }else{
            if (videoPosts !== undefined) {
                videoPosts.map((videoPost: any,index: number) => {
                    if (Number(videoPost.id) == Number(postId)) {
                        newArr[index] = !newArr[index];
                    }else{
                        newArr[index] = false;
                    }
                })
            }else{
                profilePosts.map((profilePost: any,index: number) => {
                    if (Number(profilePost.id) == Number(postId)) {
                        newArr[index] = !newArr[index];
                    }else{
                        newArr[index] = false;
                    }
                })
            }
        }
        setExpandedPosts(newArr);
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
            Swal.fire({
                title: `Success`,
                text: `Comment Deleted Successfully`,
                icon: `success`
            });
        }else{
            Swal.fire({
                title: `Failure`,
                text: `Comment Not Deleted`,
                icon: `error`
            });
        }
    }

    return (
        <>
            {
                (profilePosts === undefined && videoPosts === undefined) ? (
                    <>
                        {
                            posts.map((post: any,index) => (
                                <PostCard key={`${post.user_id}-${index}`}>
                                    <CardHeader
                                        avatar={
                                        <Avatar src={`images/${post?.user?.image}`} aria-label="recipe" />
                                        }
                                        action={
                                        <div>
                                            {
                                                (post.user_id == sessionStorage.getItem("authUserId")) && (
                                                    <>
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
                                                    </>
                                                )
                                            }
                                        </div>
                                        }
                                        title={<Typography variant="h6">{post.title}</Typography>}
                                        subheader={post.sub_title}
                                    />
                                    {
                                        (post.type == 2) ? (
                                            <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
                                                <video 
                                                src={`/videos/${post.figure}`} 
                                                controls 
                                                height="200"
                                                style={{
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    top: 0,
                                                    left: 0,
                                                }}
                                                >

                                                </video>
                                            </div>
                                        ) : (
                                            <CardMedia
                                                component="img"
                                                height="194"
                                                image={`/images/${post.figure}`}
                                                alt=""
                                            />
                                        )
                                    }
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
                                        expand={expandedPosts[index]}
                                        onClick={() => handleExpandClick(post.id)}
                                        aria-expanded={expandedPosts[index]}
                                        aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </ExpandMore>
                                    </CardActions>
                                    <Collapse in={expandedPosts[index]} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography variant="h6">
                                                <strong>Relevant Comments:</strong>
                                            </Typography>
                                            {
                                                post?.comments?.map((comment: any,index: number) => 
                                                {
                                                    if(comment.is_allow == 1){
                                                        return (
                                                            <RelevantAnswersGrid container spacing={2} key={`${comment.user_id}-${index}`}>
                                                                <RelevantAnswersGridItem item md={2} sm={2} xs={12}>
                                                                    {
                                                                        comments.map((commnt: any) => {
                                                                            if (commnt.id == comment.id) {
                                                                                return (
                                                                                    <ProfileLogo name={commnt?.user?.name} imageUrl={`/images/` + commnt?.user?.image} key={commnt.id} />
                                                                                )           
                                                                            }
                                                                        })
                                                                    }
                                                                </RelevantAnswersGridItem>
                                                                <RelevantAnswersGridItem item md={10} sm={10} xs={12}>
                                                                    <RelevantAnswersCard elevation={3}>
                                                                        <CardContent>
                                                                            {
                                                                                comments.map((commnt: any) => {
                                                                                    if (commnt.id == comment.id) {
                                                                                        return (
                                                                                            <Typography key={commnt.id}>
                                                                                                <strong>{ commnt?.user?.name }</strong>
                                                                                            </Typography>
                                                                                        )
                                                                                    }
                                                                                })
                                                                            }
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
                ) : (
                    <>
                        {
                            (videoPosts !== undefined) ? (
                                <>
                                    {
                                        videoPosts.map((videoPost: any, index: number) => (
                                            <PostCard key={`${videoPost.user_id}-${index}`}>
                                                <CardHeader
                                                    avatar={
                                                    <Avatar src={`images/${videoPost?.user?.image}`} aria-label="recipe" />
                                                    }
                                                    action={
                                                    <div>
                                                        <IconButton aria-label="settings" onClick={handleVertIconClick}>
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                        <Menu id="vertical-dropdown-menu" anchorEl={anchorEl} open={open} onClose={handleVertClose} MenuListProps={{ 'aria-labelledby': 'icon' }}>
                                                            <MenuItem>
                                                                <PostEditModalForm post={videoPost} />
                                                            </MenuItem>
                                                            <MenuItem onClick={() => handleDeletion(videoPost)}>
                                                                Delete Post
                                                            </MenuItem>
                                                        </Menu>
                                                    </div>
                                                    }
                                                    title={<Typography variant="h6">{videoPost.title}</Typography>}
                                                    subheader={videoPost.sub_title}
                                                />
                                                <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
                                                    <video 
                                                    src={`/videos/${videoPost.figure}`} 
                                                    controls 
                                                    height="200"
                                                    style={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        top: 0,
                                                        left: 0,
                                                    }}
                                                    >

                                                    </video>
                                                </div>
                                                <CardContent>
                                                    <Typography variant="body2" color="text.secondary">
                                                        { videoPost.description }
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
                                                    expand={expandedPosts[index]}
                                                    onClick={() => handleExpandClick(videoPost.id)}
                                                    aria-expanded={expandedPosts[index]}
                                                    aria-label="show more"
                                                    >
                                                        <ExpandMoreIcon />
                                                    </ExpandMore>
                                                </CardActions>
                                                <Collapse in={expandedPosts[index]} timeout="auto" unmountOnExit>
                                                    <CardContent>
                                                        <Typography variant="h6">
                                                            <strong>Relevant Comments:</strong>
                                                        </Typography>
                                                        {
                                                            videoPosts?.comments?.map((comment: any,index: number) => 
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
                                                                <CommentInputModalForm post={videoPost} authUser={authUser} />
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Collapse>
                                            </PostCard>
                                        )) 
                                    }
                                </>
                            ) : (
                                <>
                                    {
                                        profilePosts.map((profilePost: any, index: number) => (
                                            <PostCard key={`${profilePost.user_id}-${index}`}>
                                                <CardHeader
                                                    avatar={
                                                    <Avatar src={`images/${profilePost?.user?.image}`} aria-label="recipe" />
                                                    }
                                                    action={
                                                    <div>
                                                        <IconButton aria-label="settings" onClick={handleVertIconClick}>
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                        <Menu id="vertical-dropdown-menu" anchorEl={anchorEl} open={open} onClose={handleVertClose} MenuListProps={{ 'aria-labelledby': 'icon' }}>
                                                            <MenuItem>
                                                                <PostEditModalForm post={profilePost} />
                                                            </MenuItem>
                                                            <MenuItem onClick={() => handleDeletion(profilePost)}>
                                                                Delete Post
                                                            </MenuItem>
                                                        </Menu>
                                                    </div>
                                                    }
                                                    title={<Typography variant="h6">{profilePost.title}</Typography>}
                                                    subheader={profilePost.sub_title}
                                                />
                                                {
                                                    (profilePost.type == 2) ? (
                                                        <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
                                                            <video 
                                                            src={`/videos/${profilePost.figure}`} 
                                                            controls 
                                                            height="200"
                                                            style={{
                                                                position: 'absolute',
                                                                width: '100%',
                                                                height: '100%',
                                                                top: 0,
                                                                left: 0,
                                                            }}
                                                            >

                                                            </video>
                                                        </div>
                                                    ) : (
                                                        <CardMedia
                                                            component="img"
                                                            height="194"
                                                            image={`/images/${profilePost.figure}`}
                                                            alt=""
                                                        />
                                                    )
                                                }
                                                <CardContent>
                                                    <Typography variant="body2" color="text.secondary">
                                                        { profilePost.description }
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
                                                    expand={expandedPosts[index]}
                                                    onClick={() => handleExpandClick(profilePost.id)}
                                                    aria-expanded={expandedPosts[index]}
                                                    aria-label="show more"
                                                    >
                                                        <ExpandMoreIcon />
                                                    </ExpandMore>
                                                </CardActions>
                                                <Collapse in={expandedPosts[index]} timeout="auto" unmountOnExit>
                                                    <CardContent>
                                                        <Typography variant="h6">
                                                            <strong>Relevant Comments:</strong>
                                                        </Typography>
                                                        {
                                                            profilePost?.comments?.map((comment: any,index: number) => 
                                                            {
                                                                if(comment.is_allow == 1){
                                                                    return (
                                                                        <RelevantAnswersGrid container spacing={2} key={`${comment.user_id}-${index}`}>
                                                                            <RelevantAnswersGridItem item md={2} sm={2} xs={12}>
                                                                                {
                                                                                    comments?.map((commnt: any) => {
                                                                                        if (commnt.id == comment.id) {
                                                                                            return (
                                                                                                <ProfileLogo name={commnt.user?.name} imageUrl={`/images/` + commnt.user?.image} key={commnt.id} />
                                                                                            )
                                                                                        }
                                                                                    })
                                                                                }
                                                                            </RelevantAnswersGridItem>
                                                                            <RelevantAnswersGridItem item md={10} sm={10} xs={12}>
                                                                                <RelevantAnswersCard elevation={3}>
                                                                                    <CardContent>
                                                                                        {
                                                                                            comments.map((commnt: any) => {
                                                                                                if (commnt.id == comment.id) {
                                                                                                    return (
                                                                                                        <Typography key={commnt.id}>
                                                                                                            <strong>{ commnt.user?.name }</strong>
                                                                                                        </Typography>
                                                                                                    )
                                                                                                }
                                                                                            })
                                                                                        }
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
                                                                <CommentInputModalForm post={profilePost} authUser={authUser} />
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
                    </>
                )
            }
        </>
    )
}

export default RootComp