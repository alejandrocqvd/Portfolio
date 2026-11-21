// "Now" data for the footer. Each getter runs on the server (keys stay private) and returns null on any failure, a
// missing key or a slow API, so the footer falls back to its placeholder text. Pages revalidate every 5 minutes
// (`revalidate` in src/app/layout.jsx), so these APIs are hit a few times an hour, not once per visitor.
//
// Env (see .env.example): STEAM_API_KEY, STEAM_ID · SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN.
// Weather needs no key (Open-Meteo).

const CALGARY = { latitude: 51.0447, longitude: -114.0719 };

async function getJSON(url, init) {
  try {
    const res = await fetch(url, { ...init, signal: AbortSignal.timeout(3000) });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

export async function getLocation() {
  return "Calgary, AB";
}

// A number in °C, or null when unknown.
export async function getWeather() {
  const params = new URLSearchParams({ ...CALGARY, current: "temperature_2m" });
  const data = await getJSON(`https://api.open-meteo.com/v1/forecast?${params}`);
  const temperature = data?.current?.temperature_2m;
  return typeof temperature === "number" ? temperature : null;
}

// The most recently played Steam game in the last two weeks. Needs the profile's "Game details" set to Public.
export async function getRecentGame() {
  const { STEAM_API_KEY: key, STEAM_ID: steamid } = process.env;
  if (!key || !steamid) return null;
  const params = new URLSearchParams({ key, steamid, count: "1" });
  const data = await getJSON(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?${params}`);
  return data?.response?.games?.[0]?.name ?? null;
}

// "<track> by <artist>" for the last song played on Spotify. The refresh token comes from scripts/spotify-token.mjs.
export async function getRecentSong() {
  const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refresh } = process.env;
  if (!id || !secret || !refresh) return null;

  const token = await getJSON("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh }),
  });
  if (!token?.access_token) return null;

  const data = await getJSON("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
    headers: { Authorization: `Bearer ${token.access_token}` },
  });
  const track = data?.items?.[0]?.track;
  if (!track?.name) return null;
  const artist = track.artists?.map((a) => a.name).join(", ");
  return artist ? `${track.name} by ${artist}` : track.name;
}
