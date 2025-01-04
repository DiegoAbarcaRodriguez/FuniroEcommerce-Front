export interface Furniture{
    name: string,
    description: string,
    main_description: string,
    short_description: string,
    image: string,
    user_fk: string,

    sales_package: string,
    model_number: string,

    height: number,
    width: number,
    weight: number,

    warranty_domestic: number,
    warranty_general: number,

    max_load: number,
    origin: string,


    discount?: number,
    isNew?: boolean,
    category?: string, //Todo Definir enum de categorias
    price?: number,
    stock?: number,
    created_at?: Date,

    secondary_material?: string,
    upholstery_material?: string,
    upholstery_color?: string,

    depth?: number,

    filling_material?: string,
    has_adjustable_headrest?: boolean,
    id?: string
}