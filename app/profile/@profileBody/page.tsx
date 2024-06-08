import React from "react";
import RootComp from './root'

const ProfileBody = (props: any) => {
    const { profilePosts, profile , otherProfile, videoPosts , profileNetworks, acceptedProfileNetworks, tmpDirAcceptedProfileNetworkUserImages , recipientUser, profilePostsTmpDirUserImages, profilePostsTmpDirFigures, profilePostsCommentsTmpDirUserImages, videoPostsTmpDirUserImages, videoPostsTmpDirFigures, videoPostsCommentsTmpDirUserImages } = props;

    return (
        <>
            <RootComp profilePosts={profilePosts} profilePostsTmpDirUserImages={profilePostsTmpDirUserImages} profilePostsTmpDirFigures={profilePostsTmpDirFigures} profilePostsCommentsTmpDirUserImages={profilePostsCommentsTmpDirUserImages} videoPostsTmpDirUserImages={videoPostsTmpDirUserImages} videoPostsTmpDirFigures={videoPostsTmpDirFigures} videoPostsCommentsTmpDirUserImages={videoPostsCommentsTmpDirUserImages} profile={profile} profileNetworks={profileNetworks} otherProfile={otherProfile} videoPosts={videoPosts} acceptedProfileNetworks={acceptedProfileNetworks} tmpDirAcceptedProfileNetworkUserImages={tmpDirAcceptedProfileNetworkUserImages} recipientUser={recipientUser} />
        </>
    )
}

export default ProfileBody