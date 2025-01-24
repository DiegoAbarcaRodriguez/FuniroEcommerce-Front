import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces';
import { UserService } from '../../services/user.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Subscription, switchMap } from 'rxjs';


@Component({
    selector: 'dashboard-users-table-users-component',
    templateUrl: 'table-users.component.html',
    styles: [
        `
            .table{
              box-shadow: 1px 2px 4px 2px #B88E2F;
            }
        `
    ]
})

export class TableUsersComponent implements OnInit, OnDestroy {


    @Input()
    users: User[] = [];

    private subscription?: Subscription;

    constructor(
        private _userService: UserService,
        private _modalService: ModalService
    ) { }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnInit() {
        this.onReplyQuestionModal();

    }

    openFormModal(user: User) {
        this._userService.userToCreateOrModify = user;
        this._userService.mustShowModalForm = true;
    }

    openQuestionModal(user: User) {
        this._modalService.openQuestionModal(user);
    }

    onReplyQuestionModal() {
        this.subscription = this._modalService.respondFromQuestionModal
            .pipe(switchMap(() => this._userService.deleteUser(this._modalService.contentQuestionModal.id)))
            .subscribe({
                next: ({ message, user }) => {
                    this._userService.deletedUser = user;

                    this._modalService.openModal({ message, status: 'success' });
                    setTimeout(() => {
                        this._modalService.closeModal();
                    }, 3000);

                },
                error: ({ error }) => {
                    this._modalService.openModal({ message: error.message, status: 'error' });
                    setTimeout(() => {
                        this._modalService.closeModal();
                    }, 3000);

                }
            });
    }


}