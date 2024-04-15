'use client'
import { Avatar, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, Grid, IconButton, InputAdornment, Menu, MenuItem, Typography } from "@mui/material"
import { ChipStack, CommentInputGrid, CommentTextField, CommentsCard, CommentsGrid, CommentsGridFirstItem, CommentsGridItem, ExpandMore, GPCGridRightItem, GroupPostCard, MediaButtonBase, TopCommentTG } from "./style"
import { useState, useEffect } from "react";
import ProfileLogo from "@/app/home/@profileLogo/page";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import PostInput from "@/app/home/@postInput/page";
import CommentInputModalForm from "@/app/home/@posts/@commentInput/modal";
import CommentEditModalForm from "@/app/home/@posts/@commentInput/editModal";
import deleteComment from "@/app/home/@posts/@commentInput/deleteComment";
import Swal from "sweetalert2";
import PostEditModalForm from "@/app/home/@posts/editModal";
import fetchGroupPosts from "./fetchGroupPosts";
import fetchUser from "@/app/profile/@profileCoverHeading/fetchUser";
import fetchComments from "@/app/home/@posts/@commentInput/fetchComments";


const RootComp = (props: any) => {
    const { group } = props;
    const [anchorGPCIconElement,setAnchorGPCIconElement] = useState<null | HTMLElement>(null);
    const [expanded,setExpanded] = useState(false);
    const GPCIconOpen = Boolean(anchorGPCIconElement);

    const [groupPosts,setGroupPosts] = useState([]);
    const [groupComments,setGroupComments] = useState([]);
    const [authUser,setAuthUser] = useState({ id: 0 ,name: '', email: '', image: null });

    useEffect(() => {
        fetchGroupPosts().then((groupPosts: any) => setGroupPosts(groupPosts));
        fetchUser(sessionStorage.getItem("authUserId")).then((user: any) => setAuthUser(user));
        fetchComments().then((comments: any) => setGroupComments(comments));
    },[])

    const handleGPCIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorGPCIconElement(event.currentTarget);
    }

    const handleGPCIconClose = () => {
        setAnchorGPCIconElement(null);
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const handleCommentDelete = async (groupComment: any) => {
        const deleteCommentBool = await deleteComment(groupComment);
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
            {/* <GroupPostInputCard variant="outlined">
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item md={1} sm={1} xs={12}>
                            <ProfileLogo name="Saif Kamal" imageUrl="/images/saif.jpeg" />
                        </Grid>
                        <Grid item md={11} sm={11} xs={12}>
                            <GPICTextField placeholder="What's on your mind?" label="Write Something" variant="standard" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <GPICIconGridItem item md={4} sm={12} xs={12}>
                            <GPICIconButton title="Add Photos/Images">
                                <InsertPhotoIcon fontSize="large" />
                                <Typography variant="body2"><strong>Photos/Images</strong></Typography>
                            </GPICIconButton>
                        </GPICIconGridItem>
                        <GPICIconGridItem item md={4} sm={12} xs={12}>
                            <GPICIconButton title="Anonymous Post">
                                <VerifiedUserIcon fontSize="large" />
                                <Typography variant="body2"><strong>Anonymous Post</strong></Typography>
                            </GPICIconButton>
                        </GPICIconGridItem>
                        <GPICIconGridItem item md={4} sm={12} xs={12}>
                            <GPICIconButton>
                                <EmojiEmotionsIcon fontSize="large" />
                                <Typography variant="body2"><strong>Reactions</strong></Typography>
                            </GPICIconButton>
                        </GPICIconGridItem>
                    </Grid>
                </CardContent>
            </GroupPostInputCard> */}
            <PostInput group={group} />
            {
                groupPosts.map((groupPost: any) => {
                    if (groupPost.group_id == group.id) {
                        return (
                            <GroupPostCard key={groupPost.id}>
                                <CardHeader 
                                    avatar={<Avatar src={`images/${groupPost.thumbnail}`} />} 
                                    title={
                                    <>
                                        <Grid container spacing={2}>
                                            <Grid item md={9} sm={9} xs={12}>
                                                <Grid container>
                                                    <Grid item md={12} sm={12} xs={12}>
                                                        <Typography variant="h6"><strong>{ groupPost.title }</strong></Typography>
                                                    </Grid>
                                                    <Grid item md={12} sm={12} xs={12}>
                                                        <ChipStack direction={{ md: 'row', sm: 'column', xs: 'column' }} spacing={1}>
                                                            <Chip label="Admin" />
                                                            <Chip label="Top Contributor" />
                                                        </ChipStack>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            {
                                                (groupPost.user_id == authUser.id) && (
                                                    <GPCGridRightItem item md={3} sm={3} xs={12}>
                                                        <IconButton onClick={handleGPCIconClick}>
                                                            <MoreHorizIcon fontSize="large" />
                                                        </IconButton>
                                                        <Menu id="gpc-icon-click-menu-discussed" anchorEl={anchorGPCIconElement} open={GPCIconOpen} onClose={handleGPCIconClose} MenuListProps={{ 'aria-labelledby': 'icon' }}>
                                                            <MenuItem>
                                                                <PostEditModalForm post={groupPost} />
                                                            </MenuItem>
                                                            <MenuItem onClick={handleCommentDelete}>
                                                                Delete Post
                                                            </MenuItem>
                                                        </Menu>
                                                    </GPCGridRightItem>
                                                )
                                            }
                                        </Grid>
                                    </>
                                } 
                                />
                                <MediaButtonBase>
                                    <CardMedia component="img" height="300" image={`images/${groupPost.figure}`} alt="" />
                                </MediaButtonBase>
                                <CardContent>
                                    <Typography variant="h6" color="text.secondary">
                                        { groupPost.description }
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton title="Like">
                                        <ThumbUpIcon fontSize="large" />
                                    </IconButton>
                                    <IconButton title="Comment">
                                        <CommentIcon fontSize="large" />
                                    </IconButton>
                                    <IconButton title="Share">
                                        <ShareIcon fontSize="large" />
                                    </IconButton>
                                    <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="Show More">
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography variant="h6">
                                            <strong>Comments:</strong>
                                        </Typography>
                                    </CardContent>
                                    {
                                        groupPost.comments?.map((groupComment: any) => {
                                            if (groupComment.is_allow == 1) {
                                                return (
                                                    <CommentsGrid container spacing={2} key={groupComment.id}>
                                                        <CommentsGridFirstItem item md={1} sm={1} xs={12}>
                                                            {
                                                                groupComments.map((comment: any) => {
                                                                    if (comment.id == groupComment.id) {
                                                                        return (
                                                                            <ProfileLogo name={comment.name} imageUrl={`images/${comment.user?.image}`} key={comment.id} />
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </CommentsGridFirstItem>
                                                        <CommentsGridItem item md={11} sm={11} xs={12}>
                                                            <CommentsCard elevation={3}>
                                                                <CardContent>
                                                                    {
                                                                        groupComments.map((comment: any) => {
                                                                            if (comment.id == groupComment.id) {
                                                                                return (
                                                                                    <Typography key={comment.id}>
                                                                                        <strong>{ comment.user?.name }</strong>
                                                                                    </Typography>
                                                                                )           
                                                                            }
                                                                        })
                                                                    }
                                                                    <Grid container spacing={2}>
                                                                        <Grid item md={9} sm={9} xs={3}>
                                                                            <TopCommentTG paragraph>
                                                                                { groupComment.description }
                                                                            </TopCommentTG>
                                                                        </Grid>
                                                                        <Grid item md={3} sm={3} xs={3}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item md={6} sm={6} xs={12}>
                                                                                    {
                                                                                        (authUser.id == groupComment.user_id) && (
                                                                                            <>
                                                                                                <CommentEditModalForm comment={groupComment} />
                                                                                            </>
                                                                                        )
                                                                                    }
                                                                                </Grid>
                                                                                <Grid item md={6} sm={6} xs={12}>
                                                                                    {
                                                                                        (authUser.id == groupComment.user_id) && (
                                                                                            <>
                                                                                                <IconButton title="Delete Comment" onClick={() => handleCommentDelete(groupComment)}>
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
                                                            </CommentsCard>
                                                        </CommentsGridItem>
                                                    </CommentsGrid>
                                                )   
                                            }
                                        })
                                    }
                                    <CommentInputGrid container spacing={2}>
                                        <Grid item md={1} sm={1} xs={12}>
                                            <ProfileLogo name={groupPost.user.name} imageUrl={`images/${groupPost.user.image}`} />
                                        </Grid>
                                        <Grid item md={11} sm={11} xs={12}>
                                            <CommentInputModalForm post={groupPost} authUser={authUser} />
                                        </Grid>
                                    </CommentInputGrid>
                                    {/* <CommentInputGrid container spacing={2}>
                                        <Grid item md={1} sm={1} xs={12}>
                                            <ProfileLogo name="Saif Kamal" imageUrl="/images/saif.jpeg" />
                                        </Grid>
                                        <Grid item md={11} sm={11} xs={12}>
                                            <CommentTextField 
                                            id="standard-basic" 
                                            label="Comment" 
                                            variant="standard" 
                                            placeholder="Enter Your Comment" 
                                            InputProps={{
                                                endAdornment: 
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <EmojiEmotionsIcon fontSize="medium" />
                                                    </IconButton>
                                                    <IconButton>
                                                        <InsertPhotoIcon fontSize="medium" />
                                                    </IconButton>
                                                </InputAdornment>
                                            }}
                                            />
                                        </Grid>
                                    </CommentInputGrid> */}
                                </Collapse>
                            </GroupPostCard>
                        )   
                    }
                })
            }
        </>
    )
}

export default RootComp