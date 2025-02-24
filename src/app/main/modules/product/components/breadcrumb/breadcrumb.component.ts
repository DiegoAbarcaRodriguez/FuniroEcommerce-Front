import { Component, Input, OnInit } from '@angular/core';
import { Furniture } from 'src/app/shared/interfaces';

@Component({
    selector: 'product-component-breadcrumb',
    templateUrl: 'breadcrumb.component.html',
    styles: [
        `
        
        .bar {
            color: #9F9F9F;
            font-weight: 200;
        }

        p{
            color:#9F9F9F;
            font-size:15px;
        }
        
        span{
            color:black;
        }
        `
    ]
})

export class BreadcrumbComponent implements OnInit {

    @Input()
    furniture?: Furniture;

    constructor() { }

    ngOnInit() { }
}