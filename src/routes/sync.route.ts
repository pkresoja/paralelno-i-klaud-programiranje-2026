import { Router } from "express";
import { SyncService } from "../services/sync.service";
import { LogService } from "../services/log.service";

export const SyncRoute = Router()

SyncRoute.post('/all', async (req, res) => {
    const start = new Date()
    const logs = await SyncService.syncAll()
    await LogService.createCacheLog(start, logs)
    return res.json(logs)
})