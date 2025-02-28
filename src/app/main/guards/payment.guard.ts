import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, } from '@angular/router';
import { ShoppingCarService } from '../shared/services/shopping-car.service';

export const PaymentGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const shoppingCartService = inject(ShoppingCarService);

    if (shoppingCartService.furnituresToBuy.length === 0) {
        router.navigateByUrl('/home')
        return false;
    }

    return true;
};