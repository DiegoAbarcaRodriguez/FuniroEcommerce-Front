import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dashboard-furnitures-table-furnitures-component',
    templateUrl: 'table-furnitures.component.html'
})

export class TableFurnituresComponent implements OnInit {

    furnitures: [] = [];
    
    constructor() { }

    ngOnInit() { }
}