
import React from "react";
import RootComp from './root'

const ProfileFriends = (props: any) => {
    const { updateProfile, acceptedProfileNetworks, tmpDirAcceptedProfileNetworkUserImages , profile, recipientUser } = props;

    return (
        <>
            <RootComp updateProfile={updateProfile} acceptedProfileNetworks={acceptedProfileNetworks} tmpDirAcceptedProfileNetworkUserImages={tmpDirAcceptedProfileNetworkUserImages} profile={profile} recipientUser={recipientUser} />
        </>
    )
}

export default ProfileFriends