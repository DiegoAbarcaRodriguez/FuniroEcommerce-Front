import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
    selector: 'dashboard-toolbar-component',
    templateUrl: 'toolbar.component.html',
    styles: [`
            .bg-white{
                box-shadow: 1px 2.9px 5px 0.5px #B88E2F;
            }
        `]
})

export class ToolbarComponent implements OnInit {

    user?: User;

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.user = this._authService.user;
    }

    logOut() {
        this._authService.logOut();
        this._router.navigateByUrl('/auth');
    }
}