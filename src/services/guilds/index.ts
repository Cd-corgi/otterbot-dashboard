import axios from 'axios'
import { Discord_api_url } from '../../utils/constants'
import { partialGuild } from '../../utils/types'

export async function getBotGuildsService() {
    return axios.get<partialGuild[]>(`${Discord_api_url}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${process.env.TOKEN}` }
    })
}