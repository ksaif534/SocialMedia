import { Card, Grid, IconButton, TextField, styled } from "@mui/material";

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

export const PostInputTextField = styled(TextField)(({theme}) => ({
    width: '100%',
}))

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