import { AppDataSource } from "../db"
import { Data } from "../entities/Data"
import type { DataModel } from "../models/data.model"
import { sanitize, getAvatarUrl, sleep, log } from "../utils"
import { WebService } from "./web.service"

const repo = AppDataSource.getRepository(Data)

export class SyncService {
    static async syncAll() {
        const logs: string[] = []

        let page = 0
        while (true) {
            log(logs, `Downloading data for page ${page}`)
            const rsp = await WebService.getLinkData(page)

            for (let record of rsp.data.content) {
                try {
                    await this.syncData(logs, record)
                    await sleep()
                } catch (e: any) {
                    log(logs, `Failed syncing record id ${record.id}`, true)
                    log(logs, e.message, true)
                    continue
                }
            }

            if (rsp.data.last) {
                break
            }
            page++

        }

        return logs
    }

    static async syncMissing() {
        const all = await repo.find({
            select: {
                dataId: true
            }
        })

        const localIds = all.map(obj => obj.dataId)
        const remoteIds = await WebService.getLinkDataIds()

        const missing = remoteIds.data.filter(id => !localIds.includes(id))
        const toBeRemoved = localIds.filter(id => !remoteIds.data.includes(id))
        const logs: string[] = []

        for (let id of missing) {
            try {
                const record = await WebService.getLinkDataById(id)
                await this.syncData(logs, record.data)
            } catch {
                log(logs, `Sync failed for record id ${id}`, true)
            }
        }

        return logs
    }

    static async syncData(logs: string[], record: DataModel) {
        const player = await WebService.getPlayerByUUID(record.uuid)
        const user = await WebService.getDiscordUser(record.user.discordId)

        log(logs, `Syncing player ${record.id} ${player.data.name}`)
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
    }
}