import { Router, type Response } from "express";
import { SyncService } from "../services/sync.service";
import { LogService } from "../services/log.service";

export const SyncRoute = Router()

SyncRoute.post('/all', async (req, res) => {
    await createSyncLog(SyncService.syncAll, res)
})

SyncRoute.post('/missing', async (req, res) => {
    await createSyncLog(SyncService.syncMissing, res)
})

async function createSyncLog(callback: Function, res: Response) {
    const start = new Date()
    const logs = await callback()
    await LogService.createCacheLog(start, logs)
    return res.json(logs)
}