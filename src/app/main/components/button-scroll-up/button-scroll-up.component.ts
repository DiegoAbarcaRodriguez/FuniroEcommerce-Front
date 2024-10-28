import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'main-button-scroll-up',
    templateUrl: 'button-scroll-up.component.html',
    styles: [
        `
            button{
                position:fixed;
                bottom:3%;
                right:3%
            }
        `
    ]
})

export class ButtonScrollUpComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    @HostListener('click', ['$event'])
    onScrollTop() {
        scrollTo(0, 0);
    }
}