import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'main-component-breadcrumb',
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
    constructor() { }

    ngOnInit() { }
}