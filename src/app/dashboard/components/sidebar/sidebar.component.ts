import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'dashboard-sidebar-component',
    templateUrl: 'sidebar.component.html',
    styles: [
        `.sidebar{
            height:100vh;
            overflow-y:hidden;
        }`
    ]

})

export class SideBarComponent implements OnInit {


    constructor() { }

    ngOnInit() {

    }
}