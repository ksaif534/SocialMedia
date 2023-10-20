'use client'
import ProfileLogo from "@/app/home/@profileLogo/page";
import { Avatar, ButtonBase, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, IconButtonProps, Menu, MenuItem, TextField, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputAdornment from '@mui/material/InputAdornment';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}));

const GroupPostInputCard = styled(Card)(({theme}) => ({
    borderRadius: theme.spacing(1),
}))

const GPICTextField = styled(TextField)(() => ({
    width: '100%'
}))

const GPICIconGridItem = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(3),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

const GPICIconButton = styled(IconButton)(({theme}) => ({
    borderRadius: theme.spacing(2),
    backgroundColor: 'rgba(128,128,128,0.3)',
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.5)'
    }
}))

const GroupPostCard = styled(Card)(({theme}) => ({
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(1)
}))

const ChipStack = styled(Stack)(({theme}) => ({
    [theme.breakpoints.down('sm')]:{
        marginTop: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(2),
    }
}))

const GPCGridRightItem = styled(Grid)(({theme}) => ({
    justifyContent: 'right',
    alignItems: 'right',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }
}))

const MediaButtonBase = styled(ButtonBase)(() => () => ({
    width: '100%',
}))

const TopCommentGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}))

const TopCommentGridFirstItem = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

const TopCommentGridItem = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
}))

const TopCommentCard = styled(Card)(({theme}) => ({
    borderRadius: theme.spacing(1),
}))

const TopCommentTG = styled(Typography)(({theme}) => ({
    fontSize: '18px'
}))

const CommentInputGrid = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2)
}))

const CommentTextField = styled(TextField)(({theme}) => ({
    width: '100%',
    paddingRight: theme.spacing(2)
}))

const Discussion = () => {
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

export default Discussion