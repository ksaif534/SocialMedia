'use client'
import { Grid } from "@mui/material";
import SearchContextLayout from "./@searchContextProvider/layout";

const RootHomeLayout = (props: any) => {
    const { navsidebar, posts, postInput, networkSidebar } = props;
    
    return (
        <SearchContextLayout>
            <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                    {navsidebar}
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={2} sm={12} xs={12}>

                </Grid>
                <Grid item md={7} sm={12} xs={12}>
                    <div style={{ marginTop: '5rem', marginBottom: '1rem' }}>
                        {postInput}
                    </div>
                    <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                        {posts}
                    </div>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                    <div style={{ marginTop: '5rem', marginBottom: '1rem' }}>
                        {networkSidebar}
                    </div>
                </Grid>
            </Grid>
        </SearchContextLayout>
    )
}

export default RootHomeLayout