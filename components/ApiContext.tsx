import React, { createContext, useState } from "react"
import { SpotifyApi, User } from "@spotify/web-api-ts-sdk"

const scopes = ["streaming"]
const redirectUri = "http://127.0.0.1:3000"
const clientId = "d850768196144dfbab2ee42325a6e287"

interface IApiContext {
  api: SpotifyApi
  login: () => Promise<void>
  token: string | null
  user: User | null
}

const api = SpotifyApi.withUserAuthorization(clientId, redirectUri, scopes)

const ApiContext = createContext<IApiContext>({
  api,
  login: () => Promise.resolve(),
  token: null,
  user: null,
})

export default ApiContext

export function ApiContextProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)

  const [user, setUser] = useState<User | null>(null)

  const login = async () => {
    const authResponse = await api.authenticate()
    if (!authResponse) return

    setToken(authResponse.accessToken.access_token)

    const data = await api.currentUser.profile()
    setUser(data)
  }

  return <ApiContext value={{ api, login, token, user }}>{children}</ApiContext>
}
