import { WebService } from "./services/web.service";

async function sleep() {
    const delay = 500 + Math.random() * 1000
    return new Promise(resolve => setTimeout(resolve, delay))
}

let objects = []
let page = 0
while (true) {
    console.log(`Downloading data for page ${page}`)
    const rsp = await WebService.getLinkData(page)

    for (let record of rsp.data.content) {
        try {
            const player = await WebService.getPlayerByUUID(record.uuid)
            const user = await WebService.getDiscordUser(record.user.discordId)

            const obj = {
                id: record.id,
                uuid: record.uuid,
                minecraftName: player.data.name,
                discordId: record.user.discordId,
                discordName: user.data.global_name ?? user.data.username,
                avatar: user.data.avatar,
                createdAt: record.createdAt
            }

            console.log(obj)
            objects.push(obj)

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

console.log(`Total elements: ${objects.length}`)

// id
// uuid
// discordId
// createdAt