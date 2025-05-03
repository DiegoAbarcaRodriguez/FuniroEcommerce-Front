import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ValidationService } from 'src/app/shared/services/validation.service';



@Component({
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.scss']
})

export class AuthComponent implements OnInit {

    year = new Date().getFullYear();

    authForm: FormGroup = this._fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required]]
    });

    constructor(
        private _fb: FormBuilder,
        private _authService: AuthService,
        private _router: Router,
        private _modalService: ModalService,
        private _validationService: ValidationService
    ) { }


    ngOnInit() {
    }

    isInValidField(fieldName: string): boolean {
        return this._validationService.isValidField(fieldName, this.authForm);
    }

    getErrorsField(fieldName: string): string[] {
        return this._validationService.getErrorsField(fieldName, this.authForm);
    }

    login() {

        if (this.authForm.valid) {

            this._authService.login(this.authForm.value).subscribe({
                next: ({ ok, message }) => {

                    if (ok) {
                        this._router.navigateByUrl('dashboard/furnitures');
                        return;
                    }

                    
                    this._modalService.openModal({ message, status: 'error' });

                    setTimeout(() => {
                        this._modalService.closeModal();
                    }, 3000);

                }
            });
        }

        this.authForm.markAllAsTouched();


    }
}