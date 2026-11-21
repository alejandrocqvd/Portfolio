// One-time helper: gets the Spotify refresh token the footer uses for "recent song" (src/lib/now.js).
//
//   1. Create an app at https://developer.spotify.com/dashboard with the Redirect URI below, and put its
//      SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET in .env.local.
//   2. node --env-file=.env.local scripts/spotify-token.mjs
//   3. Open the printed URL, approve, and copy the printed SPOTIFY_REFRESH_TOKEN line into .env.local (and Vercel).

import { createServer } from "node:http";

const REDIRECT_URI = "http://127.0.0.1:8888/callback";
const SCOPE = "user-read-recently-played";
const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env;

if (!id || !secret) {
  console.error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET. Add them to .env.local and run:");
  console.error("  node --env-file=.env.local scripts/spotify-token.mjs");
  process.exit(1);
}

const authorize = `https://accounts.spotify.com/authorize?${new URLSearchParams({
  client_id: id,
  response_type: "code",
  redirect_uri: REDIRECT_URI,
  scope: SCOPE,
})}`;

const server = createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== "/callback") return res.writeHead(404).end();

  const code = url.searchParams.get("code");
  if (!code) {
    res.end(`Spotify returned: ${url.searchParams.get("error") ?? "no code"}. You can close this tab.`);
    console.error(`Authorization failed: ${url.searchParams.get("error") ?? "no code"}`);
    return server.close();
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: REDIRECT_URI }),
  });
  const data = await response.json();

  if (data.refresh_token) {
    res.end("Done. Copy the token from your terminal; you can close this tab.");
    console.log(`\nAdd this to .env.local and to Vercel:\n\nSPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
  } else {
    res.end("Token exchange failed; see your terminal.");
    console.error("Token exchange failed:", data);
  }
  server.close();
});

server.listen(8888, "127.0.0.1", () => {
  console.log(`Open this URL, sign in to Spotify and approve:\n\n${authorize}\n\nWaiting for Spotify at ${REDIRECT_URI} …`);
});
