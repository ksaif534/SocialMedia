import PushNotifications from "@pusher/push-notifications-server";

const beamsClient = new PushNotifications({
    instanceId: '41017d7f-ecca-48f0-93ea-44881bb5a411',
    secretKey: '74006D98E8B2ABACA3EF4222A3B3F7EF102A8EAA1CB5416DA894C4C07A98EA65'
});

export default beamsClient;