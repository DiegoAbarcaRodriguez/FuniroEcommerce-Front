import { Component, Input, OnInit } from '@angular/core';
import { OrderDashboardShippingService } from '../../services/order.service';
import { Order } from '../../inferfaces/orders-response';
import { status, statusMap } from '../../inferfaces/update-status-response.interface';
import { ModalService } from 'src/app/shared/services/modal.service';
import { OrderService } from 'src/app/main/shared/services/order.service';

@Component({
    selector: 'dashboard-shippings-table-component',
    templateUrl: 'table-shippings.component.html'
})

export class TableShippingComponent implements OnInit {

    @Input()
    orders: Order[] = [];

    constructor(
        private _orderDashboardService: OrderDashboardShippingService,
        private _orderService: OrderService,
        private _modalService: ModalService
    ) { }

    ngOnInit() {
    }

    updateShippingStatus(order_id: string, status: status) {

        const statusToChange = statusMap[status];

        return this._orderDashboardService.updateStatus(statusToChange as status, order_id)
            .subscribe({
                next: ({ orderUpdated }) => {
                    this.orders = this.orders.map(order => {
                        if (order.id === orderUpdated.id) {
                            return {
                                ...order,
                                modify_at: orderUpdated.modify_at,
                                status: orderUpdated.status
                            }
                        }

                        return order;

                    });
                },
                error: ({ error }) => {
                    this._modalService.openModal({ status: 'error', message: error.message });
                }
            });
    }

    openViewOrderDetailsModal(id: string) {
        this._orderService.openModalDetailsOrder(id);
    }
}