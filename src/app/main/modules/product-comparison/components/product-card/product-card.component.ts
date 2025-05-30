import { Component, Input, OnInit } from '@angular/core';
import { Furniture } from 'src/app/shared/interfaces';
import { Environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Component({
    selector: 'product-comparison-component-product-card',
    templateUrl: 'product-card.component.html',
    styles: [
        `
         a {
          text-decoration:underline;  
        }

        .bar {
         color: #9F9F9F;
         font-weight: 200;
        }

        
        .product-image{
            width:250px;
            heigth:157px;
            border-radius:5%;
        }

        
        `
    ]
})

export class ProductCardComponent implements OnInit {

    @Input()
    furniture?: Furniture;

    average: number = 0;
    stars: number[] = [];
    mustShowHalfStar: boolean = false;
    totalReviews: number = 0;

    image_url = Environment.imagesUrl;

    constructor() { }

    ngOnInit() {
        this.calculateAverageAndTotal();
        this.createArrayForStars();

    }

    private calculateAverageAndTotal() {

        const gradeSum = this.furniture?.reviews?.reduce((total, review) => total + review.grade, 0) || 0;


        const gradeTotal = this.furniture?.reviews?.length || 1;

        this.average = gradeSum / gradeTotal;
        this.totalReviews = this.furniture?.reviews?.length || 0;

        if (!Number.isInteger(this.average)) this.mustShowHalfStar = true;

    }

    private createArrayForStars() {

        for (let index = 0; index < Math.round(this.average); index++) {
            this.stars.push(1);
        }
        if (this.mustShowHalfStar) this.stars.pop();
    }

}