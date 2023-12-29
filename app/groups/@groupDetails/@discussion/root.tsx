'use client'
import { Avatar, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, Grid, IconButton, InputAdornment, Menu, MenuItem, Typography } from "@mui/material"
import { ChipStack, CommentInputGrid, CommentTextField, ExpandMore, GPCGridRightItem, GPICIconButton, GPICIconGridItem, GPICTextField, GroupPostCard, GroupPostInputCard, MediaButtonBase, TopCommentCard, TopCommentGrid, TopCommentGridFirstItem, TopCommentGridItem, TopCommentTG } from "./style"
import { useState } from "react";
import ProfileLogo from "@/app/home/@profileLogo/page"
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const RootComp = () => {
    const [anchorGPCIconElement,setAnchorGPCIconElement] = useState<null | HTMLElement>(null);
    const [expanded,setExpanded] = useState(false);
    const GPCIconOpen = Boolean(anchorGPCIconElement);

    const handleGPCIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorGPCIconElement(event.currentTarget);
    }

    const handleGPCIconClose = () => {
        setAnchorGPCIconElement(null);
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    return (
        <>
            <GroupPostInputCard variant="outlined">
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
            </GroupPostInputCard>
            <GroupPostCard>
                <CardHeader 
                    avatar={<Avatar src="/images/saif.jpeg" />} 
                    title={
                    <>
                        <Grid container spacing={2}>
                            <Grid item md={6} sm={12} xs={12}>
                                <Grid container>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <Typography variant="h6"><strong>Saif Kamal</strong></Typography>
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <ChipStack direction={{ md: 'row', sm: 'column', xs: 'column' }} spacing={1}>
                                            <Chip label="Admin" />
                                            <Chip label="Top Contributor" />
                                        </ChipStack>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <GPCGridRightItem item md={6} sm={12} xs={12}>
                                <IconButton onClick={handleGPCIconClick}>
                                    <MoreHorizIcon fontSize="large" />
                                </IconButton>
                                <Menu id="gpc-icon-click-menu-discussed" anchorEl={anchorGPCIconElement} open={GPCIconOpen} onClose={handleGPCIconClose} MenuListProps={{ 'aria-labelledby': 'icon' }}>
                                    <MenuItem onClick={handleGPCIconClose}>
                                        Edit Post
                                    </MenuItem>
                                    <MenuItem onClick={handleGPCIconClose}>
                                        Delete Post
                                    </MenuItem>
                                </Menu>
                            </GPCGridRightItem>
                        </Grid>
                    </>
                } 
                />
                <MediaButtonBase>
                    <CardMedia component="img" height="400" image="/images/subscription-pro.jpeg" alt="" />
                </MediaButtonBase>
                <CardContent>
                    <Typography variant="h6" color="text.secondary">
                        SQL basic understanding cheat sheet
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
                            <strong>Top Comment:</strong>
                        </Typography>
                    </CardContent>
                    <TopCommentGrid container spacing={2}>
                        <TopCommentGridFirstItem item md={1} sm={1} xs={12}>
                            <ProfileLogo name="Ivdad Ahmed" imageUrl="/images/ivdad-ahmed.jpeg" />
                        </TopCommentGridFirstItem>
                        <TopCommentGridItem item md={11} sm={11} xs={12}>
                            <TopCommentCard elevation={3}>
                                <CardContent>
                                    <Typography>
                                        <strong>Ivdad Ahmed</strong>
                                    </Typography>
                                    <TopCommentTG paragraph>
                                        Great article. Hat's off to the author.
                                    </TopCommentTG>
                                </CardContent>
                            </TopCommentCard>
                        </TopCommentGridItem>
                    </TopCommentGrid>
                    <CommentInputGrid container spacing={2}>
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
                    </CommentInputGrid>
                </Collapse>
            </GroupPostCard>
        </>
    )
}

export default RootComp