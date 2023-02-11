import axios from 'axios'
import { User } from '../../database/schemas'
import { Discord_api_url } from '../../utils/constants'
import { partialGuild } from '../../utils/types'

export async function getBotGuildsService() {
    return axios.get<partialGuild[]>(`${Discord_api_url}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${process.env.TOKEN}` }
    })
}

export async function getUserGuildsService(id: string) {
    const user = await User.findById(id)
    if (!user) throw new Error("No Users Found!")
    return axios.get<partialGuild[]>(`${Discord_api_url}/users/@me/guilds`, {
        headers: { Authorization: `Bearer ${user.acessToken}` }
    })
}

export async function getMutualServerServices(id: string) {
    const { data: botGuilds } = await getBotGuildsService()
    const { data: userGuilds } = await getUserGuildsService(id)

    const adminUserGuilds = userGuilds.filter(
        ({ permissions }) => (parseInt(permissions) & 0x8) === 0x8
    );
    return adminUserGuilds.filter((guild) => botGuilds.some((botGuild) => botGuild.id === guild.id))
}