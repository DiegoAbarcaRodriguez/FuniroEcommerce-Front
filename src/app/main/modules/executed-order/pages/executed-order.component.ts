import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Order } from 'src/app/main/shared/interfaces/order.interface';
import { OrderService } from 'src/app/main/shared/services/order.service';
import { Customer, Furniture } from 'src/app/shared/interfaces';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ModalReviewService } from '../services/modal-review.service';

@Component({
    templateUrl: 'executed-order.component.html',
    styleUrls: ['./executed-order.component.scss']
})

export class ExecutedOrderComponent implements OnInit {

    order?: Order;
    customer?: Customer;
    furnitures: Furniture[] = [];

    mustShowModal: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _orderService: OrderService,
        private _modalService: ModalService,
        private _modalReviewService: ModalReviewService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.getOrderDetails();
        this._modalReviewService.mustShowReviewModal.subscribe(mustShow => this.mustShowModal = mustShow);
    }

    private getOrderDetails() {
        this._activatedRoute.params
            .pipe(switchMap(({ id }) => this._orderService.getOrderDetails(id)))
            .subscribe({
                next: ({ order, furnitures }) => {

                    const { customer, ...orderRest } = order;
                    this.order = orderRest;
                    this.customer = customer;
                    this.furnitures = furnitures.map(furniture => {
                        return {
                            ...furniture.furniture,
                            quatity: furniture.quantity
                        };
                    });
                },
                error: ({ error }) => {
                    this._modalService.openModal({ status: 'error', message: error.message });
                    this._router.navigateByUrl('/home');
                }
            });
    }

}