import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'main-component-hero-image',
    templateUrl: 'hero-image.component.html',
    styleUrls: ['hero-image.component.scss']
})

export class HeroImageComponent implements OnInit {
    @Input()
    pageName?: string;

    constructor() { }

    ngOnInit() { }
}