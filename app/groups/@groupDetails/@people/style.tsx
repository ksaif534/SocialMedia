'use client'
import { Button, Card, Divider, Grid, Stack, TextField, Typography, styled } from "@mui/material"

export const PeopleCard = styled(Card)(({theme}) => ({
    borderRadius: theme.spacing(1)
}))

export const CommonSpanList = styled('span')(({theme}) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
}))

export const CommonSpanTG = styled(Typography)(({theme}) => ({
    marginLeft: theme.spacing(1)
}))

export const SearchMemberTF = styled(TextField)(({theme}) => ({
    marginTop: theme.spacing(2),
    width: '100%',
    borderRadius: theme.spacing(4),
    backgroundColor: 'rgba(128,128,128,0.3)',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
          border: 'none', // Remove the border
        },
    },
}))

export const CustomDivider = styled(Divider)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
}))

export const AdminModGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.2)',
        borderRadius: theme.spacing(2)
    }
}))

export const ProfileTG = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }
}))

export const ChipStack = styled(Stack)(({theme}) => ({
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }
}))

export const DelegationFont = styled(Typography)(({theme}) => ({
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }
}))

export const SeeAllButton = styled(Button)(({theme}) => ({
    marginTop: theme.spacing(2),
    width: '100%'
}))

export const GroupContributorGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.2)',
        borderRadius: theme.spacing(2)
    }
}))