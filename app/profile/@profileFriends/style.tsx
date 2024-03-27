'use client'
import { Avatar, Box, Card, Grid, IconButton, Paper, TextField, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

export const FriendsBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(2),
    height: 'auto',
    [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(3)
    },
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(3)
    }
}))

export const FriendsBoxCard = styled(Card)(({theme}) => ({
    borderRadius: theme.spacing(1)
}))

export const FriendsBoxCardGrid = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1)
}))

export const FriendsTG = styled(Typography)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(-2),
    fontWeight: 'bold'
}))

export const FriendsSearchBar = styled(TextField)(({theme}) => ({
    width: '100%',
    marginTop: theme.spacing(1),
    backgroundColor: 'rgba(123,123,123,0.7)',
    borderRadius: '20px',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'transparent', // Remove the default border
        },
        '&:hover fieldset': {
          borderColor: 'transparent', // Remove the border when hovering
        },
    },
}))

export const FindFriendsButton = styled(IconButton)(({theme}) => ({
    marginTop: theme.spacing(1),
    backgroundColor: '#ffffff',
    color: '#000000',
    borderRadius: theme.spacing(5),
    border: '2px solid #808080',
    '&:hover': {
        backgroundColor: '#d3d3d3'
    }
}))

export const FriendListNetworkGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(2),
    height: 'auto'
}))

export const FriendListItemPaper = styled(Paper)(({theme}) => ({
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.5)'
    }
}))

export const FriendsAvatar = styled(Avatar)(({theme}) => ({
    marginLeft: theme.spacing(1),
    width: '80%',
    height: '80%',
    borderRadius: theme.spacing(3)
}))

export const FriendsNamesTG = styled(Typography)(({theme}) => ({
    marginTop: theme.spacing(1),
    fontWeight: 'bold',
    fontSize: '20px'
}))
