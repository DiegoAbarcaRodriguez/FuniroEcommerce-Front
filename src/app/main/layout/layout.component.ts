import { Component, HostListener, OnInit } from '@angular/core';
import { ShoppingCarService } from '../shared/services/shopping-car.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../shared/services/snackbar.service';
import { ModalCustomerService } from '../shared/services/modal-customer.service';
import { Router } from '@angular/router';
import { FavoritesService } from '../shared/services/favorites.service';
import { PurchaseListService } from '../shared/services/purchase-list.service';


@Component({
    templateUrl: 'layout.component.html'
})

export class LayoutComponent implements OnInit {

    subscription?: Subscription;
    mustShowShoppingCarComponent: boolean = false;
    mustShowSnackbarComponent: boolean = false;
    mustShowModalCustomerComponent: boolean = false;
    mustShowPurchasedFurnituresListComponentInMobile: boolean = false;
    mustShowPurchasedFurnituresListComponent: boolean = false;
    mustShowFavoriteList: boolean = false;

    isMobile: boolean = window.innerWidth <= 768;

    constructor(
        private _shoppingCarService: ShoppingCarService,
        private _snackbarService: SnackbarService,
        private _modalCustomerService: ModalCustomerService,
        private _favoritesService: FavoritesService,
        private _purchaseListService: PurchaseListService,
        private _router: Router
    ) { }

    ngOnInit() {
        this._router.events.subscribe(() => this._favoritesService.mustShowFavoritesListComponent = false);
        this._shoppingCarService.mustShowShoppingCarComponet.subscribe(mustShow => this.mustShowShoppingCarComponent = mustShow);
        this._snackbarService.mustShowSnackBar.subscribe(mustShow => this.mustShowSnackbarComponent = mustShow);
        this._modalCustomerService.mustShowModalCustomer.subscribe(mustShow => this.mustShowModalCustomerComponent = mustShow);
        this._purchaseListService.mustShowPurchaseList.subscribe(mustShow => this.mustShowPurchasedFurnituresListComponent = mustShow);
        this._favoritesService.mustShowFavoritesListComponent.subscribe(mustShow => this.mustShowFavoriteList = mustShow);
    }

    showPurchasedListInMobile(value: boolean) {
        this.mustShowPurchasedFurnituresListComponentInMobile = value;
    }

    @HostListener('window:resize', ['$event'])
    onResizeWindow() {
        this.isMobile = window.innerWidth <= 768;
    }
}