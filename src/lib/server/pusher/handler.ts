/*
    This module handles authentication @pusher
    !: Do not touch anything here, if you don't know what you are doing
*/

import { json, type Handle, error } from "@sveltejs/kit";
import * as Config from '$lib/config';
import { sequence } from "@sveltejs/kit/hooks";
import pusher from '$lib/server/pusher'

/*
    this handler is supposed to authenticate user
    when private or presence channel is subscribed,
    this handler will be triggered resulting an authentication
*/
const userAuthenticationHandler: Handle = async ({ event, resolve }) => {
    /*
        if the request is not coming from Config.PUSHER_USER_AUTHENTICATION_ENDPOINT and is not POST method,
        just resolve the request and go to next middleware
    */
    if (event.url.pathname !== Config.PUSHER_USER_AUTHENTICATION_ENDPOINT && event.request.method !== "POST") return resolve(event);

    // extract locals and request
    const { locals, request } = event;
    // get session
    const session = await locals.getSession()!;
    // get user
    const user = session?.user;

    // if user is unauthorized, there is not meaning to authorize pusher user
    if (!user) {
        // throw 401
        throw error(401, "Unauthorized");
    }

    // extract form data
    const formData = (await request.formData());

    // if there is no socket id presence in incoming data, throw 401
    if (!formData.has("socket_id")) {
        throw error(401, "Unauthorized");
    }

    // extract socket id
    const socket_id = formData.get("socket_id") as string;

    // create authorization Response with `pusher.authorizeUser`
    const authResponse = pusher.authenticateUser(socket_id as string, {
        id: user.id as string,
        ...user
    })

    // return as json
    return json(authResponse);
}

/*
    this handler is supposed to authenticate channel
*/
const channelAuthenticationHandler: Handle = async ({ event, resolve }) => {
    /*
        if the request is not coming from Config.PUSHER_AUTHENTICATION_ENDPOINT and is not POST method,
        just resolve the request and go to next middleware
    */
    if (event.url.pathname !== Config.PUSHER_AUTHENTICATION_ENDPOINT && event.request.method !== "POST") return resolve(event);

    // extract locals and request
    const { locals, request } = event;
    // get session
    const session = await locals.getSession()!;
    // extract user
    const user = session?.user;

    // if user is unauthorized, there is no meaning to authenticate pusher user
    if (!user) {
        // throw 401
        throw error(401, "Unauthorized");
    }

    // extract form data
    const formData = await request.formData();
    // extract socket id
    const socket_id = formData.get("socket_id")
    // extract channel name
    const channel_name = formData.get("channel_name")

    // if there is no socket id or channel name, throw 401
    if (!socket_id || !channel_name) {
        throw error(401, "Unauthorized");
    }

    // create authorization Response with `pusher.authorizeChannel`
    const authResponse = pusher.authorizeChannel(socket_id as string, channel_name as string, {
        user_id: user.id as string,
        user_info: {
            name: user.name,
            image: user.image,
            /*
                add more user information here
                eg. username
            */
        }
    });

    // return as json
    return json(authResponse);
}

// create a sequence for multiple handlers
export default sequence(userAuthenticationHandler, channelAuthenticationHandler);