import type { Request } from "express";
import { AppDataSource } from "../db";
import { AccessLog } from "../entities/AccessLog";
import { CacheLog } from "../entities/CacheLog";

const cacheLogRepo = AppDataSource.getRepository(CacheLog)
const accessLogRepo = AppDataSource.getRepository(AccessLog)

export class LogService {

    static async createCacheLog(start: Date, logs: string[]) {
        return await cacheLogRepo.save({
            startedAt: start,
            finishedAt: new Date(),
            content: JSON.stringify(logs)
        })
    }

    static async createAccessLog(req: Request) {
        return await accessLogRepo.save({
            ipAddress: req.ip ?? 'localhost',
            path: req.path,
            method: req.method,
            createdAt: new Date()
        })
    }
}