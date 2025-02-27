import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCarService } from '../shared/services/shopping-car.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../../shared/services/snackbar.service';


@Component({
    templateUrl: 'layout.component.html'
})

export class LayoutComponent implements OnInit, OnDestroy {

    subscription?: Subscription;
    mustShowShoppingCarComponent: boolean = false;
    mustShowSnackbarComponent: boolean = false;

    constructor(
        private _shoppingCarService: ShoppingCarService,
        private _snackbarService: SnackbarService
    ) { }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnInit() {
        this.subscription = this._shoppingCarService.mustShowShoppingCarComponet.subscribe(mustShow => this.mustShowShoppingCarComponent = mustShow);
        this.subscription = this._snackbarService.mustShowSnackBar.subscribe(mustShow => this.mustShowSnackbarComponent = mustShow);
    }
}