'use client'
import { Box, Button, Card, Grid, TextField } from "@mui/material"
import { styled } from "@mui/material/styles"

export const LoginCard = styled(Card)(({theme}) => ({
    maxWidth: 'auto',
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    marginTop: theme.spacing(6),
    borderRadius: theme.spacing(1)
}))

export const AuthLoginFormBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2)
}))

export const AuthLoginInputFieldsGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
}))

export const AuthLoginInputTextField = styled(TextField)(({theme}) => ({
    width: '100%',
    backgroundColor: 'rgba(123,123,123,0.7)',
}))

export const AuthLoginSubmissionStyle = styled('div')(({theme}) => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex' 
}))

export const SubmitButton = styled(Button)(({theme}) => ({
    marginTop: theme.spacing(4)
}))