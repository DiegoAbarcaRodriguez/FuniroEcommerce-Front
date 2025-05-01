import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces';

@Component({
    selector: 'executed-order-component-customer-information',
    templateUrl: 'customer-information.component.html'
})

export class CustomerInformationComponent implements OnInit {

    @Input()
    customer?: Customer;

    constructor() { }

    ngOnInit() { }
}