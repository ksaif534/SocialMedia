'use client'
import { Box, Grid, InputAdornment, Typography } from "@mui/material"
import { GroupAvatar, GroupDetailsWrapper, GroupIconButton, SidebarContentGrid, SidebarContentGridItem, SidebarContentHeaderGrid, SidebarContentHeaderGridItem, SidebarContentTG, SidebarDivider, SidebarExploreGrid, SidebarExploreGridItem, SidebarExploreIconButton, SidebarHeaderGrid, SidebarHeaderGridItem, SidebarIconButton, SidebarSearchGrid, SidebarSearchGridItem, SidebarSearchTextField, SidebarWrapper } from "./style"
import React, { useState, useEffect, createContext, useContext } from "react"
import GroupDetails from "../@groupDetails/page"
import Link from "next/link"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ExploreIcon from '@mui/icons-material/Explore'
import SettingsIcon from '@mui/icons-material/Settings'
import SearchIcon from '@mui/icons-material/Search'
import GroupInputModalForm from "./modal"
import fetchAllGroups from "./fetchAllGroups"
import searchGroup from "./searchGroup"

export const SidebarGroupsForUnitTesting = () => {
    return (
        <SidebarContentGrid container spacing={2}>
            <SidebarContentGridItem item md={2} sm={2} xs={12}>
                <Box>
                    <GroupAvatar alt="All about Business" src="images/Data Collection & Analytics.png" />
                </Box>
            </SidebarContentGridItem>
            <SidebarContentGridItem item md={8} sm={8} xs={12}>
                <Typography><strong>All about Business</strong></Typography>
            </SidebarContentGridItem>
            <SidebarContentGridItem item md={2} sm={2} xs={12}>
                <GroupIconButton>
                    <KeyboardArrowDownIcon fontSize="medium" />
                </GroupIconButton>
            </SidebarContentGridItem>
        </SidebarContentGrid>
    )
}

interface SearchGroupContextProps{
    srchGrp: Array<any>,
    setSrchGrp: (newSrchGrp: any) => void,
    srchGrpKey: string,
    setSrchGrpKey: (newSrchGrpKey: any) => void
}

export const SearchGroupContext = createContext<SearchGroupContextProps>({
    srchGrp: [],
    setSrchGrp: () => {},
    srchGrpKey: '',
    setSrchGrpKey: () => {}
})

const RootComp = () => {
    const [checkGrpDetails,setCheckGrpDetails] = useState(false);
    const [groups,setGroups] = useState([]);
    const [group,setGroup] = useState({ user_id: 0, name: '', description: '', status: 0, group_photo: null });
    const { srchGrp ,setSrchGrp, srchGrpKey , setSrchGrpKey } = useContext(SearchGroupContext);

    useEffect(() => {
        fetchAllGroups().then((groups: any) => setGroups(groups));
    },[])

    const handleSidebarExploreClick = () => {
    
    }
    
    const handleGroupClick = (group: any) => {
        setCheckGrpDetails(true);
        setGroup(group);
    }

    const handleSrchGrp = async (event: any) => {
        setSrchGrpKey(event.target.value);
        if (event.target.value !== '') {
            const srchGroup = await searchGroup(event.target.value);
            setSrchGrp(srchGroup);   
        }
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
                                onChange={handleSrchGrp}
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
                        <GroupInputModalForm />
                        <SidebarDivider />
                        <SidebarContentHeaderGrid container spacing={2}>
                            <SidebarContentHeaderGridItem item md={6} sm={6} xs={12}>
                                <Typography variant="h6"><strong>Groups</strong></Typography>
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
                        {
                            (srchGrpKey !== '') ? (
                                <>
                                    {
                                        (srchGrp.length > 0) ? (
                                            <>
                                                {
                                                    srchGrp.map((srchGroup: any) => {
                                                        return (
                                                            <SidebarContentGrid container spacing={2} onClick={() => handleGroupClick(srchGroup)} key={srchGroup.id}>
                                                                <SidebarContentGridItem item md={2} sm={2} xs={12}>
                                                                    <Box>
                                                                        <GroupAvatar alt={srchGroup.name} src={`images/${srchGroup.group_photo}`} />
                                                                    </Box>
                                                                </SidebarContentGridItem>
                                                                <SidebarContentGridItem item md={8} sm={8} xs={12}>
                                                                    <Typography><strong>{ srchGroup.name }</strong></Typography>
                                                                </SidebarContentGridItem>
                                                                <SidebarContentGridItem item md={2} sm={2} xs={12}>
                                                                    <GroupIconButton>
                                                                        <KeyboardArrowDownIcon fontSize="medium" />
                                                                    </GroupIconButton>
                                                                </SidebarContentGridItem>
                                                            </SidebarContentGrid>
                                                        )
                                                    })
                                                }
                                            </>
                                        ) : (
                                            <>
                                                <Typography variant="h6"><strong>Sorry, no groups available</strong></Typography>
                                            </>
                                        )
                                    }
                                </>
                            ) : (
                                <>
                                    {
                                        (groups.length < 5 && groups.length > 0) ? (
                                            <>
                                                {
                                                    groups.map((group: any) => {
                                                        return (
                                                            <SidebarContentGrid container spacing={2} onClick={() => handleGroupClick(group)} key={group.id}>
                                                                <SidebarContentGridItem item md={2} sm={2} xs={12}>
                                                                    <Box>
                                                                        <GroupAvatar alt={group.name} src={`images/${group.group_photo}`} />
                                                                    </Box>
                                                                </SidebarContentGridItem>
                                                                <SidebarContentGridItem item md={8} sm={8} xs={12}>
                                                                    <Typography><strong>{ group.name }</strong></Typography>
                                                                </SidebarContentGridItem>
                                                                <SidebarContentGridItem item md={2} sm={2} xs={12}>
                                                                    <GroupIconButton>
                                                                        <KeyboardArrowDownIcon fontSize="medium" />
                                                                    </GroupIconButton>
                                                                </SidebarContentGridItem>
                                                            </SidebarContentGrid>
                                                        )
                                                    })
                                                }
                                            </>
                                        ) : (
                                            <></>
                                        )
                                    }
                                </>
                            )
                        }
                    </SidebarWrapper>
                </Grid>
                <Grid item md={9} sm={6} xs={12}>
                    {
                        (checkGrpDetails) && (
                            <GroupDetailsWrapper>
                                <GroupDetails group={group} />        
                            </GroupDetailsWrapper>
                        )
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default RootComp