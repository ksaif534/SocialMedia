'use client'
import React, { useContext } from "react"
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
import addLikes from "./addLikes";
import fetchLikesByPost from "./fetchLikesByPost";
import fetchLikes from "./fetchLikes";
import fetchShares from "./fetchShares";
import addShares from "./addShares";
import fetchSharesByPost from "./fetchSharesByPost";
import { SearchContext } from "../@navsidebar/root";
import { ProfileSearchContext } from "@/app/profile/@navbar/root";

const RootComp = (props: any) => {
    const router = useRouter();
    const { profilePosts, videoPosts } = props;
    const { srchPosts, srchKey } = useContext(SearchContext);
    const { srchProfilePosts, srchProfileKey } = useContext(ProfileSearchContext);
    const [users,setUsers] = useState([]);
    const [authUser,setAuthUser] = useState({ id: 0 ,name: '', email: '', image: null });
    const [posts,setPosts] = useState([]);
    const [comments,setComments] = useState([]);
    const [likes,setLikes] = useState([]);
    const [likesByPost,setLikesByPost] = useState([]);
    const [shares,setShares] = useState([]);
    const [sharesByPost,setSharesByPost] = useState([]);
    let newArr: any = [];

    useEffect(() => {
        fetchPosts().then((posts: any) => setPosts(posts));
        fetchComments().then((comments: any) => setComments(comments));
        fetchUsers().then((users: any) => setUsers(users));
        fetchLikes().then((likes: any) => setLikes(likes));
        fetchShares().then((shares: any) => setShares(shares));
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

    const addLike = async (post: any) => {
        const addData = {
            userId: sessionStorage.getItem("authUserId"),
            postId: post?.id,
            isCount: 1
        }
        const newLike = await addLikes(addData);
        if (Boolean(newLike)) {
            Swal.fire({
                title: `Success`,
                text: `New Like Added`,
                icon: `success`
            });
            fetchLikesByPost(post.id).then((likes: any) => setLikesByPost(likes));
        }else{
            Swal.fire({
                title: `Failure`,
                text: `Sorry, couldn't like the post`,
                icon: `error`
            });
        }
    }

    const addShare = async (post: any) => {
        const shareData = {
            user_id: sessionStorage.getItem("authUserId"),
            post_id: post.id,
            is_count: 1,
            shared: 1
        };
        const addSh = await addShares(shareData);
        if (Boolean(addSh)) {
            Swal.fire({
                title: `Success`,
                text: `Post Shared Successfully`,
                icon: `success`
            });
            fetchSharesByPost(post.id).then((sharesByPost: any) => setSharesByPost(sharesByPost));
        }else{
            Swal.fire({
                title: `Failure`,
                text: `Sorry, couldn't share post`,
                icon: `error`
            });
        }
    }

    return (
        <>
            {
                (srchKey !== '') ? (
                    <>
                        {
                            (srchPosts.length > 0) ? (
                                <>
                                    {
                                        srchPosts.map((srchPost: any,index: number) => {
                                            return (
                                                <PostCard key={`${srchPost.user_id}-${index}`}>
                                                    <CardHeader
                                                        avatar={
                                                        <Avatar src={`images/${srchPost?.user?.image}`} aria-label="recipe" />
                                                        }
                                                        action={
                                                        <div>
                                                            {
                                                                (srchPost.user_id == sessionStorage.getItem("authUserId")) && (
                                                                    <>
                                                                        <IconButton aria-label="settings" onClick={handleVertIconClick}>
                                                                            <MoreVertIcon />
                                                                        </IconButton>
                                                                        <Menu id="vertical-dropdown-menu" anchorEl={anchorEl} open={open} onClose={handleVertClose} MenuListProps={{ 'aria-labelledby': 'icon' }}>
                                                                            <MenuItem>
                                                                                <PostEditModalForm post={srchPost} />
                                                                            </MenuItem>
                                                                            <MenuItem onClick={() => handleDeletion(srchPost)}>
                                                                                Delete Post
                                                                            </MenuItem>
                                                                        </Menu>       
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                        }
                                                        title={<Typography variant="h6">{srchPost.title}</Typography>}
                                                        subheader={srchPost.sub_title}
                                                    />
                                                    {
                                                        (srchPost.type == 2) ? (
                                                            <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
                                                                <video 
                                                                src={`/videos/${srchPost.figure}`} 
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
                                                                image={`/images/${srchPost.figure}`}
                                                                alt=""
                                                            />
                                                        )
                                                    }
                                                    <CardContent>
                                                        <Typography variant="body2" color="text.secondary">
                                                            { srchPost.description }
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions disableSpacing>
                                                        <IconButton aria-label="add to favorites" onClick={() => addLike(srchPost)}>
                                                            <FavoriteIcon />
                                                            {
                                                                (likesByPost.length == 0) ? (
                                                                    <Typography variant="body2">{ likes.filter((like: any) => like.post_id == srchPost.id).length }</Typography>
                                                                ) : (
                                                                    <Typography variant="body2">{ likesByPost.length }</Typography>
                                                                )
                                                            }
                                                        </IconButton>
                                                        <IconButton aria-label="share" onClick={() => addShare(srchPost)}>
                                                            <ShareIcon />
                                                            {
                                                                (sharesByPost.length == 0) ? (
                                                                    <Typography variant="body2">{ shares.filter((share: any) => share.post_id == srchPost.id).length }</Typography>
                                                                ) : (
                                                                    <Typography variant="body2">{ sharesByPost.length }</Typography>
                                                                )
                                                            }
                                                        </IconButton>
                                                        <ExpandMore
                                                        expand={expandedPosts[index]}
                                                        onClick={() => handleExpandClick(srchPost.id)}
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
                                                                srchPost?.comments?.map((comment: any,index: number) => 
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
                                                                    <CommentInputModalForm post={srchPost} authUser={authUser} />
                                                                </Grid>
                                                            </Grid>
                                                        </CardContent>
                                                    </Collapse>
                                                </PostCard>
                                            )
                                        })
                                    }   
                                </>
                            ) : (
                                <>
                                    <PostCard>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image="images/404-not-found.avif"
                                            alt=""
                                        />
                                        <CardContent sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                            <Typography variant="h6"><strong>Sorry, no posts match your search criteria</strong></Typography>
                                        </CardContent>
                                    </PostCard>
                                </>
                            )
                        }
                    </>
                ) : (
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
                                                    <IconButton aria-label="add to favorites" onClick={() => addLike(post)}>
                                                        <FavoriteIcon />
                                                        {
                                                            (likesByPost.length == 0) ? (
                                                                <Typography variant="body2">{ likes.filter((like: any) => like.post_id == post.id).length }</Typography>
                                                            ) : (
                                                                <Typography variant="body2">{ likesByPost.length }</Typography>
                                                            )
                                                        }
                                                    </IconButton>
                                                    <IconButton aria-label="share" onClick={() => addShare(post)}>
                                                        <ShareIcon />
                                                        {
                                                            (sharesByPost.length == 0) ? (
                                                                <Typography variant="body2">{ shares.filter((share: any) => share.post_id == post.id).length }</Typography>
                                                            ) : (
                                                                <Typography variant="body2">{ sharesByPost.length }</Typography>
                                                            )
                                                        }
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
                                        (srchProfileKey !== '') ? (
                                            <>
                                                {
                                                    (srchProfilePosts.length > 0) ? (
                                                        <>
                                                            {
                                                                srchProfilePosts.map((srchProfilePost: any,index) => (
                                                                    <PostCard key={`${srchProfilePost.user_id}-${index}`}>
                                                                        <CardHeader
                                                                            avatar={
                                                                            <Avatar src={`images/${srchProfilePost?.user?.image}`} aria-label="recipe" />
                                                                            }
                                                                            action={
                                                                            <div>
                                                                                {
                                                                                    (srchProfilePost.user_id == sessionStorage.getItem("authUserId")) && (
                                                                                        <>
                                                                                            <IconButton aria-label="settings" onClick={handleVertIconClick}>
                                                                                                <MoreVertIcon />
                                                                                            </IconButton>
                                                                                            <Menu id="vertical-dropdown-menu" anchorEl={anchorEl} open={open} onClose={handleVertClose} MenuListProps={{ 'aria-labelledby': 'icon' }}>
                                                                                                <MenuItem>
                                                                                                    <PostEditModalForm post={srchProfilePost} />
                                                                                                </MenuItem>
                                                                                                <MenuItem onClick={() => handleDeletion(srchProfilePost)}>
                                                                                                    Delete Post
                                                                                                </MenuItem>
                                                                                            </Menu>       
                                                                                        </>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                            }
                                                                            title={<Typography variant="h6">{srchProfilePost.title}</Typography>}
                                                                            subheader={srchProfilePost.sub_title}
                                                                        />
                                                                        {
                                                                            (srchProfilePost.type == 2) ? (
                                                                                <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
                                                                                    <video 
                                                                                    src={`/videos/${srchProfilePost.figure}`} 
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
                                                                                    image={`/images/${srchProfilePost.figure}`}
                                                                                    alt=""
                                                                                />
                                                                            )
                                                                        }
                                                                        <CardContent>
                                                                            <Typography variant="body2" color="text.secondary">
                                                                                { srchProfilePost.description }
                                                                            </Typography>
                                                                        </CardContent>
                                                                        <CardActions disableSpacing>
                                                                            <IconButton aria-label="add to favorites" onClick={() => addLike(srchProfilePost)}>
                                                                                <FavoriteIcon />
                                                                                {
                                                                                    (likesByPost.length == 0) ? (
                                                                                        <Typography variant="body2">{ likes.filter((like: any) => like.post_id == srchProfilePost.id).length }</Typography>
                                                                                    ) : (
                                                                                        <Typography variant="body2">{ likesByPost.length }</Typography>
                                                                                    )
                                                                                }
                                                                            </IconButton>
                                                                            <IconButton aria-label="share" onClick={() => addShare(srchProfilePost)}>
                                                                                <ShareIcon />
                                                                                {
                                                                                    (sharesByPost.length == 0) ? (
                                                                                        <Typography variant="body2">{ shares.filter((share: any) => share.post_id == srchProfilePost.id).length }</Typography>
                                                                                    ) : (
                                                                                        <Typography variant="body2">{ sharesByPost.length }</Typography>
                                                                                    )
                                                                                }
                                                                            </IconButton>
                                                                            <ExpandMore
                                                                            expand={expandedPosts[index]}
                                                                            onClick={() => handleExpandClick(srchProfilePost.id)}
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
                                                                                    srchProfilePost?.comments?.map((comment: any,index: number) => 
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
                                                                                        <CommentInputModalForm post={srchProfilePost} authUser={authUser} />
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
                                                            <PostCard>
                                                                <CardMedia
                                                                    component="img"
                                                                    height="300"
                                                                    image="images/404-not-found.avif"
                                                                    alt=""
                                                                />
                                                                <CardContent sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                                                    <Typography variant="h6"><strong>Sorry, no profile post match your search criteria</strong></Typography>
                                                                </CardContent>
                                                            </PostCard>
                                                        </>
                                                    )
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
                                                                                {
                                                                                    (likesByPost.length == 0) ? (
                                                                                        <Typography variant="body2">{ likes.filter((like: any) => like.post_id == videoPost.id).length }</Typography>
                                                                                    ) : (
                                                                                        <Typography variant="body2">{ likesByPost.length }</Typography>
                                                                                    )
                                                                                }
                                                                            </IconButton>
                                                                            <IconButton aria-label="share">
                                                                                <ShareIcon />
                                                                                {
                                                                                    (sharesByPost.length == 0) ? (
                                                                                        <Typography variant="body2">{ shares.filter((share: any) => share.post_id == videoPost.id).length }</Typography>
                                                                                    ) : (
                                                                                        <Typography variant="body2">{ sharesByPost.length }</Typography>
                                                                                    )
                                                                                }
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
                                                                                {
                                                                                    (likesByPost.length == 0) ? (
                                                                                        <Typography variant="body2">{ likes.filter((like: any) => like.post_id == profilePost.id).length }</Typography>
                                                                                    ) : (
                                                                                        <Typography variant="body2">{ likesByPost.length }</Typography>
                                                                                    )
                                                                                }
                                                                            </IconButton>
                                                                            <IconButton aria-label="share">
                                                                                <ShareIcon />
                                                                                {
                                                                                    (sharesByPost.length == 0) ? (
                                                                                        <Typography variant="body2">{ shares.filter((share: any) => share.post_id == profilePost.id).length }</Typography>
                                                                                    ) : (
                                                                                        <Typography variant="body2">{ sharesByPost.length }</Typography>
                                                                                    )
                                                                                }
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
                    </>
                )
            }
        </>
    )
}

export default RootComp