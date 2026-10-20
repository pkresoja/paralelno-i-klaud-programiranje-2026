import express from "express"
import cors from "cors"
import morgan from "morgan"
import { AppDataSource } from "./db"
import { SyncService } from "./services/sync.service"

const app = express()
app.use(cors())
app.use(morgan('tiny'))

AppDataSource.initialize().then(async () => {
    console.log('Connected to database')

    const port = Number(process.env.SERVER_PORT)
    app.listen(port, () => {
        console.log(`Application started on port ${port}`)
    })
})

app.get('/sync', async (req, res) => {
    await SyncService.syncAll()
})