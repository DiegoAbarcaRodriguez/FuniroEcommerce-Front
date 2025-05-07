import { Component, OnInit } from '@angular/core';
import { OrderDashboardShippingService } from '../services/order.service';
import { Order } from '../inferfaces/orders-response';
import { status } from '../inferfaces/update-status-response.interface';
import { OrderService } from 'src/app/main/shared/services/order.service';

@Component({
    templateUrl: 'dashboard-shippings.component.html'
})

export class DashBoardShippingComponent implements OnInit {

    wasMadeByCustomerName: boolean = false;
    mustShowDetailsOrderModal: boolean = false;

    pagesNumber: number = 0;
    limit: number = 5;
    page: number = 1;
    status: status = '';
    orders: Order[] = [];

    customerName: string = '';

    constructor(
        private _orderDashboardService: OrderDashboardShippingService,
        private _orderService: OrderService
    ) { }


    ngOnInit() {
        this.getOrders();
        this._orderService.mustShowDetailOrderModal.subscribe(mustShow => this.mustShowDetailsOrderModal = mustShow);

    }


    getOrders() {
        this._orderDashboardService.getAllOrders(this.page, this.limit, this.status)
            .subscribe(({ orders, total }) => {
                this.orders = orders;
                this.pagesNumber = Math.ceil(total / this.limit);
                this.wasMadeByCustomerName = false;
            });

    }

    getOrdersByCustomerName() {
        this._orderDashboardService.getFilterOrdersByCustomerName(this.page, this.limit, this.customerName)
            .subscribe(({ orders, total }) => {
                this.orders = orders;
                this.pagesNumber = Math.ceil(total / this.limit);
                this.wasMadeByCustomerName = true;
            });
    }

}