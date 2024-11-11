import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'main-component-banner-support',
    templateUrl: 'banner-support.component.html',
    styles: [
        `

            .text-main,
            .text-alternative{
            
                line-height:20px;
                white-space:nowrap;
            }
            .text-main{
                font-size:20px;
            }
            .text-alternative{
                font-size:14px;
            }
        `
    ]
})

export class BannerSupportComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}