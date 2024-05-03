'use client'
import { Grid } from "@mui/material"
import GroupPostSearchContextLayout from "./@searchGroupPostsProvider/layout";
import GroupSearchContextLayout from "./@searchGroupProvider/layout";

const RootGroupLayout = (props: any) => {
    const { navbar, sidebar } = props;

    return (
        <GroupSearchContextLayout>
            <GroupPostSearchContextLayout>
                <Grid container spacing={2}>
                    <Grid item md={12} sm={12} xs={12}>
                        <div style={{ justifyContent: 'center' }}>
                            {navbar}
                            {sidebar}
                        </div>
                    </Grid>
                </Grid>
            </GroupPostSearchContextLayout>
        </GroupSearchContextLayout>
    )
}

export default RootGroupLayout