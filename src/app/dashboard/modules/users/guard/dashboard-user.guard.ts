import { inject } from '@angular/core';
import {
    CanActivateFn, Router,
} from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export const DashboardUserGuard: CanActivateFn = (): boolean => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if (!authService.user?.is_admin) {
        router.navigateByUrl('dashboard/furnitures');
        return false;
    }

    return true;

};