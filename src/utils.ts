import type { UserModel } from "./models/user.model";

export function sanitize(input: string) {
    return input.normalize('NFKC')
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
        .trim()
}

export async function sleep() {
    const delay = 500 + Math.random() * 1000
    return new Promise(resolve => setTimeout(resolve, delay))
}

export function getAvatarUrl(user: UserModel, size = 128) {
    if (user.avatar) {
        const extension = user.avatar.startsWith("a_")
            ? "gif"
            : "png";

        return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=${size}`;
    }

    // Calculate the default avatar index (Discord API v10)
    const index = Number((BigInt(user.id) >> 22n) % 6n);

    return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}