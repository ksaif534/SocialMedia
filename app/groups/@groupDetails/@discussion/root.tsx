'use client'
import { Avatar, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { ChipStack, CommentInputGrid, CommentsCard, CommentsGrid, CommentsGridFirstItem, CommentsGridItem, ExpandMore, GPCGridRightItem, GroupPostCard, MediaButtonBase, TopCommentTG } from "./style"
import { useState, useEffect, useContext } from "react";
import ProfileLogo from "../../../home/@profileLogo/page";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import PostInput from "../../../home/@postInput/page";
import CommentInputModalForm from "../../../home/@posts/@commentInput/modal";
import CommentEditModalForm from "../../../home/@posts/@commentInput/editModal";
import deleteComment from "../../../home/@posts/@commentInput/deleteComment";
import Swal from "sweetalert2";
import PostEditModalForm from "../../../home/@posts/editModal";
import fetchGroupPosts from "./fetchGroupPosts";
import fetchUser from "../../../profile/@profileCoverHeading/fetchUser";
import fetchComments from "../../../home/@posts/@commentInput/fetchComments";
import { SearchGroupPostContext } from "../../@navbar/page";
import Cookies from "js-cookie";

const RootComp = (props: any) => {
    const { group } = props;
    const authUserId = Cookies.get("authUserId");
    const { srchGrpPosts, srchGrpPostKey } = useContext(SearchGroupPostContext);
    const [anchorGPCIconElement,setAnchorGPCIconElement] = useState<null | HTMLElement>(null);
    const [expanded,setExpanded] = useState(false);
    const GPCIconOpen = Boolean(anchorGPCIconElement);

    const [groupPosts,setGroupPosts] = useState([]);
    const [groupComments,setGroupComments] = useState([]);
    const [authUser,setAuthUser] = useState({ id: 0 ,name: '', email: '', image: null });

    useEffect(() => {
        fetchGroupPosts().then((groupPosts: any) => {
            setGroupPosts(groupPosts);
        });
        fetchUser(authUserId).then((user: any) => setAuthUser(user));
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
            <PostInput group={group} />
            {
                (srchGrpPostKey !== '') ? (
                    <>
                        {
                            (srchGrpPosts.length > 0) ? (
                                <>
                                    {
                                        srchGrpPosts.map((srchGrpPost: any, index: number) => {
                                            if (srchGrpPost.group_id == group.id) {
                                                return (
                                                    <GroupPostCard key={srchGrpPost.id}>
                                                        <CardHeader 
                                                            avatar={<Avatar src={srchGrpPost?.thumbnail} />} 
                                                            title={
                                                            <>
                                                                <Grid container spacing={2}>
                                                                    <Grid item md={9} sm={9} xs={12}>
                                                                        <Grid container>
                                                                            <Grid item md={12} sm={12} xs={12}>
                                                                                <Typography variant="h6"><strong>{ srchGrpPost.title }</strong></Typography>
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
                                                                        (srchGrpPost.user_id == authUser.id) && (
                                                                            <GPCGridRightItem item md={3} sm={3} xs={12}>
                                                                                <IconButton onClick={handleGPCIconClick}>
                                                                                    <MoreHorizIcon fontSize="large" />
                                                                                </IconButton>
                                                                                <Menu id="gpc-icon-click-menu-discussed" anchorEl={anchorGPCIconElement} open={GPCIconOpen} onClose={handleGPCIconClose} MenuListProps={{ 'aria-labelledby': 'icon' }}>
                                                                                    <MenuItem>
                                                                                        <PostEditModalForm post={srchGrpPost} />
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
                                                            <CardMedia component="img" height="300" image={srchGrpPost.figure} alt="" />
                                                        </MediaButtonBase>
                                                        <CardContent>
                                                            <Typography variant="h6" color="text.secondary">
                                                                { srchGrpPost.description }
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
                                                                srchGrpPost?.comments?.map((comment: any,commentIndex: number) => {
                                                                    if (comment.is_allow == 1) {
                                                                        return (
                                                                            <CommentsGrid container spacing={2} key={comment.id}>
                                                                                <CommentsGridFirstItem item md={1} sm={1} xs={12}>
                                                                                    {
                                                                                        groupComments.map((comment: any) => {
                                                                                            if (comment.id == comment.id) {
                                                                                                return (
                                                                                                    <ProfileLogo name={comment.name} imageUrl={comment?.user?.image} key={comment.id} />
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
                                                                                                    if (comment.id == comment.id) {
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
                                                                                                        { comment.description }
                                                                                                    </TopCommentTG>
                                                                                                </Grid>
                                                                                                <Grid item md={3} sm={3} xs={3}>
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
                                                                                    </CommentsCard>
                                                                                </CommentsGridItem>
                                                                            </CommentsGrid>
                                                                        )   
                                                                    }
                                                                })
                                                            }
                                                            <CommentInputGrid container spacing={2}>
                                                                <Grid item md={1} sm={1} xs={12}>
                                                                    <ProfileLogo name={srchGrpPost.user.name} imageUrl={srchGrpPost?.user?.image} />
                                                                </Grid>
                                                                <Grid item md={11} sm={11} xs={12}>
                                                                    <CommentInputModalForm post={srchGrpPost} authUser={authUser} />
                                                                </Grid>
                                                            </CommentInputGrid>
                                                        </Collapse>
                                                    </GroupPostCard>
                                                )
                                            }
                                        })
                                    }
                                </>
                            ) : (
                                <>
                                    <GroupPostCard>
                                        <MediaButtonBase>
                                            <CardMedia component="img" height="300" image="images/404-not-found.avif" alt="404 not found" />
                                        </MediaButtonBase>
                                        <CardContent>
                                            <Typography variant="h6"><strong>Sorry, no group posts available</strong></Typography>
                                        </CardContent>
                                    </GroupPostCard>
                                </>
                            )
                        }
                    </>
                ) : (
                    <>
                        {
                            groupPosts.map((groupPost: any, index: number) => {
                                if (groupPost.group_id == group.id) {
                                    return (
                                        <GroupPostCard key={groupPost.id}>
                                            <CardHeader 
                                                avatar={<Avatar src={groupPost?.thumbnail} />} 
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
                                                <CardMedia component="img" height="300" image={groupPost?.figure} alt="" />
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
                                                    groupPost?.comments?.map((comment: any, commentIndex: number) => {
                                                        if (comment.is_allow == 1) {
                                                            return (
                                                                <CommentsGrid container spacing={2} key={comment.id}>
                                                                    <CommentsGridFirstItem item md={1} sm={1} xs={12}>
                                                                        {
                                                                            groupComments.map((comment: any) => {
                                                                                if (comment.id == comment.id) {
                                                                                    return (
                                                                                        <ProfileLogo name={comment.name} imageUrl={comment?.user?.image} key={comment.id} />
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
                                                                                        if (comment.id == comment.id) {
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
                                                                                            { comment.description }
                                                                                        </TopCommentTG>
                                                                                    </Grid>
                                                                                    <Grid item md={3} sm={3} xs={3}>
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
                                                                        </CommentsCard>
                                                                    </CommentsGridItem>
                                                                </CommentsGrid>
                                                            )   
                                                        }
                                                    })
                                                }
                                                <CommentInputGrid container spacing={2}>
                                                    <Grid item md={1} sm={1} xs={12}>
                                                        <ProfileLogo name={groupPost.user.name} imageUrl={groupPost?.user?.image} />
                                                    </Grid>
                                                    <Grid item md={11} sm={11} xs={12}>
                                                        <CommentInputModalForm post={groupPost} authUser={authUser} />
                                                    </Grid>
                                                </CommentInputGrid>
                                            </Collapse>
                                        </GroupPostCard>
                                    )   
                                }
                            })
                        }
                    </>
                )
            }
        </>
    )
}

export default RootComp