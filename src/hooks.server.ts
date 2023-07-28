/*
    This file is about svelte hooks
    Read more about hooks: https://kit.svelte.dev/docs/hooks
*/

import authHandler from "$lib/server/auth";
import trpcHandler from "$lib/server/trpc/handler";
import pusherHandler from "$lib/server/pusher/handler";
import { sequence } from "@sveltejs/kit/hooks";

export const handle = sequence(authHandler, trpcHandler, pusherHandler);