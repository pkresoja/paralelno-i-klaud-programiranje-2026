import { AppDataSource } from "../db"
import { Data } from "../entities/Data"
import { sanitize, getAvatarUrl, sleep, log } from "../utils"
import { WebService } from "./web.service"

export class SyncService {
    static async syncAll() {
        const repo = AppDataSource.getRepository(Data)
        const logs: string[] = []

        let page = 0
        while (true) {
            log(logs, `Downloading data for page ${page}`)
            const rsp = await WebService.getLinkData(page)

            for (let record of rsp.data.content) {
                try {
                    const player = await WebService.getPlayerByUUID(record.uuid)
                    const user = await WebService.getDiscordUser(record.user.discordId)

                    log(logs, 'Syncing player ' + player.data.name)
                    await repo.save({
                        dataId: record.id,
                        uuid: record.uuid,
                        minecraftName: sanitize(player.data.name),
                        discordId: record.user.discordId,
                        discordName: sanitize(user.data.global_name ?? user.data.username),
                        avatar: getAvatarUrl(user.data),
                        createdAt: new Date(record.createdAt),
                        cachedAt: new Date()
                    })

                    await sleep()
                } catch (e: any) {
                    log(logs, `Failed syncing record id ${record.id}`, true)
                    log(logs, e.message, true)
                    continue
                }
            }

            if (rsp.data.last || rsp.data.number > 0) {
                break
            }
            page++

        }

        return logs
    }
}