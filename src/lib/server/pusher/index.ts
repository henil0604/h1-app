/*
    This file contains pusher server configuration
    *: Feel free to edit configuration as needed
*/


import Pusher from 'pusher';
import { PUSHER_APPID, PUSHER_SECRET } from '$env/static/private';
import { PUBLIC_PUSHER_CLUSTER, PUBLIC_PUSHER_KEY } from '$env/static/public';

const pusher = new Pusher({
    appId: PUSHER_APPID,
    key: PUBLIC_PUSHER_KEY,
    secret: PUSHER_SECRET,
    cluster: PUBLIC_PUSHER_CLUSTER,
    useTLS: true
});

export default pusher;