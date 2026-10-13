import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cache_log", { schema: "pkp_2026" })
export class CacheLog {
  @PrimaryGeneratedColumn({ type: "int", name: "cache_log_id", unsigned: true })
  cacheLogId: number;

  @Column("datetime", { name: "started_at" })
  startedAt: Date;

  @Column("datetime", { name: "finished_at" })
  finishedAt: Date;

  @Column("longtext", { name: "content" })
  content: string;
}
