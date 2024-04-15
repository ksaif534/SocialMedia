'use client'
import { CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { FriendCard, FriendCardButton, FriendGrid } from "./style";
import { useState,useEffect } from "react";
import fetchOtherProfiles from "@/app/profile/@profileCoverHeading/fetchOtherProfiles";
import fetchAllProfileNetworks from "@/app/profile/@profileCoverHeading/fetchAllProfileNetworks";
import fetchProfileNetworks from "@/app/profile/@profileCoverHeading/fetchProfileNetworks";
import fetchTotalNetworks from './fetchTotalNetworks'

const RootComp = () => {
    const [otherProfiles,setOtherProfiles] = useState([]);
    const [allProfileNetworks,setAllProfileNetworks] = useState([]);
    const [profileNetworks,setProfileNetworks] = useState([]);
    const [totalNetworks,setTotalNetworks] = useState([]);
    let indexCounterArr: any;
    let indexCounterArr2: any;
    let networksCounterArr: any;

    useEffect(() => {
        fetchOtherProfiles(sessionStorage.getItem("authUserId")).then((otherProfiles: any) => setOtherProfiles(otherProfiles));
        fetchAllProfileNetworks(sessionStorage.getItem("authUserId")).then((allProfileNetworks: any) => setAllProfileNetworks(allProfileNetworks));
        fetchProfileNetworks(sessionStorage.getItem("authUserId")).then((profileNetworks: any) => setProfileNetworks(profileNetworks));
        fetchTotalNetworks().then((totalNetworks: any) => setTotalNetworks(totalNetworks));
    },[])

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={1} sm={1} xs={12}>

                </Grid>
                <Grid item md={10} sm={10} xs={12}>
                    <FriendGrid container spacing={2}>
                        {
                            otherProfiles?.map((otherProfile: any) => {
                                indexCounterArr = [];
                                indexCounterArr2 = [];
                                networksCounterArr = [];
                                return (
                                    <Grid item md={4} sm={4} xs={12} key={otherProfile.id}>
                                        <FriendCard>
                                            <CardMedia component='img' height="150" image={`images/${otherProfile?.user?.image}`} />
                                            <CardContent>
                                                <Typography variant="h6" align="center">
                                                    <strong>{ otherProfile?.user?.name }</strong>
                                                </Typography>
                                                {
                                                    totalNetworks.map((totalNetwork: any,totalNetworkIndex: number) => {
                                                        if (totalNetwork.status == 1) {
                                                            if (totalNetwork.user_id_from == otherProfile.user_id || totalNetwork.user_id_to == otherProfile.user_id) {
                                                                networksCounterArr.push(totalNetwork);
                                                            }
                                                            if (totalNetworkIndex == totalNetworks.length - 1) {
                                                                return (
                                                                    <Typography variant="body2" align="center" key={totalNetwork.id}>
                                                                        { networksCounterArr.length } Friend(s)
                                                                    </Typography>
                                                                )
                                                            }   
                                                        }
                                                    })
                                                }
                                                {
                                                    (profileNetworks?.length == 0) ? (
                                                        <>
                                                            {
                                                                (allProfileNetworks.length > 0) ? (
                                                                    <>
                                                                        {
                                                                            allProfileNetworks?.map((allProfileNetwork: any,index: number) => {
                                                                                if ((allProfileNetwork.user_id_from == sessionStorage.getItem("authUserId") || allProfileNetwork.user_id_from == otherProfile.user_id) && (allProfileNetwork.user_id_to == sessionStorage.getItem("authUserId") || allProfileNetwork.user_id_to == otherProfile.user_id)) {
                                                                                    indexCounterArr.push(index);
                                                                                    if (allProfileNetwork.status == 2) {
                                                                                        if (allProfileNetwork.user_id_from == sessionStorage.getItem("authUserId")) {
                                                                                            return (
                                                                                                <div key={allProfileNetwork.id}>
                                                                                                    <FriendCardButton variant="contained" color="success">
                                                                                                        <Typography variant="body2" align="center">
                                                                                                            Friend Request Sent
                                                                                                        </Typography>
                                                                                                    </FriendCardButton>
                                                                                                    <FriendCardButton variant="contained" color="warning">
                                                                                                        <Typography variant="body2" align="center">
                                                                                                            Undo
                                                                                                        </Typography>
                                                                                                    </FriendCardButton>
                                                                                                </div>
                                                                                            )
                                                                                        }else{
                                                                                            if (allProfileNetwork.user_id_to == sessionStorage.getItem("authUserId")) {
                                                                                                return (
                                                                                                    <div key={allProfileNetwork.id}>
                                                                                                        <FriendCardButton variant="contained" color="success">
                                                                                                            <Typography variant="body2" align="center">
                                                                                                                Accept Friend Request
                                                                                                            </Typography>
                                                                                                        </FriendCardButton>
                                                                                                        <FriendCardButton variant="contained" color="warning">
                                                                                                            <Typography variant="body2" align="center">
                                                                                                                Ignore
                                                                                                            </Typography>
                                                                                                        </FriendCardButton>
                                                                                                    </div>
                                                                                                )
                                                                                            }else{
                                                                                                return (
                                                                                                    <div key={allProfileNetwork.id}>
                                                                                                        <FriendCardButton variant="contained" color="success">
                                                                                                            <Typography variant="body2" align="center">
                                                                                                                Add Friend
                                                                                                            </Typography>
                                                                                                        </FriendCardButton>
                                                                                                        <FriendCardButton variant="contained" color="warning">
                                                                                                            <Typography variant="body2" align="center">
                                                                                                                Remove
                                                                                                            </Typography>
                                                                                                        </FriendCardButton>
                                                                                                    </div>
                                                                                                )
                                                                                            }
                                                                                        }
                                                                                    }else{
                                                                                        if (allProfileNetwork.status == 1) {
                                                                                            if (allProfileNetwork.user_id_from == sessionStorage.getItem("authUserId") || allProfileNetwork.user_id_to == sessionStorage.getItem("authUserId")) {
                                                                                                return (
                                                                                                    <div key={allProfileNetwork.id}>
                                                                                                        <FriendCardButton variant="contained" color="success">
                                                                                                            <Typography variant="body2" align="center">
                                                                                                                Friends
                                                                                                            </Typography>
                                                                                                        </FriendCardButton>
                                                                                                    </div>
                                                                                                )
                                                                                            }else{
            
                                                                                            }
                                                                                        }else{
                                                                                            return (
                                                                                                <div key={allProfileNetwork.id}>
                                                                                                    <FriendCardButton variant="contained" color="success">
                                                                                                        <Typography variant="body2" align="center">
                                                                                                            Add Friend
                                                                                                        </Typography>
                                                                                                    </FriendCardButton>
                                                                                                    <FriendCardButton variant="contained" color="warning">
                                                                                                        <Typography variant="body2" align="center">
                                                                                                            Remove
                                                                                                        </Typography>
                                                                                                    </FriendCardButton>
                                                                                                </div>
                                                                                            )
                                                                                        }
                                                                                    }
                                                                                }else{
                                                                                    indexCounterArr2.push(index);
                                                                                    if (index == allProfileNetworks.length - 1) {
                                                                                        if (indexCounterArr.length == 0) {
                                                                                            return (
                                                                                                <div key={allProfileNetwork.id}>
                                                                                                    <FriendCardButton variant="contained" color="success">
                                                                                                        <Typography variant="body2" align="center">
                                                                                                            Add Friend
                                                                                                        </Typography>
                                                                                                    </FriendCardButton>
                                                                                                    <FriendCardButton variant="contained" color="warning">
                                                                                                        <Typography variant="body2" align="center">
                                                                                                            Remove
                                                                                                        </Typography>
                                                                                                    </FriendCardButton>
                                                                                                </div>
                                                                                            )
                                                                                        }   
                                                                                    }else{

                                                                                    }
                                                                                }
                                                                            })
                                                                        }
                                                                    </>
                                                                ) : (
                                                                    <div key={otherProfile.id}>
                                                                        <FriendCardButton variant="contained" color="success">
                                                                            <Typography variant="body2" align="center">
                                                                                Add Friend
                                                                            </Typography>
                                                                        </FriendCardButton>
                                                                        <FriendCardButton variant="contained" color="warning">
                                                                            <Typography variant="body2" align="center">
                                                                                Remove
                                                                            </Typography>
                                                                        </FriendCardButton>
                                                                    </div>
                                                                )
                                                            }
                                                        </>
                                                    ) : (
                                                        <>
                                                            {
                                                                profileNetworks.map((profileNetwork: any,index: number) => {
                                                                    const acceptedNetworks = allProfileNetworks.filter((allProfileNetwork: any) => (allProfileNetwork.user_id_from == sessionStorage.getItem("authUserId") || allProfileNetwork.user_id_from == otherProfile.user_id) && (allProfileNetwork.user_id_to == sessionStorage.getItem("authUserId") || allProfileNetwork.user_id_to == otherProfile.user_id));
                                                                    if (acceptedNetworks.length > 0) {
                                                                        return acceptedNetworks?.map((acceptedNetwork: any) => {
                                                                            if (acceptedNetwork.status == 2) {
                                                                                if (acceptedNetwork.user_id_from == sessionStorage.getItem("authUserId")) {
                                                                                    return (
                                                                                        <div key={acceptedNetwork.id}>
                                                                                            <FriendCardButton variant="contained" color="success">
                                                                                                <Typography variant="body2" align="center">
                                                                                                    Friend Request Sent
                                                                                                </Typography>
                                                                                            </FriendCardButton>
                                                                                            <FriendCardButton variant="contained" color="warning">
                                                                                                <Typography variant="body2" align="center">
                                                                                                    Undo
                                                                                                </Typography>
                                                                                            </FriendCardButton>
                                                                                        </div>
                                                                                    )
                                                                                }else{
                                                                                    if (acceptedNetwork.user_id_to == sessionStorage.getItem("authUserId")) {
                                                                                        return (
                                                                                            <div key={acceptedNetwork.id}>
                                                                                                <FriendCardButton variant="contained" color="success">
                                                                                                    <Typography variant="body2" align="center">
                                                                                                        Accept Friend Request
                                                                                                    </Typography>
                                                                                                </FriendCardButton>
                                                                                                <FriendCardButton variant="contained" color="warning">
                                                                                                    <Typography variant="body2" align="center">
                                                                                                        Ignore
                                                                                                    </Typography>
                                                                                                </FriendCardButton>
                                                                                            </div>
                                                                                        )
                                                                                    }else{
                                                                                        return (
                                                                                            <div key={acceptedNetwork.id}>
                                                                                                <FriendCardButton variant="contained" color="success">
                                                                                                    <Typography variant="body2" align="center">
                                                                                                        Add Friend
                                                                                                    </Typography>
                                                                                                </FriendCardButton>
                                                                                                <FriendCardButton variant="contained" color="warning">
                                                                                                    <Typography variant="body2" align="center">
                                                                                                        Remove
                                                                                                    </Typography>
                                                                                                </FriendCardButton>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                }
                                                                            }else{
                                                                                if (acceptedNetwork.status == 1) {
                                                                                    if (acceptedNetwork.user_id_from == sessionStorage.getItem("authUserId") || acceptedNetwork.user_id_to == sessionStorage.getItem("authUserId")) {
                                                                                        return (
                                                                                            <div key={acceptedNetwork.id}>
                                                                                                <FriendCardButton variant="contained" color="success">
                                                                                                    <Typography variant="body2" align="center">
                                                                                                        Friends
                                                                                                    </Typography>
                                                                                                </FriendCardButton>
                                                                                            </div>
                                                                                        )
                                                                                    }else{
                                                                                        return (
                                                                                            <div key={acceptedNetwork.id}>
                                                                                                <FriendCardButton variant="contained" color="success">
                                                                                                    <Typography variant="body2" align="center">
                                                                                                        Add Friend
                                                                                                    </Typography>
                                                                                                </FriendCardButton>
                                                                                                <FriendCardButton variant="contained" color="warning">
                                                                                                    <Typography variant="body2" align="center">
                                                                                                        Remove
                                                                                                    </Typography>
                                                                                                </FriendCardButton>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                }else{

                                                                                }
                                                                            }
                                                                        });
                                                                    }else{
                                                                        indexCounterArr.push(index);
                                                                        if (indexCounterArr.length < 2) {
                                                                            return (
                                                                                <div key={profileNetwork.id}>
                                                                                    <FriendCardButton variant="contained" color="success">
                                                                                        <Typography variant="body2" align="center">
                                                                                            Add Friend
                                                                                        </Typography>
                                                                                    </FriendCardButton>
                                                                                    <FriendCardButton variant="contained" color="warning">
                                                                                        <Typography variant="body2" align="center">
                                                                                            Remove
                                                                                        </Typography>
                                                                                    </FriendCardButton>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }
                                                                })
                                                            }
                                                        </>
                                                    )
                                                }
                                            </CardContent>
                                        </FriendCard>
                                    </Grid>
                                )
                            })
                        }
                    </FriendGrid>
                </Grid>
                <Grid item md={1} sm={1} xs={12}>
                    
                </Grid>
            </Grid>
        </>
    )
}

export default RootComp