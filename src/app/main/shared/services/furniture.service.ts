import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Furniture } from '../interfaces/furniture.interface';
import { Carrousel } from '../interfaces/carrousel.interface';

@Injectable({ providedIn: 'root' })
export class FurnitureService {


    constructor(private http: HttpClient) { }

    getFurnitures(): Furniture[] {
        return [
            {
                name: 'Syltherine',
                type: 'Dining', //todo Ver opciones para establecer ENUM
                description: 'Stylish cafe chair',
                price: 2500,
                discount: 30,
                realPrice: 2900,
                isNew: false,
                isLiked: false
            },
            {
                name: 'Syltherine',
                type: 'Dining', //todo Ver opciones para establecer ENUM
                description: 'Stylish cafe chair',
                price: 2500,
                discount: 30,
                realPrice: 2900,
                isNew: false,
                isLiked: false
            },
            {
                name: 'Syltherine',
                type: 'Dining', //todo Ver opciones para establecer ENUM
                description: 'Stylish cafe chair',
                price: 2500,
                discount: 30,
                realPrice: 2900,
                isNew: false,
                isLiked: false
            },
            {
                name: 'Syltherine',
                type: 'Dining', //todo Ver opciones para establecer ENUM
                description: 'Stylish cafe chair',
                price: 2500,
                discount: 30,
                realPrice: 2900,
                isNew: false,
                isLiked: false
            },
            {
                name: 'Syltherine',
                type: 'Dining', //todo Ver opciones para establecer ENUM
                description: 'Stylish cafe chair',
                price: 2500,
                discount: 30,
                realPrice: 2900,
                isNew: true,
                isLiked: false
            },
            {
                name: 'Syltherine',
                type: 'Dining', //todo Ver opciones para establecer ENUM
                description: 'Stylish cafe chair',
                realPrice: 2900,
                isNew: true,
                isLiked: false
            },
        ]
    }

    getCarrouselElements(): Carrousel[] {
        return [
            {
                title: 'Bed Room',
                type: 'Inner Peace',
                img: '1'
            },
            {
                title: 'Coffe Table',
                type: 'Sweet Dreams',
                img: '2'
            },
            {
                title: 'Mirror',
                type: 'Black Swan',
                img: '3'
            },
            {
                title: 'Closet',
                type: 'Inner Peace',
                img: '4'
            }
        ]
    }

}