import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("access_log", { schema: "pkp_2026" })
export class AccessLog {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "access_log_id",
    unsigned: true,
  })
  accessLogId: number;

  @Column("varchar", { name: "ip_address", length: 255 })
  ipAddress: string;

  @Column("varchar", { name: "path", length: 255 })
  path: string;

  @Column("varchar", { name: "method", length: 255 })
  method: string;

  @Column("datetime", { name: "created_at"})
  createdAt: Date;
}
