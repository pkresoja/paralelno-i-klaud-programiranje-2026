import { AppDataSource } from "../db";
import { Data } from "../entities/Data";

const repo = AppDataSource.getRepository(Data)

export class DataService {
    static async getAll() {
        return repo.find({
            order: {
                dataId: 'desc'
            }
        })
    }

    static async getById(id: number) {
        return repo.findOneByOrFail({
            dataId: id
        })
    }
}