import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReviewService } from 'src/app/main/shared/services/review.service';
import { Furniture } from 'src/app/shared/interfaces';
import { Environment } from 'src/environments/environment';
import { ModalService } from '../../services/modal.service';
import { Review } from 'src/app/main/shared/interfaces/review.interface';

@Component({
    selector: 'product-component-product-information',
    templateUrl: 'product-information.component.html',
    styles: [
        `
            a {
                font-size:18px;
            }

            .image-container{
                height:150px;
                width:150px;
              
            }

            img{
                    object-fit:contain;
                }
        `
    ]
})

export class ProductInformationComponent implements OnChanges {

    @Input()
    furniture?: Furniture;

    mustShowModal: boolean = false;
    pageNumber: number = 0;
    currentPage: number = 1;
    limit: number = 5;

    totalReviews: number = 0;
    reviews: Review[] = [];
    stars: number[] = [1, 1, 1, 1, 1];
    url_images = Environment.imagesUrl;
    date = new Date();

    selectedOption: 'description' | 'additional information' | 'reviews' = 'description';

    constructor(
        private _reviewService: ReviewService,
        private _modalService: ModalService
    ) {
        this._modalService.mustShowReviewModal.subscribe(value => this.mustShowModal = value);

    }

    ngOnChanges(changes: SimpleChanges): void {
        const { furniture } = changes;

        if (furniture.currentValue) {
            this.getTotalReviews();
            this.getReviews();
            this.filterOutFurnitureImages();
        }
    }

    private getTotalReviews() {
        this._reviewService.getReviewByFurnitureId(this.furniture!.id).subscribe({
            next: (reviews) => {
                this.pageNumber = Math.ceil(reviews.length / this.limit);
                this.totalReviews = reviews.length;
            }
        });
    }


    private getReviews() {
        this._reviewService.getReviewByFurnitureId(this.furniture!.id, this.currentPage, this.limit).subscribe({
            next: (reviews) => {
                this.reviews = reviews;
                this.reviews = this.reviews.map(review => {
                    review.stars = this.generateStarsArray(review.grade);
                    return review;
                });

            }
        })
    }

    private generateStarsArray(grade: number) {
        let array = [];
        for (let index = 1; index <= grade; index++) {
            array.push(1);
        }

        return array;
    }

    private filterOutFurnitureImages() {
        this.furniture!.images = this.furniture!.images.filter(image => image !== '');
    }

    navigateToOption(option: 'description' | 'additional information' | 'reviews') {
        this.selectedOption = option;
    }

    openWriteReviewModal() {
        this._modalService.openModal();
    }

    addReview(review: Review) {
        review.stars = this.generateStarsArray(review.grade);
        this.reviews.unshift(review);
    }

    onChangePageReviews(page: number) {
        this.currentPage = page;
        this.getReviews()
    }



}