import { SpotifyApi } from "@spotify/web-api-ts-sdk"

const scopes = ["streaming"]
const redirectUri = "http://127.0.0.1:3000"
const clientId = "d850768196144dfbab2ee42325a6e287"

export default function useSpotifyApi() {
  const api = SpotifyApi.withUserAuthorization(clientId, redirectUri, scopes)

  const login = async () => {
    const authResponse = await api.authenticate()
    if (!authResponse) return

    return authResponse.accessToken.access_token
  }

  return { api, login }
}
