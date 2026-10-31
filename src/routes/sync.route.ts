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

SyncRoute.post('/missing', async (req, res) => {
    const data = await SyncService.syncMissing()
    return res.json(data)
})