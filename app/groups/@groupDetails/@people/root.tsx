'use client'
import { CardContent, Chip, Grid, InputAdornment } from "@mui/material"
import { AdminModGrid, ChipStack, CommonSpanList, CommonSpanTG, CustomDivider, DelegationFont, GroupContributorGrid, PeopleCard, ProfileTG, SearchMemberTF, SeeAllButton } from "./style"
import ProfileLogo from "@/app/home/@profileLogo/page"
import SearchIcon from '@mui/icons-material/Search'

const RootComp = () => {
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

export default RootComp