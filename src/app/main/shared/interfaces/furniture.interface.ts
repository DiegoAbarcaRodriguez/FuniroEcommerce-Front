export interface Furniture {
    name: string,
    type: string, //todo Ver opciones para establecer ENUM
    description: string,
    price?: number,
    discount?: number,
    realPrice: number,
    isNew: boolean,
    isLiked: boolean,
    img?: string
}

