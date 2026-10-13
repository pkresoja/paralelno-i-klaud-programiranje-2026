import { SortModel } from "./sort.model"

export interface PageModel<T> {
    content: T[]
    pageable: {
        pageNumber: number
        pageSize: number
        sort: SortModel
        offset: number
        paged: boolean
        unpaged: boolean
    }
    last: boolean
    totalPages: number
    totalElements: number
    size: number
    number: number
    sort: SortModel
    first: boolean
    numberOfElements: number
    empty: boolean
}