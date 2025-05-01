import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/main/shared/services/customer.service';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { ReviewService } from 'src/app/main/shared/services/review.service';
import { SnackbarService } from 'src/app/main/shared/services/snackbar.service';
import { ModalReviewService } from '../../services/modal-review.service';
import { Review } from 'src/app/main/shared/interfaces/review.interface';
import { Subject } from 'rxjs';


@Component({
    selector: 'executed-order-component-modal-review',
    templateUrl: 'modal-review.component.html',
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

export class ModalReviewComponent implements OnInit {


    private _furniture_id: string = '';
    review?: Review;
    stars: number[] = [];
    wasClickedStar: Subject<boolean> = new Subject();

    form = this._fb.group({
        name: [''],
        title: ['', Validators.required],
        comment: ['', Validators.required],
        grade: [0, [Validators.required, Validators.max(5), Validators.min(0)]]
    });

    constructor(
        private _fb: FormBuilder,
        private _modalReviewService: ModalReviewService,
        private _snackbarService: SnackbarService,
        private _customerService: CustomerService,
        private _validationService: ValidationService,
        private _reviewService: ReviewService,
    ) { }



    ngOnInit() {
        this.getInitialValues();
        if (this.review) this.setUploadedReview();
    }

    private getInitialValues() {
        this.review = this._modalReviewService.review;
        this._furniture_id = this._modalReviewService.furniture_id;
        this.form.controls['name'].setValue(this._customerService.customer?.first_name + ' ' + this._customerService.customer?.last_name);
    }

    private setUploadedReview() {
        this.form.reset(this.review);
        this.form.controls['name'].setValue(this._customerService.customer?.first_name + ' ' + this._customerService.customer?.last_name);
        this.createStarsArray();
    }

    private createStarsArray() {

        for (let index = 0; index < Math.round(this.review!.grade); index++) {
            this.stars.push(1);

        }
    }

    private updateReview() {
        const { name, ...reviewPayload } = this.form.value;
        this._reviewService.updateReview(
            {
                ...reviewPayload as any,
                customer_id: this._customerService.customer?.id || '',
                furniture_id: this._furniture_id
            },
            this.review!.id
        ).subscribe({
            next: () => {
                this._modalReviewService.closeModal();
                window.location.reload();
            },
            error: ({ error }) => {
                this._modalReviewService.closeModal();
                this._snackbarService.message = error.message;
                this._snackbarService.mustShowSnackBar = true;
            }
        });
    }

    private createReview() {

        const { name, ...reviewPayload } = this.form.value;
        this._reviewService.createReview({
            ...reviewPayload as any,
            customer_id: this._customerService.customer?.id || '',
            furniture_id: this._furniture_id
        }).subscribe({
            next: () => {
                this._modalReviewService.closeModal();
                window.location.reload();
            },
            error: ({ error }) => {
                this._modalReviewService.closeModal();
                this._snackbarService.message = error.message;
                this._snackbarService.mustShowSnackBar = true;

            }
        });
    }

    enableRatingStars() {
        this.wasClickedStar.next(true);
    }

    submitRequest() {
        if (this.review) {
            this.updateReview();
            return;
        }

        this.createReview();

    }

    setRating(grade: number) {
        this.form.controls['grade'].setValue(grade);
    }

    closeModal() {
        this._modalReviewService.closeModal();
    }

    getMessageErrors(fieldName: string): string[] {
        return this._validationService.getErrorsField(fieldName, this.form);
    }

    mustShowError(fieldName: string): boolean {
        return this._validationService.isValidField(fieldName, this.form);
    }
}