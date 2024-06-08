'use client'
import { Grid } from "@mui/material";
import ProfileSearchContextLayout from "./@profileSearchContextProvider/layout";
import ProfileFriendsSearchContextLayout from "./@profileFriendsSearchContextProvider/layout";
import SearchProfFriendsTmpDirUserImagesContextProviderLayout from "./@searchProfFriendsTmpDirUserImagesContextProvider/layout";

const ProfileRootLayout = (props: any) => {
    const { navbar, profileCoverHeading } = props;
    return (
        <>
            <ProfileSearchContextLayout>
                <ProfileFriendsSearchContextLayout>
                    <SearchProfFriendsTmpDirUserImagesContextProviderLayout>
                        <Grid container spacing={2}>
                            <Grid item md={12} sm={12} xs={12}>
                                <div style={{ justifyContent: 'center' }}>
                                    {navbar}
                                </div>
                                <div style={{ marginTop: '20px', marginBottom: '20px', justifyContent: 'center' }}>
                                    {profileCoverHeading}
                                </div>
                            </Grid>
                        </Grid>
                    </SearchProfFriendsTmpDirUserImagesContextProviderLayout>
                </ProfileFriendsSearchContextLayout>
            </ProfileSearchContextLayout>
        </>
    )
}

export default ProfileRootLayout