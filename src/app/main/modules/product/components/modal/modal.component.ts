import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { CustomerService } from 'src/app/main/shared/services/customer.service';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { FurnitureService } from 'src/app/main/shared/services/furniture.service';
import { ReviewService } from 'src/app/main/shared/services/review.service';
import { SnackbarService } from 'src/app/main/shared/services/snackbar.service';
import { Review } from 'src/app/main/shared/interfaces/review.interface';


@Component({
    selector: 'product-component-modal',
    templateUrl: 'modal.component.html',
    styles: [
        `
             .disable {
                cursor:not-allowed;
            }

            .disable {
                background-color:#E8F0FE;
                border: gray solid 1px;
            }
        
            img{
                cursor:pointer;
            }
        `
    ]
})

export class ModalComponent implements OnInit {

    @Output()
    onEmitReview: EventEmitter<Review> = new EventEmitter();

    private _furniture_id: string = '';

    form = this._fb.group({
        name: [''],
        title: ['', Validators.required],
        comment: ['', Validators.required],
        grade: [0, [Validators.required, Validators.max(5), Validators.min(0)]]
    });

    constructor(
        private _fb: FormBuilder,
        private _modalService: ModalService,
        private _snackbarService: SnackbarService,
        private _customerService: CustomerService,
        private _validationService: ValidationService,
        private _activatedRoute: ActivatedRoute,
        private _furnitureService: FurnitureService,
        private _reviewService: ReviewService,
    ) { }

    private _getFurnitureId() {
        this._activatedRoute.params
            .pipe(switchMap(({ name }) => this._furnitureService.getOneFurniture(name)))
            .subscribe(({ furniture }) => this._furniture_id = furniture.id)

    }

    ngOnInit() {
        this._getFurnitureId();
        this.form.controls['name'].setValue(this._customerService.customer?.first_name + ' ' + this._customerService.customer?.last_name);
    }



    submitRequest() {

        const { name, ...reviewPayload } = this.form.value;
        this._reviewService.createReview({
            ...reviewPayload as any,
            customer_id: this._customerService.customer?.id || '',
            furniture_id: this._furniture_id
        }).subscribe({
            next: ({ ok, review }) => {
                this.onEmitReview.emit(review);
                this._modalService.closeModal();
            },
            error: ({ error }) => {
                this._modalService.closeModal();
                this._snackbarService.message = error.message;
                this._snackbarService.mustShowSnackBar = true;

            }
        })
    }

    setRating(grade: number) {
        this.form.controls['grade'].setValue(grade);
    }

    closeModal() {
        this._modalService.closeModal();
    }

    getMessageErrors(fieldName: string): string[] {
        return this._validationService.getErrorsField(fieldName, this.form);
    }

    mustShowError(fieldName: string): boolean {
        return this._validationService.isValidField(fieldName, this.form);
    }
}