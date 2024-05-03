'use client'
import { Grid } from "@mui/material";
import ProfileSearchContextLayout from "./@profileSearchContextProvider/layout";

const ProfileRootLayout = (props: any) => {
    const { navbar, profileCoverHeading, profileBody } = props;
    return (
        <>
            <ProfileSearchContextLayout>
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
            </ProfileSearchContextLayout>
        </>
    )
}

export default ProfileRootLayout