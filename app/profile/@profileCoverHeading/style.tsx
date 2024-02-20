'use client'
import { Avatar, Box, Card, Grid, IconButton, Tabs, Typography, styled } from "@mui/material"

export const ProfileCoverHeadingGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(8)
}))

export const ProfileCoverHeadingCard = styled(Card)(({theme}) => ({
    borderRadius: theme.spacing(1)
}))

export const ProfileGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(-5),
    marginBottom: theme.spacing(2),
    textAlign: 'center'
}))

export const ProfileEditIconButton = styled(IconButton)(({theme}) => ({
    borderRadius: theme.spacing(5),
    backgroundColor: '#ffffff',
    border: '2px solid #808080',
    color: '#000000',
    '&:hover': {
        backgroundColor: '#d3d3d3'
    }
}))

export const ProfileImageGridItem = styled(Grid)(({theme}) => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

export const RoundedAvatar = styled(Avatar)(({theme}) => ({
    width: theme.spacing(18),
    height: theme.spacing(18),
    borderRadius: '50%',
    border:'4px solid #a9a9a9', 
    [theme.breakpoints.down('md')]: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        marginBottom: theme.spacing(-5)
    },
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    }
}))

export const ProfileHeadersGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(2)
}))

export const ProfileTitleGrid = styled(Grid)(({theme}) => ({
    marginLeft: theme.spacing(-5),
    [theme.breakpoints.down('md')]: {
        marginLeft: theme.spacing(0)
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(0)
    }
}))

export const ProfileTitleTG = styled(Typography)(({theme}) => ({
    textColor: '#ffffff',
}))

export const ProfileSubTitleTG = styled(Typography)(({theme}) => ({
    marginLeft: theme.spacing(2),
    textColor: '#ffffff',
}))

export const RoundedFirstSmallAvatar = styled(Avatar)(({theme}) => ({
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginLeft: theme.spacing(1),
    borderRadius: '50%',
    border: '2px solid #a9a9a9',
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(5),
        height: theme.spacing(5)
    }
}))

export const RoundedSmallAvatar = styled(Avatar)(({theme}) => ({
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginLeft: theme.spacing(-1),
    borderRadius: '50%',
    border:'2px solid #a9a9a9', 
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(5),
        height: theme.spacing(5)
    }
}))

export const ProfileTabBox = styled(Box)(() => ({
    borderBottom: 1,
    borderColor: 'divider'
}))

export const ProfileTabs = styled(Tabs)(({theme}) => ({
    backgroundColor: '#00ffff',
    borderRadius: theme.spacing(1),
}))

export const MoreIconButtons = styled(IconButton)(({theme}) => ({
    backgroundColor: '#ffffff',
    color: '#000000',
    borderRadius: theme.spacing(5),
    border: '2px solid #808080',
    '&:hover': {
        backgroundColor: '#d3d3d3'
    }
}))