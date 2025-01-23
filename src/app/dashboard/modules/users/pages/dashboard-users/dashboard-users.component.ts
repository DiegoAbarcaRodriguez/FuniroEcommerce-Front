import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: 'dashboard-users.component.html',
})

export class DashboardUsersComponent implements OnInit, OnDestroy {

    users: User[] = [];
    mustShowAddButton: boolean = false;
    subscription: Subscription = new Subscription();
    pagesNumber: number = 0;
    limit: number = 5;

    constructor(
        private _userService: UserService,
        private _authService: AuthService
    ) { }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.users = [];
    }

    ngOnInit() {
        this.getUsers();
        this.onCreateOrUpdateUser();
        this.onDeleteUser();
        this.mustShowAddButton = this._authService.user!.is_root;
    }

    openModalForm() {
        this._userService.userToCreateOrModify = undefined;
        this._userService.mustShowModalForm = true;
    }

    getUsers(page?: number, limit?: number) {
        this.subscription.add(
            this._userService.getUsers(page, limit).subscribe(({ total, users }) => {
                this.users = users;
                this.pagesNumber = Math.ceil(total / this.limit);
            })
        );
    }

    onCreateOrUpdateUser() {
        this.subscription.add(
            this._userService.createdOrUpdatedUser.subscribe(user => {
                const wasUpdatedUser = this.users.some(userElement => userElement.id === user.id);

                if (wasUpdatedUser) {
                    this.users = this.users.map(userElement => {
                        if (userElement.id === user.id) {
                            userElement = user;
                        }
                        return userElement;
                    });
                    this.users = this.users.sort((a, b) => a.modify_at < b.modify_at ? 1 : -1);
                    return;
                }

                this.users.unshift(user);
                this.users.splice(this.limit, 1);
            })
        );
    }

    onDeleteUser() {
        this.subscription.add(
            this._userService.deletedUser.subscribe(user => {
                this.users = this.users.filter(userElement => userElement.id !== user.id);
            })
        );
    }
}