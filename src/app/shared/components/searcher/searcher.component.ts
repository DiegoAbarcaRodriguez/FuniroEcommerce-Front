import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { OrderService } from 'src/app/dashboard/modules/shippings/services/order.service';

@Component({
    selector: 'shared-component-searcher',
    styles: [`
            input::placeholder{ 
                color:#9F9F9F
            }
        `],
    template: `<input class="form-control text-primary" placeholder="Search an item" type="search" (keyup)="onSearch($event)" #input>`
})

export class SearcherComponent implements OnInit, OnDestroy, AfterViewInit {

    subscription?: Subscription;
    term: string = '';
    onDebounce: Subject<string> = new Subject();

    @ViewChild('input')
    input?: ElementRef<HTMLInputElement>;

    @Output()
    onEmit: EventEmitter<string> = new EventEmitter();


    constructor(
        private _orderService: OrderService
    ) { }


    ngAfterViewInit() {
        this._orderService.mustClearSearchInput.subscribe(value => {
            if (value) {
                this.input!.nativeElement.value = '';
            }
        })
    }


    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnInit() {
        this.subscription = this.onDebounce
            .pipe(debounceTime(3000)).subscribe(value => this.onEmit.emit(value));

    }

    onSearch(event: KeyboardEvent) {

        const value = this.input?.nativeElement.value;
        if (value?.length === 0) return;

        if (event.key === 'Enter') {
            this.onEmit.emit(value);
        }
        this.onDebounce.next(value!);
        
        this._orderService.mustClearSearchInput = false;

    }
}