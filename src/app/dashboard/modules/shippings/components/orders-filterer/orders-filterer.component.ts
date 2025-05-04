import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { status } from '../../inferfaces/update-status-response.interface';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'dashboard-shippings-orders-filterer-component',
    templateUrl: 'orders-filterer.component.html',
    styleUrls: ['orders-filterer.component.scss']
})

export class OrdersFiltererComponent implements AfterViewInit {

    @ViewChild('all')
    allRadioInput?: ElementRef<HTMLInputElement>;

    @Output()
    onEmitStatus: EventEmitter<status> = new EventEmitter();

    constructor(private _orderService: OrderService) { }

    ngAfterViewInit() {
        this._orderService.mustClearSearchInput.subscribe(value => {
            if (!value) {
                console.log('hola mundo')
                this.allRadioInput!.nativeElement.checked = true;
            }
        });
    }


    selectStatus(status: status) {
        this.onEmitStatus.emit(status);
        this._orderService.mustClearSearchInput = true;
    }




}