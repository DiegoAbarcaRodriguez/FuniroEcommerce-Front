import { Component, OnInit, NgModule, Output, EventEmitter, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
    selector: 'shared-component-searcher',
    styles: [`
            input::placeholder{ 
                color:#9F9F9F
            }
        `],
    template: `<input class="form-control text-primary" placeholder="Search an item" type="search" (keydown)="onSearch($event)" #input>`
})

export class SearcherComponent implements OnInit, OnDestroy {

    subscription?: Subscription;
    term: string = '';
    onDebounce: Subject<string> = new Subject();

    @ViewChild('input')
    input?: ElementRef<HTMLInputElement>;

    @Output()
    onEmit: EventEmitter<string> = new EventEmitter();


    constructor() { }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnInit() {
        this.subscription = this.onDebounce
            .pipe(debounceTime(3000))
            .subscribe(value => this.onEmit.emit(value));

    }

    onSearch(event: KeyboardEvent) {

        const value = this.input?.nativeElement.value;

        if (event.key === 'Enter') {
            this.onEmit.emit(value);
        }
        this.onDebounce.next(value!);
    }
}