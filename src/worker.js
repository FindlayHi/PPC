import { onRequestPost as leadHandler } from "../functions/api/lead.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/lead" && request.method === "POST") {
      return leadHandler({ request, env, ctx });
    }

    return env.ASSETS.fetch(request);
  },
};
