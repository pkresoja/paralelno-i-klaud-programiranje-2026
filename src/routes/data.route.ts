import { Router } from "express";
import { DataService } from "../services/data.service";

export const DataRoute = Router()

DataRoute.get('/', async (req, res) => {
    res.json(await DataService.getAll())
})

DataRoute.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        res.json(await DataService.getById(id))
    } catch {
        res.status(404).json({
            message: 'NOT_FOUND',
            timestamp: new Date()
        })
    }
})