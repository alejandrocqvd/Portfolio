// "Now" data for the footer. Each getter runs on the server, so API keys stay private when these are wired up.
// shortcut: all four return stubs; replace the bodies with real fetches (weather, Steam, Spotify) and keep the return shapes.

export async function getLocation() {
  return "Calgary, AB";
}

// Return a number in °C, or null when unknown.
export async function getWeather() {
  return null;
}

export async function getRecentGame() {
  return null;
}

export async function getRecentSong() {
  return null;
}
