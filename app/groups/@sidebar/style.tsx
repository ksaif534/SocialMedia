'use client'
import { Avatar, Button, Divider, Grid, IconButton, TextField, Typography, styled } from "@mui/material"

export const SidebarWrapper = styled('div')(() => ({
    height: '100vh',
    backgroundColor: 'rgba(36,37,38,1.0)',
    overflowY: 'auto',
}))

export const SidebarHeaderGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
        marginLeft: theme.spacing(0)
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(0)
    }
}))

export const SidebarHeaderGridItem = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))

export const SidebarIconButton = styled(IconButton)(({theme}) => ({
    color: '#ffffff',
    backgroundColor: 'rgba(128,128,128,0.8)',
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.5)'
    },
}))

export const SidebarSearchGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1)
}))

export const SidebarSearchGridItem = styled(Grid)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))

export const SidebarSearchTextField = styled(TextField)(({theme}) => ({
    width: '100%',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: '#ffffff',
    borderRadius: theme.spacing(4),
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
          border: 'none', // Remove the border
        },
    },
}))

export const SidebarExploreGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.3)',
        borderRadius: theme.spacing(1),
    }
}))

export const SidebarExploreGridItem = styled(Grid)(({theme}) => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

export const SidebarExploreIconButton = styled(IconButton)(({
    backgroundColor: 'rgba(128,128,128,0.5)',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.3)'
    }
}))

export const SidebarDivider = styled(Divider)(({theme}) => ({
    marginTop: theme.spacing(4),
    backgroundColor: '#ffffff'
}))

export const CreateGroupButton = styled(Button)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
    width: '88%'
}))

export const SidebarContentHeaderGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(2)
}))

export const SidebarContentHeaderGridItem = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))

export const SidebarContentTG = styled(Typography)(({theme}) => ({
    '&:hover': {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        borderRadius: theme.spacing(2),
        backgroundColor: 'rgba(128,128,128,0.3)',
    }
}))

export const SidebarContentGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.3)'
    },
    borderRadius: theme.spacing(1),
}))

export const SidebarContentGridItem = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))

export const GroupAvatar = styled(Avatar)(({theme}) => ({
    borderRadius: theme.spacing(1)
}))

export const GroupIconButton = styled(IconButton)(() => ({
    backgroundColor: 'rgba(128,128,128,0.5)',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.3)'
    }
}))

export const GroupDetailsWrapper = styled('div')(({theme}) => ({
    marginTop: theme.spacing(10),
    backgroundColor: 'inherit',
}))