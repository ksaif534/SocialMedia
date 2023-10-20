'use client'
import { Avatar, ButtonBase, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, Grid, IconButton, IconButtonProps, InputAdornment, Menu, MenuItem, Stack, Typography, TextField , styled } from "@mui/material";
import React, { useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProfileLogo from "@/app/home/@profileLogo/page";

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

const GroupPostCard = styled(Card)(({theme}) => ({
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

const MediaButtonBase = styled(ButtonBase)(({theme}) => ({
    width: '100%'
}))

const RelevantCommentGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
}))

const RelevantCommentGridFirstItem = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

const RelevantCommentGridItem = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(2)
}))

const RelevantCommentCard = styled(Card)(({theme}) => ({
    borderRadius: theme.spacing(1)
}))

const RelevantCommentTG = styled(Typography)(({theme}) => ({
    fontSize: '18px'
}))

const CommentInputGrid = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2)
}))

const CommentTextField = styled(TextField)(({theme}) => ({
    width: '100%',
    paddingRight: theme.spacing(2)
}))

const Featured = () => {
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
            <GroupPostCard>
                <CardHeader 
                avatar={<Avatar src="/images/rasel-rana.jpeg" />}
                title={
                    <>
                        <Grid container spacing={2}>
                            <Grid item md={6} sm={12} xs={12}>
                                <Grid container>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <Typography variant="h6"><strong>Rasel Rana</strong></Typography>
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
                                <Menu id="gpc-icon-click-menu-featured" anchorEl={anchorGPCIconElement} open={GPCIconOpen} onClose={handleGPCIconClose} MenuListProps={{ 'aria-labelledby': 'icon' }}>
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
                    <CardMedia component="img" height="400" image="/images/blueish-bg.jpeg" alt="" />
                </MediaButtonBase>
                <CardContent>
                    <Typography variant="h6" color="text.secondary">
                        Domain setup for dedicated server
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
                            <strong>Relevant Comments:</strong>
                        </Typography>
                        <RelevantCommentGrid container spacing={2}>
                            <RelevantCommentGridFirstItem item md={1} sm={1} xs={12}>
                                <ProfileLogo name="Safat Shahin" imageUrl="/images/safat-shahin.jpeg" />
                            </RelevantCommentGridFirstItem>
                            <RelevantCommentGridItem item md={11} sm={11} xs={12}>
                                <RelevantCommentCard elevation={3}>
                                    <CardContent>
                                        <Typography>
                                            <strong>Safat Shahin</strong>
                                        </Typography>
                                        <RelevantCommentTG paragraph>
                                            Great Post. Thanks for sharing.
                                        </RelevantCommentTG>
                                    </CardContent>
                                </RelevantCommentCard>
                            </RelevantCommentGridItem>
                            <RelevantCommentGridFirstItem item md={1} sm={1} xs={12}>
                                <ProfileLogo name="Ivdad Ahmed" imageUrl="/images/ivdad-ahmed.jpeg" />
                            </RelevantCommentGridFirstItem>
                            <RelevantCommentGridItem item md={11} sm={11} xs={12}>
                                <RelevantCommentCard elevation={3}>
                                    <CardContent>
                                        <Typography>
                                            <strong>Ivdad Ahmed</strong>
                                        </Typography>
                                        <RelevantCommentTG paragraph>
                                            Excellent Post. Deserves a million views.
                                        </RelevantCommentTG>
                                    </CardContent>
                                </RelevantCommentCard>
                            </RelevantCommentGridItem>
                            <RelevantCommentGridFirstItem item md={1} sm={1} xs={12}>
                                <ProfileLogo name="Nayeem Ahmad" imageUrl="/images/nayeem-ahmad.jpeg" />
                            </RelevantCommentGridFirstItem>
                            <RelevantCommentGridItem item md={11} sm={11} xs={12}>
                                <RelevantCommentCard elevation={3}>
                                    <CardContent>
                                        <Typography>
                                            <strong>Nayeem Ahmad</strong>
                                        </Typography>
                                        <RelevantCommentTG paragraph>
                                            Very impressive post. Hat's off.
                                        </RelevantCommentTG>
                                    </CardContent>
                                </RelevantCommentCard>
                            </RelevantCommentGridItem>
                        </RelevantCommentGrid>
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
                    </CardContent>
                </Collapse>
            </GroupPostCard>
        </>
    )
}

export default Featured