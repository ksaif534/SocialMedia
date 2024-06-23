import React from "react";
import RootComp from './root'

const ProfileBody = (props: any) => {
    const { profilePosts, profile , otherProfile, videoPosts , profileNetworks, acceptedProfileNetworks , recipientUser } = props;

    return (
        <>
            <RootComp profilePosts={profilePosts} profile={profile} profileNetworks={profileNetworks} otherProfile={otherProfile} videoPosts={videoPosts} acceptedProfileNetworks={acceptedProfileNetworks} recipientUser={recipientUser} />
        </>
    )
}

export default ProfileBody