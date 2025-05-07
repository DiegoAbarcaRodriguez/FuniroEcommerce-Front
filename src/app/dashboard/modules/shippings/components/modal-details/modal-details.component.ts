import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/main/shared/services/order.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Order } from '../../inferfaces/orders-response';
import { FurnitureElement } from 'src/app/main/shared/interfaces/order-extended.interface';
import { status } from '../../inferfaces/update-status-response.interface';

@Component({
    selector: 'dashboard-shipping-modal-details-component',
    templateUrl: 'modal-details.component.html',
    styles: [`
            .fw-custom{
                font-weight:500;
            }

            .w-90{
                width:90%;
                margin:0 auto;
            }
        `]
})

export class ModalDetailsComponent implements OnInit {
    private _order_id: string = ''
    order?: Order;
    furnitures: FurnitureElement[] = []

    constructor(
        private _orderService: OrderService,
        private _modalService: ModalService
    ) { }

    ngOnInit() {
        this._order_id = this._orderService.order_id;
        this.getOrderById();
    }

    private getOrderById() {
        this._orderService.getOrderDetails(this._order_id, true)
            .subscribe({
                next: ({ order, furnitures }) => {
                    this.order = {
                        ...order,
                        status: order.status as status
                    };
                    this.furnitures = furnitures;
                },
                error: ({ error }) => {
                    this._modalService.openModal({ status: 'error', message: error.message });
                    setTimeout(() => {
                        this._orderService.closeModalDetailsOrder();
                    }, 3000);
                }
            })
    }

    closeModal() {
        this._orderService.closeModalDetailsOrder();
    }
}