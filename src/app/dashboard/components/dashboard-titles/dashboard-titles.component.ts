import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard-component-titles',
    templateUrl: 'dashboard-titles.component.html'
})

export class DashboardTitlesComponent implements OnInit {


    @Input()
    title: string = ''

    @Input()
    subtitle: string = ''

    constructor() { }

    ngOnInit() {
    }
}