import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../inferfaces/orders-response';
import { status } from '../inferfaces/update-status-response.interface';

@Component({
    templateUrl: 'dashboard-shippings.component.html'
})

export class DashBoardShippingComponent implements OnInit {

    wasMadeByCustomerName: boolean = false;

    pagesNumber: number = 0;
    limit: number = 5;
    page: number = 1;
    status: status = '';
    orders: Order[] = [];

    customerName: string = '';

    constructor(private _orderService: OrderService) { }


    ngOnInit() {
        this.getOrders();

    }


    getOrders() {
        this._orderService.getAllOrders(this.page, this.limit, this.status)
            .subscribe(({ orders, total }) => {
                this.orders = orders;
                this.pagesNumber = Math.ceil(total / this.limit);
                this.wasMadeByCustomerName = false;
            });

    }

    getOrdersByCustomerName() {
        this._orderService.getFilterOrdersByCustomerName(this.page, this.limit, this.customerName)
            .subscribe(({ orders, total }) => {
                this.orders = orders;
                this.pagesNumber = Math.ceil(total / this.limit);
                this.wasMadeByCustomerName = true;
            });
    }

}