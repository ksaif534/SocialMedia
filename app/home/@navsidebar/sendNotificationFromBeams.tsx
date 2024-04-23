import * as PusherPushNotifications from "@pusher/push-notifications-web";

const sendNotificationFromBeams = async () => {
    const beamsClient = new PusherPushNotifications.Client({
        instanceId: '41017d7f-ecca-48f0-93ea-44881bb5a411',
    });
    beamsClient.start().then((beamsClient: any) => beamsClient.getDeviceId())
    .then((deviceId: any) => console.log("Successfully registered with Beams. Device ID:",deviceId))
    .then(() => beamsClient.getDeviceInterests())
    .then((interests) => console.log('Current Interests:', interests));
}

export default sendNotificationFromBeams