import { Component, Input } from '@angular/core';
import { Order } from 'src/app/main/shared/interfaces/order.interface';

@Component({
    selector: 'executed-order-component-order-card',
    templateUrl: 'order-card.component.html',

})

export class OrderCardComponent {

    @Input()
    order?: Order;

    constructor() { }

    changeStatus() { 
        
    }


}