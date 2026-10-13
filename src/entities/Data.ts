import { Column, Entity } from "typeorm";

@Entity("data", { schema: "pkp_2026" })
export class Data {
  @Column("int", { primary: true, name: "data_id", unsigned: true })
  dataId: number;

  @Column("varchar", { name: "uuid", length: 255 })
  uuid: string;

  @Column("varchar", { name: "minecraft_name", length: 255 })
  minecraftName: string;

  @Column("varchar", { name: "discord_id", length: 255 })
  discordId: string;

  @Column("varchar", { name: "discord_name", length: 255 })
  discordName: string;

  @Column("varchar", { name: "avatar", length: 255 })
  avatar: string;

  @Column("datetime", { name: "created_at" })
  createdAt: Date;

  @Column("datetime", { name: "cached_at", nullable: true })
  cachedAt: Date | null;
}
