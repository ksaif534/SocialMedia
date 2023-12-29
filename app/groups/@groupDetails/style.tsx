'use client'
import { Button, Card, Divider, IconButton, Tabs, styled } from "@mui/material"

export const GroupCoverHeadingWrapper = styled('div')(({theme}) => ({
    backgroundColor: 'rgba(128,128,128,0.3)',
    marginRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderRadius: theme.spacing(2),
}))

export const GroupCoverHeadingCard = styled(Card)(({theme}) => ({
    width: '90%',
    marginLeft: theme.spacing(7),
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('lg')]: {
        marginLeft: theme.spacing(5)
    },
    [theme.breakpoints.down('md')]: {
        objectFit: 'cover',
        marginLeft: theme.spacing(2)
    },
    [theme.breakpoints.down('sm')]: {
        objectFit: 'cover',
        marginLeft: theme.spacing(2)
    }
}))

export const GroupCoverHeadingWrapperDiv = styled('div')(({theme}) => ({
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        display: 'inline-block',
    },
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        display: 'inline-block',
    }
}))

export const GroupCoverHeadingStartDiv = styled('div')(({theme}) => ({
    marginLeft: theme.spacing(4),
    justifyContent: 'left',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        display: 'inline-block',
    },
    [theme.breakpoints.down('sm')]: {
        display: 'inline-block'
    }
}))

export const GroupCoverHeadingEndDiv = styled('div')(({theme}) => ({
    marginTop: theme.spacing(-4),
    marginRight: theme.spacing(4),
    justifyContent: 'right',
    alignItems: 'right',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(4),
        display: 'inline-block',
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(4),
        display: 'inline-block'
    }
}))

export const InviteButton = styled(Button)(({theme}) => ({
    marginRight: theme.spacing(2),
}))

export const DownIconButton = styled(IconButton)(({theme}) => ({
    backgroundColor: 'rgba(128,128,128,0.5)',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.3)'
    },
    [theme.breakpoints.down('md')]: {
        marginRight: theme.spacing(-2)
    },
    [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(-2)
    }
}))

export const GroupCoverHeadingDivider = styled(Divider)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: '#ffffff'
}))

export const GroupCoverHeadingTabWrapperDiv = styled('div')(({theme}) => ({
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4)
}))

export const GroupCoverHeadingTabs = styled(Tabs)(({theme}) => ({
    backgroundColor: 'rgba(0,255,255,0.6)',
    borderRadius: theme.spacing(1),
    color: 'rgba(0,0,0,0.7)',
    '&:hover': {
        color: 'rgba(0,0,0,1)',
    }
}))