'use client'
import { CardContent, Chip, Grid, InputAdornment, Typography } from "@mui/material"
import { AdminModGrid, ChipStack, CommonSpanList, CommonSpanTG, CustomDivider, DelegationFont, GroupContributorGrid, PeopleCard, ProfileTG, SearchMemberTF, SeeAllButton } from "./style"
import ProfileLogo from "../../../home/@profileLogo/page"
import SearchIcon from '@mui/icons-material/Search'
import { useState, useEffect, createContext, useContext } from 'react'
import React from "react"
import fetchProfile from "../../../profile/@profileCoverHeading/fetchProfile"
import fetchProfiles from "./fetchProfiles"
import fetchSpecificGroupModerators from "./fetchSpecificGroupModerators"
import searchGroupModerators from "./searchGroupModerators"

export const PeopleCardForUnitTesting = () => {
    return (
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
                    <CommonSpanTG variant="body1"><strong>1</strong></CommonSpanTG>
                </CommonSpanList>
                <AdminModGrid container spacing={2}>
                    <Grid item md={1} sm={1} xs={12}>
                        <ProfileLogo name="Saif Kamal" imageUrl="images/saif.jpeg" />
                    </Grid>
                    <Grid item md={11} sm={11} xs={12}>
                        <Grid container>
                            <Grid item md={12} sm={12} xs={12}>
                                <ProfileTG variant="h6"><strong>Saif Kamal</strong></ProfileTG>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <ChipStack direction="row" spacing={1}>
                                    <Chip label="Admin" />
                                    <DelegationFont variant="body2">Businessman/Entrepreneur</DelegationFont>
                                </ChipStack>
                            </Grid>
                        </Grid>
                    </Grid>
                </AdminModGrid>
                <AdminModGrid container spacing={2}>
                    <Grid item md={1} sm={1} xs={12}>
                        <ProfileLogo name="Saif Kamal" imageUrl="images/eid-sk.jpeg" />
                    </Grid>
                    <Grid item md={11} sm={11} xs={12}>
                        <Grid container>
                            <Grid item md={12} sm={12} xs={12}>
                                <ProfileTG variant="h6"><strong>Saif Kamal</strong></ProfileTG>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <ChipStack direction="row" spacing={1}>
                                    <Chip label="Moderator" />
                                    <DelegationFont variant="body2">Businessman/Entrepreneur</DelegationFont>
                                </ChipStack>
                            </Grid>
                        </Grid>
                    </Grid>
                </AdminModGrid>
                <SeeAllButton variant="outlined">See all</SeeAllButton>
                <CustomDivider />
            </CardContent>
        </PeopleCard>
    )
}

interface SearchGroupModeratorsContextProps {
    srchGrpModerators: Array<any>,
    setSrchGrpModerators: (newSrchGrpMembers: any) => void,
    srchGrpModeratorKey: string,
    setSrchGrpModeratorKey: (newSrchGrpMemberKey: any) => void
}

export const SearchGroupModeratorsContext = createContext<SearchGroupModeratorsContextProps>({
    srchGrpModerators: [],
    setSrchGrpModerators: () => {},
    srchGrpModeratorKey: '',
    setSrchGrpModeratorKey: () => {}
})

const RootComp = (props: any) => {
    const { group } = props;
    const { srchGrpModeratorKey, setSrchGrpModeratorKey, srchGrpModerators , setSrchGrpModerators } = useContext(SearchGroupModeratorsContext);
    const [profile,setProfile] = useState({ user_id: 0, firstname: '', lastname: '', martial_status: 0, gender: 0, birthdate: null, education_level: 1, occupation: 1, country: 0, city: 0, address: '', profile_photo: null });
    const [profiles,setProfiles] = useState([]);
    const [specificGroupMods,setSpecificGroupMods] = useState([]);
    const [toggleModView,setToggleModView] = useState(false);

    useEffect(() => {
        fetchProfile(group?.user_id).then((profile: any) => setProfile(profile));
        fetchProfiles().then((profiles: any) => setProfiles(profiles));
        fetchSpecificGroupModerators(group?.id).then((specGroupMods: any) => {
            setSpecificGroupMods(specGroupMods);
        });
    },[group])

    const changeModView = () => {
        setToggleModView(!toggleModView);
    }

    const handleSearchGroupModeratorChange = async (event: any) => {
        setSrchGrpModeratorKey(event.target.value);
        if (event.target.value !== '') {
            const srchGrpMods = await searchGroupModerators(group?.user_id,event.target.value);
            setSrchGrpModerators(srchGrpMods);
        }
    }

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
                    onChange={handleSearchGroupModeratorChange}
                    />
                    <CustomDivider />
                    <CommonSpanList>
                        <CommonSpanTG variant="body1"><strong>Admins & Moderators:</strong></CommonSpanTG>
                        <CommonSpanTG variant="body1"><strong>{ specificGroupMods.length + 1 }</strong></CommonSpanTG>
                    </CommonSpanList>
                    <AdminModGrid container spacing={2}>
                        <Grid item md={1} sm={1} xs={12}>
                            <ProfileLogo name={group?.user?.name} imageUrl={group?.user?.image} />
                        </Grid>
                        <Grid item md={11} sm={11} xs={12}>
                            <Grid container>
                                <Grid item md={12} sm={12} xs={12}>
                                    <ProfileTG variant="h6"><strong>{ group?.user?.name }</strong></ProfileTG>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <ChipStack direction="row" spacing={1}>
                                        <Chip label="Admin" />
                                        <DelegationFont variant="body2">{ (profile.occupation == 1) ? 'Service Holder' : ((profile.occupation == 2) ? 'Businessman/Entrepreneur' : 'No Occupation') }</DelegationFont>
                                    </ChipStack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AdminModGrid>
                    {
                        (srchGrpModeratorKey !== '') ? (
                            <>
                                {
                                    (srchGrpModerators.length > 0) ? (
                                        <>
                                            {
                                                srchGrpModerators.map((groupModerator: any, index: number) => {
                                                    return (
                                                        <AdminModGrid container spacing={2} key={groupModerator.id}>
                                                            <Grid item md={1} sm={1} xs={12}>
                                                                <ProfileLogo name={groupModerator.user.name} imageUrl={groupModerator?.user?.image} />
                                                            </Grid>
                                                            <Grid item md={11} sm={11} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={12} sm={12} xs={12}>
                                                                        <ProfileTG variant="h6"><strong>{ groupModerator.user.name }</strong></ProfileTG>
                                                                    </Grid>
                                                                    <Grid item md={12} sm={12} xs={12}>
                                                                        {
                                                                            profiles.map((profile: any) => {
                                                                                if (profile.user_id == groupModerator.user_id) {
                                                                                    return (
                                                                                        <ChipStack direction="row" spacing={1} key={profile.id}>
                                                                                            <Chip label="Moderator" />
                                                                                            <DelegationFont variant="body2">{ (profile.occupation == 1) ? 'Service Holder' : ((profile.occupation == 2) ? 'Businessman/Entrepreneur' : 'No Occupation') }</DelegationFont>
                                                                                        </ChipStack>
                                                                                    )
                                                                                }
                                                                            })
                                                                        }
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </AdminModGrid>
                                                    )
                                                })
                                            }
                                        </>
                                    ) : (
                                        <>
                                            <Typography variant="h6" align="center"><strong>No Group Moderator with the name available</strong></Typography>
                                        </>
                                    )
                                }
                            </>
                        ) : (
                            <>
                                {
                                    (toggleModView == false) ? (
                                        <>
                                            {
                                                specificGroupMods.map((groupModerator: any, index: number) => {
                                                    if (index < 3) {
                                                        return (
                                                            <AdminModGrid container spacing={2} key={groupModerator.id}>
                                                                <Grid item md={1} sm={1} xs={12}>
                                                                    <ProfileLogo name={groupModerator.user.name} imageUrl={groupModerator?.user?.image} />
                                                                </Grid>
                                                                <Grid item md={11} sm={11} xs={12}>
                                                                    <Grid container>
                                                                        <Grid item md={12} sm={12} xs={12}>
                                                                            <ProfileTG variant="h6"><strong>{ groupModerator.user.name }</strong></ProfileTG>
                                                                        </Grid>
                                                                        <Grid item md={12} sm={12} xs={12}>
                                                                            {
                                                                                profiles.map((profile: any) => {
                                                                                    if (profile.user_id == groupModerator.user_id) {
                                                                                        return (
                                                                                            <ChipStack direction="row" spacing={1} key={profile.id}>
                                                                                                <Chip label="Moderator" />
                                                                                                <DelegationFont variant="body2">{ (profile.occupation == 1) ? 'Service Holder' : ((profile.occupation == 2) ? 'Businessman/Entrepreneur' : 'No Occupation') }</DelegationFont>
                                                                                            </ChipStack>
                                                                                        )
                                                                                    }
                                                                                })
                                                                            }
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </AdminModGrid>
                                                        )   
                                                    }
                                                })
                                            }
                                            <SeeAllButton variant="outlined" onClick={changeModView}>See all</SeeAllButton>
                                        </>
                                    ) : (
                                        <>
                                            {
                                                specificGroupMods.map((groupModerator: any,index: number) => {
                                                    return (
                                                        <AdminModGrid container spacing={2} key={groupModerator.id}>
                                                            <Grid item md={1} sm={1} xs={12}>
                                                                <ProfileLogo name={groupModerator.user.name} imageUrl={groupModerator?.user?.image} />
                                                            </Grid>
                                                            <Grid item md={11} sm={11} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={12} sm={12} xs={12}>
                                                                        <ProfileTG variant="h6"><strong>{ groupModerator.user.name }</strong></ProfileTG>
                                                                    </Grid>
                                                                    <Grid item md={12} sm={12} xs={12}>
                                                                        {
                                                                            profiles.map((profile: any) => {
                                                                                if (profile.user_id == groupModerator.user_id) {
                                                                                    return (
                                                                                        <ChipStack direction="row" spacing={1} key={profile.id}>
                                                                                            <Chip label="Moderator" />
                                                                                            <DelegationFont variant="body2">{ (profile.occupation == 1) ? 'Service Holder' : ((profile.occupation == 2) ? 'Businessman/Entrepreneur' : 'No Occupation') }</DelegationFont>
                                                                                        </ChipStack>
                                                                                    )
                                                                                }
                                                                            })
                                                                        }
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </AdminModGrid>
                                                    ) 
                                                })
                                            }
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                    <CustomDivider />
                    {/* <CommonSpanList>
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
                    </GroupContributorGrid> */}
                </CardContent>
            </PeopleCard>
        </>
    )
}

export default RootComp