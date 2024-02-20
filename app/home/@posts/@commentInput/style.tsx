import { ButtonBase, Card, CardContent, Grid, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';


export const CommentInputModalButtonBase = styled(ButtonBase)(({theme}) => ({
    marginTop: theme.spacing(2),
    backgroundColor: 'rgba(128,128,128,0.3)',
    borderRadius: theme.spacing(4),
    width: '100%',
    '&:hover':{
        backgroundColor: 'rgba(128,128,128,0.5)'
    }
}))

export const CommentInputStyle = {
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

export const CommentInputModalFormCard = styled(Card)(({theme}) => ({
    marginTop: theme.spacing(5),
    backgroundColor: 'inherit',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

export const CommentInputModalFormCardContent = styled(CardContent)(({theme}) => ({
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

export const CommentInputFieldsGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
}))

export const CommentInputModalFormTextField = styled(TextField)(() => ({
    width: '100%',
    backgroundColor: 'rgba(255,255,255,1)'
}))

export const CommentInputModalFormSelect = styled(Select)(() => ({
    width: '100%',
    backgroundColor: 'rgba(255,255,255,1)'
}))

export const CommentSubmissionStyle = styled('div')(() => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

export const CommentInputModalFormsRadioGroup = styled(RadioGroup)(() => ({
    color: 'rgba(255,255,255,1)'
}))

export const CommentEditModalButtonBase = styled(ButtonBase)(() => ({
    width: '100%'
}))