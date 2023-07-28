/*
    This module is implementation of client side pusher instance
    it exports pusher instance with basic configuration
    *: Feel free to edit configuration as needed
*/

import { PUBLIC_PUSHER_CLUSTER, PUBLIC_PUSHER_KEY } from "$env/static/public";
import Pusher from "pusher-js";
import * as Config from '$lib/config';

var pusher = new Pusher(PUBLIC_PUSHER_KEY, {
    cluster: PUBLIC_PUSHER_CLUSTER,
    userAuthentication: {
        endpoint: Config.PUSHER_USER_AUTHENTICATION_ENDPOINT,
        transport: Config.PUSHER_USER_AUTHENTICATION_TRANSPORT_METHOD
    },
    authEndpoint: Config.PUSHER_AUTHENTICATION_ENDPOINT,
});

export default pusher;