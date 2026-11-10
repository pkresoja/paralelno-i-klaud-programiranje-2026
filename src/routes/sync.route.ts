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

SyncRoute.post('/id/:id', async (req, res) => {
    const id = Number(req.params.id)
    await createSyncLog(SyncService.syncByDataId, res, id)
})

async function createSyncLog(callback: Function, res: Response, args?: any) {
    const start = new Date()
    const logs = args ? await callback(args) : await callback()
    await LogService.createCacheLog(start, logs)
    return res.json(logs)
}