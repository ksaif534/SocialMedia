import React from "react";
import RootComp from './root'

const ProfileFriends = (props: any) => {
    const { profileNetworks, updateProfile, acceptedProfileNetworks, profile } = props;

    return (
        <>
            <RootComp profileNetworks={profileNetworks} updateProfile={updateProfile} acceptedProfileNetworks={acceptedProfileNetworks} profile={profile} />
        </>
    )
}

export default ProfileFriends