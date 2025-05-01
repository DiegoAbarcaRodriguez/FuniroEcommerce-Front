import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Review } from 'src/app/main/shared/interfaces/review.interface';
import { CustomerService } from 'src/app/main/shared/services/customer.service';
import { ReviewService } from 'src/app/main/shared/services/review.service';
import { Furniture } from 'src/app/shared/interfaces';
import { Environment } from 'src/environments/environment';
import { ModalReviewService } from '../../services/modal-review.service';
import { SnackbarService } from 'src/app/main/shared/services/snackbar.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { switchMap } from 'rxjs';

@Component({
    selector: 'executed-order-component-furnitures-card',
    templateUrl: 'purchased-furnitures-card.component.html',
    styleUrls: ['purchased-furnitures-card.component.scss']
})

export class PurchasedFurnituresCardComponent implements OnChanges {

    stars: number[] = [];

    urlImage: string = Environment.imagesUrl;
    review?: Review;

    @Input()
    furnitures: Furniture[] = [];

    @Input()
    status: string = '';


    constructor(
        private _reviewService: ReviewService,
        private _customerService: CustomerService,
        private _modalReviewService: ModalReviewService,
        private _modalService: ModalService,
        private _snackbarService: SnackbarService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['furnitures']?.currentValue.length > 0) {
            this.getReviews();
        }
    }

    private getReviews() {

        this.furnitures.forEach((furniture, index) => {
            this._reviewService.getReviewByFurnitureId(furniture.id).subscribe(reviews => {
                const selectedReview = this.getReviewByCustomerId(reviews);
                this.furnitures[index].review = selectedReview;
                this.furnitures[index].stars = this.createArrayForStars(selectedReview?.grade);
            });
        });



    }

    private getReviewByCustomerId(reviews: Review[]) {
        return reviews.find(review => review.customer_fk === this._customerService.customer?.id);
    }

    private createArrayForStars(grade: number = 0) {
        let stars = []
        for (let index = 0; index < Math.round(grade); index++) {
            stars.push(1);
        }

        return stars;

    }

    openReviewModal(furniture_id: string, review?: Review) {
        this._modalReviewService.openModal(furniture_id, review);
    }

    deleteReview(review_id: string) {
        this._modalService.openQuestionModal();

        this._modalService.respondFromQuestionModal
            .pipe(switchMap(() => this._reviewService.deleteReview(review_id)))
            .subscribe({
                next: () => window.location.reload(),
                error: ({ error }) => {
                    this._snackbarService.message = error.message;
                    this._snackbarService.mustShowSnackBar = true;
                }
            })

    }
}