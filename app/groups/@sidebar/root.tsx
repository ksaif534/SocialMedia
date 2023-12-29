'use client'
import { Box, Grid, InputAdornment, Typography } from "@mui/material"
import { CreateGroupButton, GroupAvatar, GroupDetailsWrapper, GroupIconButton, SidebarContentGrid, SidebarContentGridItem, SidebarContentHeaderGrid, SidebarContentHeaderGridItem, SidebarContentTG, SidebarDivider, SidebarExploreGrid, SidebarExploreGridItem, SidebarExploreIconButton, SidebarHeaderGrid, SidebarHeaderGridItem, SidebarIconButton, SidebarSearchGrid, SidebarSearchGridItem, SidebarSearchTextField, SidebarWrapper } from "./style"
import React, { useState } from "react"
import GroupDetails from "../@groupDetails/page"
import Link from "next/link"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ExploreIcon from '@mui/icons-material/Explore'
import AddIcon from '@mui/icons-material/Add'
import SettingsIcon from '@mui/icons-material/Settings'
import SearchIcon from '@mui/icons-material/Search'

const RootComp = () => {
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

export default RootComp