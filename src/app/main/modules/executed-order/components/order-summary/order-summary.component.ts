import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/main/shared/interfaces/order.interface';

@Component({
    selector: 'executed-order-component-order-summary',
    templateUrl: 'order-summary.component.html'
})

export class OrderSummaryComponent implements OnInit {

    @Input()
    order?: Order;

    constructor() { }

    ngOnInit() { }
}