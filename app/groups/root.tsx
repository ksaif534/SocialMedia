'use client'
import { Grid } from "@mui/material"
import GroupPostSearchContextLayout from "./@searchGroupPostsProvider/layout";
import GroupSearchContextLayout from "./@searchGroupProvider/layout";
import GroupModeratorSearchContextLayout from "./@searchGroupModeratorsProvider/layout";
import SearchGroupPostsThumbnailsContextProviderLayout from "./@searchGroupPostsTmpDirThumbnailsContextProvider/layout";
import SearchGroupPostsTmpDirFiguresContextProviderLayout from "./@searchGroupPostsTmpDirFiguresContextProvider/layout";
import SearchGroupPostsCommentsTmpDirUserImagesContextProviderLayout from "./@searchGroupPostsCommentsTmpDirUserImagesContextProvider/layout";
import SearchGroupPostsTmpDirUserImagesContextProviderLayout from "./@searchGroupPostsTmpDirUserImagesContextProvider/layout";
import GroupUserImageContextProviderLayout from "./@groupDetails/@people/@groupUserImageContextProvider/layout";
import GroupPhotosTmpDirContextProviderLayout from "./@groupDetails/@groupPhotoTmpDirContextProvider/layout";

const RootGroupLayout = (props: any) => {
    const { navbar, sidebar } = props;

    return (
        <GroupSearchContextLayout>
            <GroupPostSearchContextLayout>
                <GroupModeratorSearchContextLayout>
                    <SearchGroupPostsThumbnailsContextProviderLayout>
                        <SearchGroupPostsTmpDirFiguresContextProviderLayout>
                            <SearchGroupPostsCommentsTmpDirUserImagesContextProviderLayout>
                                <SearchGroupPostsTmpDirUserImagesContextProviderLayout>
                                    <GroupUserImageContextProviderLayout>
                                        <GroupPhotosTmpDirContextProviderLayout>
                                            <Grid container spacing={2}>
                                                <Grid item md={12} sm={12} xs={12}>
                                                    <div style={{ justifyContent: 'center' }}>
                                                        {navbar}
                                                        {sidebar}
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </GroupPhotosTmpDirContextProviderLayout>
                                    </GroupUserImageContextProviderLayout>
                                </SearchGroupPostsTmpDirUserImagesContextProviderLayout>
                            </SearchGroupPostsCommentsTmpDirUserImagesContextProviderLayout>
                        </SearchGroupPostsTmpDirFiguresContextProviderLayout>
                    </SearchGroupPostsThumbnailsContextProviderLayout>
                </GroupModeratorSearchContextLayout>
            </GroupPostSearchContextLayout>
        </GroupSearchContextLayout>
    )
}

export default RootGroupLayout