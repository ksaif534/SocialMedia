'use client'
import { Button, Card, CardContent, Chip, Divider, Grid, InputAdornment, Stack, TextField, Typography, styled } from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search'
import ProfileLogo from "@/app/home/@profileLogo/page";

const PeopleCard = styled(Card)(({theme}) => ({
    borderRadius: theme.spacing(1)
}))

const CommonSpanList = styled('span')(({theme}) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
}))

const CommonSpanTG = styled(Typography)(({theme}) => ({
    marginLeft: theme.spacing(1)
}))

const SearchMemberTF = styled(TextField)(({theme}) => ({
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

const CustomDivider = styled(Divider)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
}))

const AdminModGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.2)',
        borderRadius: theme.spacing(2)
    }
}))

const ProfileTG = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }
}))

const ChipStack = styled(Stack)(({theme}) => ({
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }
}))

const DelegationFont = styled(Typography)(({theme}) => ({
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }
}))

const SeeAllButton = styled(Button)(({theme}) => ({
    marginTop: theme.spacing(2),
    width: '100%'
}))

const GroupContributorGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.2)',
        borderRadius: theme.spacing(2)
    }
}))

const People = () => {
    return (
        <>
            <PeopleCard elevation={3}>
                <CardContent>
                    <CommonSpanList>
                        <CommonSpanTG variant="body1"><strong>Members:</strong></CommonSpanTG>
                        <CommonSpanTG variant="body1">170</CommonSpanTG>
                    </CommonSpanList>
                    <SearchMemberTF 
                    id="outlined-basic" 
                    label="" 
                    variant="outlined" 
                    placeholder="Search Member" 
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="medium" />
                            </InputAdornment>
                        )
                    }}
                    />
                    <CustomDivider />
                    <CommonSpanList>
                        <CommonSpanTG variant="body1"><strong>Admins & Moderators:</strong></CommonSpanTG>
                        <CommonSpanTG variant="body1"><strong>5</strong></CommonSpanTG>
                    </CommonSpanList>
                    <AdminModGrid container spacing={2}>
                        <Grid item md={1} sm={1} xs={12}>
                            <ProfileLogo name="Rasel Rana" imageUrl="/images/rasel-rana.jpeg" />
                        </Grid>
                        <Grid item md={11} sm={11} xs={12}>
                            <Grid container>
                                <Grid item md={12} sm={12} xs={12}>
                                    <ProfileTG variant="h6"><strong>Rasel Rana</strong></ProfileTG>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <ChipStack direction="row" spacing={1}>
                                        <Chip label="Admin" />
                                        <DelegationFont variant="body2">Chief Technology Officer,LCP</DelegationFont>
                                    </ChipStack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AdminModGrid>
                    <AdminModGrid container spacing={2}>
                        <Grid item md={1} sm={1} xs={12}>
                            <ProfileLogo name="Md. Omor Faruk" imageUrl="/images/md-omor-faruk.jpeg" />
                        </Grid>
                        <Grid item md={11} sm={11} xs={12}>
                            <Grid container>
                                <Grid item md={12} sm={12} xs={12}>
                                    <ProfileTG variant="h6"><strong>Md. Omor Faruk</strong></ProfileTG>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <ChipStack direction="row" spacing={1}>
                                        <Chip label="Moderator" />
                                        <DelegationFont variant="body2">Student</DelegationFont>
                                    </ChipStack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AdminModGrid>
                    <SeeAllButton variant="outlined">See all</SeeAllButton>
                    <CustomDivider />
                    <CommonSpanList>
                        <CommonSpanTG variant="body1"><strong>Group Contributors:</strong></CommonSpanTG>
                        <CommonSpanTG variant="body1"><strong>1</strong></CommonSpanTG>
                    </CommonSpanList>
                    <GroupContributorGrid container spacing={2}>
                        <Grid item md={1} sm={1} xs={12}>
                            <ProfileLogo name="Ivdad Ahmed" imageUrl="/images/ivdad-ahmed.jpeg" />
                        </Grid>
                        <Grid item md={11} sm={11} xs={12}>
                            <Grid container>
                                <Grid item md={12} sm={12} xs={12}>
                                    <ProfileTG variant="h6"><strong>Ivdad Ahmed</strong></ProfileTG>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <ChipStack direction="row" spacing={1}>
                                        <Chip label="Group Contributor" />
                                        <DelegationFont variant="body2">Managing Director,LCP</DelegationFont>
                                    </ChipStack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </GroupContributorGrid>
                </CardContent>
            </PeopleCard>
        </>
    )
}

export default People