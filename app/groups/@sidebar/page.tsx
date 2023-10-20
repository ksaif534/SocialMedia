'use client'
import { Avatar, Box, Button, Divider, Grid, IconButton, InputAdornment, TextField, Typography, styled } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings'
import SearchIcon from '@mui/icons-material/Search'
import React, { useState } from "react";
import Link from "next/link";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import GroupDetails from "../@groupDetails/page";

const SidebarWrapper = styled('div')(({theme}) => ({
    height: '100vh',
    backgroundColor: 'rgba(36,37,38,1.0)',
    overflowY: 'auto',
}))

const SidebarHeaderGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
        marginLeft: theme.spacing(0)
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(0)
    }
}))

const SidebarHeaderGridItem = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))

const SidebarIconButton = styled(IconButton)(({theme}) => ({
    color: '#ffffff',
    backgroundColor: 'rgba(128,128,128,0.8)',
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.5)'
    },
}))

const SidebarSearchGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1)
}))

const SidebarSearchGridItem = styled(Grid)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))

const SidebarSearchTextField = styled(TextField)(({theme}) => ({
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

const SidebarExploreGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.3)',
        borderRadius: theme.spacing(1),
    }
}))

const SidebarExploreGridItem = styled(Grid)(({theme}) => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

const SidebarExploreIconButton = styled(IconButton)(({
    backgroundColor: 'rgba(128,128,128,0.5)',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.3)'
    }
}))

const SidebarDivider = styled(Divider)(({theme}) => ({
    marginTop: theme.spacing(4),
    backgroundColor: '#ffffff'
}))

const CreateGroupButton = styled(Button)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
    width: '88%'
}))

const SidebarContentHeaderGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(2)
}))

const SidebarContentHeaderGridItem = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))

const SidebarContentTG = styled(Typography)(({theme}) => ({
    '&:hover': {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        borderRadius: theme.spacing(2),
        backgroundColor: 'rgba(128,128,128,0.3)',
    }
}))

const SidebarContentGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.3)'
    },
    borderRadius: theme.spacing(1),
}))

const SidebarContentGridItem = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))

const GroupAvatar = styled(Avatar)(({theme}) => ({
    borderRadius: theme.spacing(1)
}))

const GroupIconButton = styled(IconButton)(() => ({
    backgroundColor: 'rgba(128,128,128,0.5)',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: 'rgba(128,128,128,0.3)'
    }
}))

const GroupDetailsWrapper = styled('div')(({theme}) => ({
    marginTop: theme.spacing(10),
    backgroundColor: 'inherit',
}))

const Sidebar = () => {
    const [checkGrpDetails,setCheckGrpDetails] = useState(false);

    const handleSidebarExploreClick = () => {
    
    }
    
    const handleGroupClick = () => {
        setCheckGrpDetails(true);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={3} sm={6} xs={12}>
                    <SidebarWrapper>
                        <SidebarHeaderGrid container spacing={2}>
                            <SidebarHeaderGridItem item md={4} sm={4} xs={12}>
                                <Typography variant="h5"><strong>Groups</strong></Typography>
                            </SidebarHeaderGridItem>
                            <SidebarHeaderGridItem item md={5} sm={5} xs={12}>

                            </SidebarHeaderGridItem>
                            <SidebarHeaderGridItem item md={3} sm={3} xs={12}>
                                <SidebarIconButton>
                                    <SettingsIcon fontSize="medium" />
                                </SidebarIconButton>
                            </SidebarHeaderGridItem>
                        </SidebarHeaderGrid>
                        <SidebarSearchGrid container spacing={2}>
                            <SidebarSearchGridItem item md={12} sm={12} xs={12}>
                                <SidebarSearchTextField 
                                variant="outlined" 
                                placeholder="Search Groups" 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="medium" />
                                        </InputAdornment>
                                    ),
                                }}
                                />
                            </SidebarSearchGridItem>
                        </SidebarSearchGrid>
                        <SidebarExploreGrid container spacing={2} onClick={handleSidebarExploreClick}>
                            <SidebarExploreGridItem item md={2} sm={2} xs={12}>
                                <SidebarExploreIconButton>
                                    <ExploreIcon fontSize="medium" />
                                </SidebarExploreIconButton>
                            </SidebarExploreGridItem>
                            <SidebarExploreGridItem item md={5} sm={5} xs={12}>
                                <Typography><strong>Explore Groups</strong></Typography>
                            </SidebarExploreGridItem>
                            <SidebarExploreGridItem item md={5} sm={5} xs={12}>

                            </SidebarExploreGridItem>
                        </SidebarExploreGrid>
                        <CreateGroupButton variant="outlined">
                            <AddIcon fontSize="medium" />
                            Create New Group
                        </CreateGroupButton>
                        <SidebarDivider />
                        <SidebarContentHeaderGrid container spacing={2}>
                            <SidebarContentHeaderGridItem item md={6} sm={6} xs={12}>
                                <Typography variant="h6"><strong>Joined Groups</strong></Typography>
                            </SidebarContentHeaderGridItem>
                            <SidebarContentGridItem item md={3} sm={3} xs={12}>

                            </SidebarContentGridItem>
                            <SidebarContentHeaderGridItem item md={3} sm={3} xs={12}>
                                <Box
                                sx={{
                                    typography: 'body1',
                                    '& > :not(style) ~ :not(style)': {
                                    ml: 2,
                                    },
                                }}
                                >
                                    <Link href="#">
                                        <SidebarContentTG color="primary">see all</SidebarContentTG>
                                    </Link>
                                </Box>
                            </SidebarContentHeaderGridItem>
                        </SidebarContentHeaderGrid>
                        <SidebarContentGrid container spacing={2} onClick={handleGroupClick}>
                            <SidebarContentGridItem item md={2} sm={2} xs={12}>
                                <Box>
                                    <GroupAvatar alt="Circular Teaching System" src="/images/circular-teaching-system.jpeg" />
                                </Box>
                            </SidebarContentGridItem>
                            <SidebarContentGridItem item md={8} sm={8} xs={12}>
                                <Typography><strong>Circular Teaching System</strong></Typography>
                            </SidebarContentGridItem>
                            <SidebarContentGridItem item md={2} sm={2} xs={12}>
                                <GroupIconButton>
                                    <KeyboardArrowDownIcon fontSize="medium" />
                                </GroupIconButton>
                            </SidebarContentGridItem>
                        </SidebarContentGrid>
                        <SidebarContentGrid container spacing={2} onClick={handleGroupClick}>
                            <SidebarContentGridItem item md={2} sm={2} xs={12}>
                                <Box>
                                    <GroupAvatar alt="DevOps Engineers Bangladesh" src="/images/devops-bd.jpeg" />
                                </Box>
                            </SidebarContentGridItem>
                            <SidebarContentGridItem item md={8} sm={8} xs={12}>
                                <Typography><strong>DevOps Engineers BD</strong></Typography>
                            </SidebarContentGridItem>
                            <SidebarContentGridItem item md={2} sm={2} xs={12}>
                                <GroupIconButton>
                                    <KeyboardArrowDownIcon fontSize="medium" />
                                </GroupIconButton>
                            </SidebarContentGridItem>
                        </SidebarContentGrid>
                        <SidebarContentGrid container spacing={2} onClick={handleGroupClick}>
                            <SidebarContentGridItem item md={2} sm={2} xs={12}>
                                <Box>
                                    <GroupAvatar alt="SubcriptionPro" src="/images/subscription-pro.jpeg" />
                                </Box>
                            </SidebarContentGridItem>
                            <SidebarContentGridItem item md={8} sm={8} xs={12}>
                                <Typography><strong>Subcription Pro</strong></Typography>
                            </SidebarContentGridItem>
                            <SidebarContentGridItem item md={2} sm={2} xs={12}>
                                <GroupIconButton>
                                    <KeyboardArrowDownIcon fontSize="medium" />
                                </GroupIconButton>
                            </SidebarContentGridItem>
                        </SidebarContentGrid>
                    </SidebarWrapper>
                </Grid>
                <Grid item md={9} sm={6} xs={12}>
                    {
                        (checkGrpDetails) && (
                            <GroupDetailsWrapper>
                                <GroupDetails />        
                            </GroupDetailsWrapper>
                        )
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default Sidebar