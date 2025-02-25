import { Component, Input, OnInit } from '@angular/core';
import { Furniture } from 'src/app/shared/interfaces';

@Component({
    selector: 'product-comparison-component-general-description',
    templateUrl: 'general-description.component.html'
})

export class GeneralDescriptionComponent implements OnInit {

    @Input()
    furniture?: Furniture;

    constructor() { }

    ngOnInit() { }
}