'use client'
import React from "react";
import { Grid, Card, CardActions, CardMedia, IconButton, Avatar, Typography, Divider, Tabs, Tab, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import GroupsIcon from '@mui/icons-material/Groups';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const ProfileCoverHeadingGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(8)
}))

const ProfileCoverHeadingCard = styled(Card)(({theme}) => ({
    borderRadius: theme.spacing(1)
}))

const ProfileGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(-5),
    marginBottom: theme.spacing(2),
    textAlign: 'center'
}))

const ProfileEditIconButton = styled(IconButton)(({theme}) => ({
    borderRadius: theme.spacing(5),
    backgroundColor: '#ffffff',
    border: '2px solid #808080',
    color: '#000000',
    '&:hover': {
        backgroundColor: '#d3d3d3'
    }
}))

const ProfileImageGridItem = styled(Grid)(({theme}) => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

const RoundedAvatar = styled(Avatar)(({theme}) => ({
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

const ProfileHeadersGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(2)
}))

const ProfileTitleGrid = styled(Grid)(({theme}) => ({
    marginLeft: theme.spacing(-5),
    [theme.breakpoints.down('md')]: {
        marginLeft: theme.spacing(0)
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(0)
    }
}))

const ProfileTitleTG = styled(Typography)(({theme}) => ({
    textColor: '#ffffff',
}))

const ProfileSubTitleTG = styled(Typography)(({theme}) => ({
    marginLeft: theme.spacing(2),
    textColor: '#ffffff',
}))

const RoundedFirstSmallAvatar = styled(Avatar)(({theme}) => ({
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

const RoundedSmallAvatar = styled(Avatar)(({theme}) => ({
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

const ProfileTabBox = styled(Box)(() => ({
    borderBottom: 1,
    borderColor: 'divider'
}))

const ProfileTabs = styled(Tabs)(({theme}) => ({
    backgroundColor: '#00ffff',
    borderRadius: theme.spacing(1),
}))

const MoreIconButtons = styled(IconButton)(({theme}) => ({
    backgroundColor: '#ffffff',
    color: '#000000',
    borderRadius: theme.spacing(5),
    border: '2px solid #808080',
    '&:hover': {
        backgroundColor: '#d3d3d3'
    }
}))

const CustomProfileTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value != index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {
                value == index && (
                    <Box sx={{ p:3 }}>
                        {children}
                    </Box>
                )
            }
        </div>
    )
}

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    }
}

const ProfileCoverHeading = () => {
    const [value, setValue] = React.useState(0);
    const handleProfileTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }
    return (
        <ProfileCoverHeadingGrid container spacing={2}>
            <Grid item md={2} sm={12} xs={12}></Grid>
            <Grid item md={8} sm={12} xs={12}>
                <ProfileCoverHeadingCard>
                    <CardMedia image="/images/blueish-bg.jpeg" title="Beautiful Background" sx={{ height: 250 }} />
                    <CardActions sx={{ justifyContent: 'right' }}>
                        <ProfileEditIconButton aria-label="Edit" title="Edit Cover Photo">
                            <Typography variant="h6">Edit Cover Photo</Typography>
                            <EditIcon fontSize="large" />
                        </ProfileEditIconButton>
                    </CardActions>
                </ProfileCoverHeadingCard>
                <ProfileGrid container spacing={2}>
                    <Grid item md={1} sm={12} xs={12}></Grid>
                    <ProfileImageGridItem item md={1} sm={12} xs={12}>
                        <RoundedAvatar alt="Profile Image" src="/images/saif.jpeg" />
                    </ProfileImageGridItem>
                    <Grid item md={10} sm={12} xs={12}>
                        <ProfileHeadersGrid container spacing={2}>
                            <Grid item md={1} sm={12} xs={12}></Grid>
                            <ProfileTitleGrid item md={3} sm={12} xs={12}>
                                <ProfileTitleTG variant="h4">
                                    <strong>Saif Kamal</strong>
                                </ProfileTitleTG>
                            </ProfileTitleGrid>
                            <Grid item md={3} sm={12} xs={12}>
                                <ProfileSubTitleTG variant="h6">
                                    500 Friends
                                </ProfileSubTitleTG>
                                <span style={{ display:'flex', justifyContent: 'center'}}>
                                    <RoundedFirstSmallAvatar alt="Profile Image" src="/images/ivdad-ahmed.jpeg">

                                    </RoundedFirstSmallAvatar>
                                    <RoundedSmallAvatar alt="Profile Image" src="/images/safat-shahin.jpeg">

                                    </RoundedSmallAvatar>
                                    <RoundedSmallAvatar alt="Profile Image" src="/images/nayeem-ahmad.jpeg">

                                    </RoundedSmallAvatar>
                                </span>
                            </Grid>
                            <Grid item md={1} sm={12} xs={12}></Grid>
                            <Grid item md={4} sm={12} xs={12}>
                                <ProfileEditIconButton aria-label="Edit Profile" title="Edit Profile (Heading)">
                                    <Typography variant="h6">
                                        Edit Profile
                                    </Typography>
                                    <EditIcon fontSize="large" />
                                </ProfileEditIconButton>
                            </Grid>
                        </ProfileHeadersGrid>
                    </Grid>
                </ProfileGrid>
                <Box sx={{ width: '100%' }}>
                    <ProfileTabBox>
                        <ProfileTabs value={value} onChange={handleProfileTabChange} aria-label="basic profile tabs">
                            <Tab label="Posts" {...a11yProps(0)} />
                            <Tab label="Friends" {...a11yProps(1)} />
                            <Tab label="Photos" {...a11yProps(2)} />
                            <Tab label="Videos" {...a11yProps(3)} />
                            <Tab label={<MoreHorizIcon fontSize="large" />} {...a11yProps(4)} />
                        </ProfileTabs>
                    </ProfileTabBox>
                    <CustomProfileTabPanel value={value} index={0}>
                        <Typography variant="h6">
                            Item 1
                        </Typography>
                    </CustomProfileTabPanel>
                    <CustomProfileTabPanel value={value} index={1}>
                        <Typography variant="h6">
                            Item 2
                        </Typography>
                    </CustomProfileTabPanel>
                    <CustomProfileTabPanel value={value} index={2}>
                        <Typography variant="h6">
                            Item 3
                        </Typography>
                    </CustomProfileTabPanel>
                    <CustomProfileTabPanel value={value} index={3}>
                        <Typography variant="h6">
                            Item 4
                        </Typography>
                    </CustomProfileTabPanel>
                    <CustomProfileTabPanel value={value} index={4}>
                        <Grid container spacing={2}>
                            <Grid item md={3} sm={3} xs={3}>
                                <MoreIconButtons aria-label="Search Profile" title="Search Profile Data">
                                    <SearchIcon fontSize="large" />
                                    <Typography variant="h6">
                                        Search Profile
                                    </Typography>
                                </MoreIconButtons>
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <MoreIconButtons aria-label="Profile Settings" title="Configure Profile">
                                    <SettingsIcon fontSize="large" />
                                    <Typography variant="h6">
                                        Profile Settings
                                    </Typography>
                                </MoreIconButtons>
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <MoreIconButtons aria-label="Like" title="Like Profile Data">
                                    <ThumbUpIcon fontSize="large" />
                                    <Typography variant="h6">
                                        Like Profile
                                    </Typography>
                                </MoreIconButtons>
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <MoreIconButtons aria-label="Groups" title="Groups Profile Data">
                                    <GroupsIcon fontSize="large" />
                                    <Typography variant="h6">
                                        Groups
                                    </Typography>
                                </MoreIconButtons>
                            </Grid>
                        </Grid>
                    </CustomProfileTabPanel>
                    <Divider color="text.secondary" />
                </Box>
            </Grid>
            <Grid item md={2} sm={12} xs={12}></Grid>
        </ProfileCoverHeadingGrid>
    )
}

export default ProfileCoverHeading