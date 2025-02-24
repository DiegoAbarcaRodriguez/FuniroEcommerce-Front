import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReviewService } from 'src/app/main/shared/services/review.service';
import { Furniture, Review } from 'src/app/shared/interfaces';
import { Environment } from 'src/environments/environment';

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

    reviews: Review[] = [];
    stars: number[] = [];
    url_images = Environment.imagesUrl;

    selectedOption: 'description' | 'additional information' | 'reviews' = 'description';

    constructor(private _reviewService: ReviewService) { }

    ngOnChanges(changes: SimpleChanges): void {
        const { furniture } = changes;

        if (furniture.currentValue) {
            this.getReviews();
            this.generateStarsArray();
            this.filterOutFurnitureImages();
        }
    }



    private getReviews() {
        this._reviewService.getReviewByFurnitureId(this.furniture!.id).subscribe({ next: (reviews) => this.reviews = reviews })
    }

    private generateStarsArray() {
        for (let index = 0; index < this.reviews.length; index++) {
            this.stars[index];
        }
    }

    private filterOutFurnitureImages() {
        console.log(this.furniture?.images)
        this.furniture!.images = this.furniture!.images.filter(image => image !== '');
        console.log(this.furniture?.images)
    }
    navigateToOption(option: 'description' | 'additional information' | 'reviews') {
        this.selectedOption = option;
    }




}