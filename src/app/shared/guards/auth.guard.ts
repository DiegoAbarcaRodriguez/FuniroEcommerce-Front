import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean> => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return new Observable((observer) => {
        authService.checkLoggingStatus().subscribe(value => {
            if (!value) observer.next(true);
            if (value) {
                router.navigateByUrl('dashboard');
                observer.next(false);

            }
        });
    });

};