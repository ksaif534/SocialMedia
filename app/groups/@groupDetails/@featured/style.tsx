'use client'
import { ButtonBase, Card, Grid, IconButton, IconButtonProps, Stack, TextField, Typography, styled } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

export const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}));

export const GroupPostCard = styled(Card)(({theme}) => ({
    borderRadius: theme.spacing(1)
}))

export const ChipStack = styled(Stack)(({theme}) => ({
    [theme.breakpoints.down('sm')]:{
        marginTop: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(2),
    }
}))

export const GPCGridRightItem = styled(Grid)(({theme}) => ({
    justifyContent: 'right',
    alignItems: 'right',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }
}))

export const MediaButtonBase = styled(ButtonBase)(() => ({
    width: '100%'
}))

export const RelevantCommentGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
}))

export const RelevantCommentGridFirstItem = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

export const RelevantCommentGridItem = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(2)
}))

export const RelevantCommentCard = styled(Card)(({theme}) => ({
    borderRadius: theme.spacing(1)
}))

export const RelevantCommentTG = styled(Typography)(({theme}) => ({
    fontSize: '18px'
}))

export const CommentInputGrid = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2)
}))

export const CommentTextField = styled(TextField)(({theme}) => ({
    width: '100%',
    paddingRight: theme.spacing(2)
}))