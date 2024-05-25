'use client'
import React from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { ButtonBase, Card, CardContent, Grid, RadioGroup, Select, TextField, Typography } from '@mui/material';

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
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2)
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

export const PostEditModalButtonBase = styled(ButtonBase)(({theme}) => ({
    width: '100%',
}))

export const PostInputStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const PostInputModalFormCard = styled(Card)(({theme}) => ({
    marginTop: theme.spacing(5),
    backgroundColor: 'inherit',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

export const PostInputModalFormCardContent = styled(CardContent)(({theme}) => ({
    backgroundColor: 'rgba(32,32,32,1)',
    color: 'rgba(255,255,255,1)',
    borderRadius: theme.spacing(2),
    width: '50%',
    height: 'auto',
    overflow: 'auto',
    maxHeight: '600px'
}))

export const FormHeaderTG = styled(Typography)(({theme}) => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginBottom: theme.spacing(2),
    color: 'rgba(255,255,255,1)'
}))

export const PostInputFieldsGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
}))

export const PostInputModalFormTextField = styled(TextField)(() => ({
    width: '100%',
    backgroundColor: 'rgba(255,255,255,1)'
}))

export const PostInputModalFormSelect = styled(Select)(() => ({
    width: '100%',
    backgroundColor: 'rgba(255,255,255,1)'
}))

export const PostInputModalFormsRadioGroup = styled(RadioGroup)(() => ({
    color: 'rgba(255,255,255,1)'
}))
