import { Component, OnInit } from '@angular/core';
import { UserService } from '../../modules/users/services/user.service';
import { User } from 'src/app/shared/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { ModalService } from 'src/app/shared/services/modal.service';


@Component({
    selector: 'dashboard-modal-users-component',
    templateUrl: 'modal-user.component.html'
})

export class ModalUsersComponent implements OnInit {

    user?: User;
    userForm?: FormGroup;
    mustShowPasswordForms: boolean = false;

    constructor(
        private _fb: FormBuilder,
        private _validationService: ValidationService,
        private _userService: UserService,
        private _modalService: ModalService
    ) { }

    ngOnInit() {

        this.user = this._userService.userToCreateOrModify;


        this.userForm = this._fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            password2: ['', [Validators.required, Validators.minLength(6)]],
        }, {
            validators: [
                this._validationService.compareFieldsFromFormGroup('password', 'password2')
            ]
        });

        if (this.user) {
            this.userForm.reset({ ...this.user });
        }
    }


    private launchStatusModal(message: string, status: 'error' | 'success') {
        this._modalService.openModal({ message, status });

        setTimeout(() => {
            this._modalService.closeModal();
        }, 3000);
    }

    isFieldValid(fieldName: string): boolean {
        return this._validationService.isValidField(fieldName, this.userForm!);
    }

    getFieldErrors(fieldName: string): string[] {
        return this._validationService.getErrorsField(fieldName, this.userForm!);
    }

    toggleShowPasswordsFormsOption() {
        this.mustShowPasswordForms = !this.mustShowPasswordForms;
        this.userForm?.get('password')?.setValue('');
        this.userForm?.get('password2')?.setValue('');
    }

    submitForm() {
        if (this.userForm!.invalid && !this.user || this.mustShowPasswordForms && this.userForm?.invalid || this.userForm?.get('username')?.invalid) {
            this.userForm?.markAllAsTouched();
            return;
        }

        const username: string = this.userForm?.get('username')?.value.toLocaleLowerCase().trimStart().trimEnd();

        if (!this.user) {
            this._userService.createUser({ ...this.userForm?.value, username, is_admin: true }).subscribe({
                next: ({ message, user }) => {
                    this._userService.createdOrUpdatedUser = user;
                    this.launchStatusModal(message, 'success');
                    this.closeModal();
                },
                error: ({ error }) => this.launchStatusModal(error.message, 'error')
            });
            return;
        }


        this._userService.updateUser({ ...this.userForm?.value, id: this.user.id, username }).subscribe({
            next: ({ message, user }) => {
                this._userService.createdOrUpdatedUser = user;
                this.launchStatusModal(message, 'success');
                this.closeModal();
            },
            error: ({ error }) => this.launchStatusModal(error.message, 'error')

        });



    }


    closeModal() {
        this._userService.mustShowModalForm = false;
        document.querySelector('body')?.classList.remove('no-scroll');
    }




}