import { DataSource } from "typeorm";
import { AccessLog } from './entities/AccessLog'
import { CacheLog } from './entities/CacheLog'
import { Data } from './entities/Data'
import { WebService } from "./services/web.service";

async function sleep() {
    const delay = 500 + Math.random() * 1000
    return new Promise(resolve => setTimeout(resolve, delay))
}

const db = new DataSource({
    host: 'localhost',
    port: 3309,
    username: 'root',
    password: 'root',
    database: 'pkp_2026',
    type: 'mysql',
    entities: [AccessLog, CacheLog, Data]
})

db.initialize().then(async () => {
    console.log('Connected to database')
    const repo = db.getRepository(Data)

    let page = 0
    while (true) {
        console.log(`Downloading data for page ${page}`)
        const rsp = await WebService.getLinkData(page)

        for (let record of rsp.data.content) {
            try {
                const player = await WebService.getPlayerByUUID(record.uuid)
                const user = await WebService.getDiscordUser(record.user.discordId)

                console.log('Syncing player ' + player.data.name)
                await repo.save({
                    dataId: record.id,
                    uuid: record.uuid,
                    minecraftName: player.data.name,
                    discordId: record.user.discordId,
                    discordName: user.data.global_name ?? user.data.username,
                    avatar: user.data.avatar,
                    createdAt: new Date(record.createdAt),
                    cachedAt: new Date()
                })

                // await sleep()
            } catch (e: any) {
                console.log(`Failed syncing record id ${record.id}`)
                console.log(e.message)
                continue
            }
        }

        // if (page == 1) break

        if (rsp.data.last) {
            break;
        }
        page++

    }
})


// id
// uuid
// discordId
// createdAt