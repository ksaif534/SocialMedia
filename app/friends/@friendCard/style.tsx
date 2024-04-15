'use client'
import { Button, Card, Grid } from "@mui/material"
import { styled } from "@mui/material/styles"

export const FriendGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(8)
}))

export const FriendCard = styled(Card)(({theme}) => ({
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderRadius: theme.spacing(2),
    width: '80%'
}))

export const FriendCardButton = styled(Button)(({theme}) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%'
}))