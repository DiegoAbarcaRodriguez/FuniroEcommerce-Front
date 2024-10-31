import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'main-component-collage',
    templateUrl: 'collage.component.html',
    styleUrls:['collage.component.scss']
})

export class CollageComponent implements OnInit {
    values: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    constructor() { }

    ngOnInit() { }
}