/*
    This file should export all configuration constants
    *: feel free to edit as needed
*/

// endpoint for pusher's user authentication
// *: this is synced between pusher client and pusher handler
export const PUSHER_USER_AUTHENTICATION_ENDPOINT = '/api/pusher/user-auth';

// transport method for pusher's user authentication
// ?: ajax | jsonp
export const PUSHER_USER_AUTHENTICATION_TRANSPORT_METHOD = "ajax"

// endpoint for pusher's channel authentication
// *: this is synced between pusher client and pusher handler
export const PUSHER_AUTHENTICATION_ENDPOINT = '/api/pusher/auth';