import React from "react";
import RootComp from './root'

const ProfileBody = (props: any) => {
    const { profilePosts, otherProfile, videoPosts, profileNetworks } = props;

    return (
        <>
            <RootComp profilePosts={profilePosts} otherProfile={otherProfile} videoPosts={videoPosts} profileNetworks={profileNetworks} />
        </>
    )
}

export default ProfileBody