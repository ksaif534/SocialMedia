import { Box, Card, FormControlLabel, Grid, RadioGroup, Select, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';

export const ProfileUpdateCard = styled(Card)(({theme}) => ({
    maxWidth: 'auto',
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    marginTop: theme.spacing(6),
    borderRadius: theme.spacing(1)
}))

export const ProfileUpdateFormBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2)
}))

export const ProfileUpdateInputFieldsGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
}))

export const ProfileUpdateInputTextField = styled(TextField)(({theme}) => ({
    width: '100%',
    backgroundColor: 'rgba(123,123,123,0.7)'
}))

export const ProfileUpdateInputRadioGroup = styled(RadioGroup)(() => ({
    color: 'rgba(255,255,255,0)'
}))

export const ProfileUpdateFormControlLabel = styled(FormControlLabel)(({theme}) => ({
    color: 'rgba(128,128,128,1)'
}))

export const ProfileUpdateInputFormSelect = styled(Select)(() => ({
    width: '100%',
    backgroundColor: 'rgba(255,255,255,1)'
}))

export const ProfileUpdateFormSubmissionStyle = styled('div')(() => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
}))