
import React from "react";
import RootComp from './root'

const ProfileFriends = (props: any) => {
    const { updateProfile, acceptedProfileNetworks, profile, recipientUser } = props;

    return (
        <>
            <RootComp updateProfile={updateProfile} acceptedProfileNetworks={acceptedProfileNetworks} profile={profile} recipientUser={recipientUser} />
        </>
    )
}

export default ProfileFriends