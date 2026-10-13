export interface DataModel {
    id: number
    uuid: string
    user: {
        id: number
        discordId: string
        createdAt: string
    }
    guild: {
        id: number
        discordId: string
        createdAt: string
    }
    createdAt: string
}