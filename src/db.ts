import { DataSource } from "typeorm";
import { AccessLog } from "./entities/AccessLog";
import { CacheLog } from "./entities/CacheLog";
import { Data } from "./entities/Data";

export const AppDataSource = new DataSource({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    type: 'mysql',
    entities: [AccessLog, CacheLog, Data]
})