import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { status } from '../../inferfaces/update-status-response.interface';

@Component({
    selector: 'dashboard-shippings-orders-filterer-component',
    templateUrl: 'orders-filterer.component.html',
    styleUrls: ['orders-filterer.component.scss']
})

export class OrdersFiltererComponent {

    @Output()
    onEmitStatus: EventEmitter<status> = new EventEmitter();

    constructor() { }






}