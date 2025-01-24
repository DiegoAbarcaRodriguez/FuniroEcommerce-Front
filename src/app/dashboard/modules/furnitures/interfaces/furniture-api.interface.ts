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
export interface RespondApiGetOneFurniture {
    furniture: Furniture,
    ok: boolean
}