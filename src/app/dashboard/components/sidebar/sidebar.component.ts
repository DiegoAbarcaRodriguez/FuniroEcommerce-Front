import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
    selector: 'dashboard-sidebar-component',
    templateUrl: 'sidebar.component.html',
    styles: [
        `.sidebar{
            height:100vh;
            overflow-y:hidden;
        }`
    ]

})

export class SideBarComponent implements OnInit {

    isAdmin: boolean = false;

    constructor(private _authService: AuthService) { }

    ngOnInit() {
        this.isAdmin = this._authService.user?.is_admin || false;
    }
}