import React from "react";
import RootComp from './root'

const ProfileBody = (props: any) => {
    const { profilePosts, profile , otherProfile, videoPosts , profileNetworks } = props;

    return (
        <>
            <RootComp profilePosts={profilePosts} profile={profile} profileNetworks={profileNetworks} otherProfile={otherProfile} videoPosts={videoPosts} />
        </>
    )
}

export default ProfileBody