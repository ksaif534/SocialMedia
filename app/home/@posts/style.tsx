'use client'
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { Card, Grid, TextField, Typography } from '@mui/material';

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
  
export const PostCard = styled(Card)(({theme}) => ({
    maxWidth: 'auto',
    marginLeft: theme.spacing(6),
    borderRadius: theme.spacing(1)
}))
  
export const CommentTextField = styled(TextField)(({theme}) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.down('md')]: {
        width: theme.spacing(50),
    },
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(40)
    }
}))
  
export const TopAnswerCard = styled(Card)(({theme}) => ({
    borderRadius: theme.spacing(2),
}))
  
export const TopAnswerGrid = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2)
}))
  
export const TopAnswerGridItem = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))
  
export const TopAnswerTG = styled(Typography)(({theme}) => ({
    marginTop: theme.spacing(2),
}))
  
export const RelevantAnswersCard = styled(Card)(({theme}) => ({
    borderRadius: theme.spacing(2)
}))
  
export const RelevantAnswersGrid = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2)
}))
  
export const RelevantAnswersGridItem = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))
  
export const RelevantAnswersTG = styled(Typography)(({theme}) => ({
    marginTop: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))
  
export const ProfileGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1.5)
}))