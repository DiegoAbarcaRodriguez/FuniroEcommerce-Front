import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const ThankyouGuard: CanActivateFn = () => {
    const router = inject(Router);

    const session_id = localStorage.getItem('session_id');

    if (!session_id) {
        router.navigateByUrl('/checkout');
        return false;
    }

    return true;
};