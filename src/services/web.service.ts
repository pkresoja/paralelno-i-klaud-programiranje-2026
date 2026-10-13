import axios from "axios";
import { PlayerModel } from "../models/player.model";
import { UserModel } from "../models/user.model";
import { PageModel } from "../models/page.model";
import { DataModel } from "../models/data.model";
import { configDotenv } from "dotenv";

const client = axios.create({
    headers: {
        'Accept': 'application/json',
        'X-Name': 'PKP-2026'
    },
    validateStatus(status) {
        return status === 200
    }
})

configDotenv()
const token = process.env.DISCORD_BOT_TOKEN

export class WebService {
    static async getPlayerByUUID(uuid: string) {
        return await client.request<PlayerModel>({
            url: `https://api.minecraftservices.com/minecraft/profile/lookup/${uuid}`,
            method: 'GET'
        })
    }

    static async getDiscordUser(id: string) {
        return await client.request<UserModel>({
            url: `https://discord.com/api/v10/users/${id}`,
            method: 'GET',
            headers: {
                Authorization: `Bot ${token}`
            }
        })
    }

    static async getLinkData(page: number) {
        return await client.request<PageModel<DataModel>>({
            url: `https://link.samifying.com/api/data?size=30&page=${page}`,
            method: 'GET'
        })
    }
}
