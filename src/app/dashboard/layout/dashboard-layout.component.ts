import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../modules/users/services/user.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: 'dashboard-layout.component.html',
    styles: [`
        .bg-secondary{
            height:100vh;
           }

           .container-fluid{
                height:80vh;
                overflow-y:scroll;
           }
        `]
})

export class DahsboardLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

    mustShowModalUserForm: boolean = false;
    subscription?: Subscription;

    constructor(private _userService: UserService) { }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    ngAfterViewInit() {
        document.querySelector('html')!.style.overflowY = 'hidden';
    }

    ngOnInit() {
        this.subscription = this._userService.mustShowModalForm.subscribe(value => this.mustShowModalUserForm = value);
    }
}