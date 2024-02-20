'use client'
import { Avatar, Box, Card, Grid, IconButton, IconButtonProps, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

export const IntroBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(2),
    height: theme.spacing(50),
    [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(3)
    },
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(3)
    }
}))

export const IntroBoxCard = styled(Card)(({theme}) => ({
    borderRadius: theme.spacing(1)
}))

export const IntroTG = styled(Typography)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(-2),
    fontWeight: 'bold'
}))

export const IntroGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
}))

export const RoundedAvatar = styled(Avatar)(({theme}) => ({
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderRadius: '50%',
    [theme.breakpoints.down('md')]: {
        width: theme.spacing(6),
        height: theme.spacing(6)
    },
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(6),
        height: theme.spacing(6)
    }
}))

export const ProfilePostInputCard = styled(Card)(({theme}) => ({
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(1)
}))

export const ProfilePostInputGrid = styled(Grid)(({theme}) => ({
    
}))

export const ProfilePostInputGridItem = styled(Grid)(({theme}) => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

export const ProfilePostInputTextField = styled(TextField)(({theme}) => ({
    width: '100%'
}))

export const ProfilePostDivider = styled('div')(({theme}) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]:{
        marginTop: theme.spacing(6)
    }
}))

export const ProfilePostIconGridItem = styled(Grid)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
}))

export const ProfilePostIconButton = styled(IconButton)(({theme}) => ({
    borderRadius: theme.spacing(2),
    backgroundColor: '#d3d3d3',
    color: '#000000',
    '&:hover': {
        backgroundColor: '#808080'
    }
}))

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

export const ProfilePostCard = styled(Card)(({theme}) => ({
    marginTop: theme.spacing(5),
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(5)
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(5),
    }
}))

export const TopCommentGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
}))

export const TopCommentGridItem = styled(Grid)(({theme}) => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

export const TopCommentCard = styled(Card)(({theme}) => ({
    borderRadius: theme.spacing(2)
}))

export const RelevantCommentsGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(2)
}))

export const RelevantCommentsGridItem = styled(Grid)(({theme}) => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

export const RelevantCommentsCard = styled(Card)(({theme}) => ({
   borderRadius: theme.spacing(2) 
}))

export const CommentGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(2)
}))

export const CommentGridItem = styled(Grid)(() => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

export const ProfilePhotosCard = styled(Card)(({theme}) => ({
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(12)
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(12)
    }
}))

export const SeeAllPhotos = styled('div')(({theme}) => ({
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: theme.spacing(5)
}))

export const FriendListCard = styled(Card)(({theme}) => ({
    marginTop: theme.spacing(5),
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(10)
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(10)
    }
}))

export const SeeAllFriends = styled('div')(({theme}) => ({
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: theme.spacing(5)
}))