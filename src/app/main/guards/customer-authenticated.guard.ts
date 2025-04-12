import { inject } from '@angular/core';
import { CanActivateFn, Router, } from '@angular/router';
import { CustomerService } from '../shared/services/customer.service';

export const CustomerAuthenticatedGuard: CanActivateFn = () => {
    const router = inject(Router);
    const _customerService: CustomerService = inject(CustomerService);

    if (_customerService.token.length > 0) {
        return true
    }

    router.navigateByUrl('/');
    return false;

};