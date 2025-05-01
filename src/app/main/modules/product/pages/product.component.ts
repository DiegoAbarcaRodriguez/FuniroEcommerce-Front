import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { FurnitureService } from 'src/app/main/shared/services/furniture.service';
import { Furniture } from 'src/app/shared/interfaces';

@Component({
    templateUrl: 'product.component.html'
})

export class ProductComponent implements OnInit {

    furnitures: Furniture[] = [];
    furniture?: Furniture;

    constructor(
        private _furnitureService: FurnitureService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) { }


    ngOnInit() {

        this._activatedRoute.params
            .pipe(switchMap(({ name }) => this._furnitureService.getOneFurniture(name)))
            .subscribe({
                next: ({ furniture }) => this.furniture = furniture,
                error: () => this._router.navigateByUrl('')
            });


        this._furnitureService.getFurnitures().subscribe({ next: ({ furnitures }) => this.furnitures = furnitures });
    }
}