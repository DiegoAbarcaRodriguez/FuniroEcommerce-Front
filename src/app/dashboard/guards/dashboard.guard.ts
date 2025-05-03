import { inject } from '@angular/core';
import { DashboardModule } from '../dashboard.module';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';

export const DashboardGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean> => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return new Observable(observer => {
        authService.checkLoggingStatus()
            .subscribe(value => {
                if (value) {
                    observer.next(true);
                    return;
                }

                router.navigateByUrl('auth');
                observer.next(false);

            })
    });



};