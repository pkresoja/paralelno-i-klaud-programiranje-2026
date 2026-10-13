export interface UserModel {
    id: string
    username: string
    avatar: string
    discriminator: string
    public_flags: number
    flags: number
    banner: string | null
    accent_color: number
    global_name: string | null
    avatar_decoration_data: any
    collectibles: any
    display_name_styles: any
    vad_colors: any
    banner_color: string
    clan: UserGuildModel
    primary_guild: UserGuildModel
}

export interface UserGuildModel {
    identity_guild_id: string
    identity_enabled: boolean
    tag: string
    badge: string
}