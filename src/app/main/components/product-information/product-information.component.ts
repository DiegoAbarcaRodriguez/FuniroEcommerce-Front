import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'main-component-product-information',
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

export class ProductInformationComponent implements OnInit {

    selectedOption: 'description' | 'additional information' | 'reviews' = 'description';

    constructor() { }

    ngOnInit() { }

    navigateToOption(option: 'description' | 'additional information' | 'reviews') {
        this.selectedOption = option;
    }
}