import { Furniture } from "./furniture.interface"

export interface RespondApiFurniture {
    ok: boolean,
    message: string,
    id: string
}

export interface RespondApiGetFurnitures {
    furnitures: Furniture[],
    total: number
}
export interface RespondApiGetFurnituresByQuery {
    furnitures: Furniture[],
    ok: boolean
}
export interface RespondApiGetOneFurniture {
    furniture: Furniture,
    ok: boolean
}