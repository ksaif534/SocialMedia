import { ButtonBase, Card, CardContent, Grid, IconButton, RadioGroup, Select, TextField, Typography, styled } from "@mui/material";

export const PostInputCard = styled(Card)(({theme}) => ({
    width: 'auto',
    marginLeft: theme.spacing(6),
    borderRadius: theme.spacing(1),
    backgroundColor: '#ffffff',
}))

export const ProfileGridItem = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(2)
}))

export const PostInputGrid = styled(Grid)(({theme}) => ({
    marginRight: theme.spacing(4)
}))

export const PostInputModalButtonBase = styled(ButtonBase)(({theme}) => ({
    marginTop: theme.spacing(2),
    backgroundColor: 'rgba(128,128,128,0.3)',
    borderRadius: theme.spacing(4),
    width: '100%',
    '&:hover':{
        backgroundColor: 'rgba(128,128,128,0.5)'
    }
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

export const FormHeaderTG = styled(Typography)(({theme}) => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginBottom: theme.spacing(2),
    color: 'rgba(255,255,255,1)'
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

export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const PostInputGridItem = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))

export const PostInputIconButton = styled(IconButton)(({theme}) => ({
    borderRadius: theme.spacing(2),
    backgroundColor: '#d3d3d3',
    '&: hover': {
        backgroundColor: '#808080'
    },
    color: '#000000'
}))

export const PostSubmissionStyle = styled('div')(() => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
}))