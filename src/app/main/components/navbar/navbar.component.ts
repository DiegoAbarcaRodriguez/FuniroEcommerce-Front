import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'main-component-navbar',
    templateUrl: 'navbar.component.html',
    styles: [
        `
            a,
            img,
            span{
                cursor:pointer;
            }

            a:hover{
                font-weight:bolder;
            }

            .active{
                font-weight:bolder;
            }            

           
        `
    ]
})

export class NavbarComponent implements OnInit {
    mustShowHiddenMenu: boolean = false;

    constructor() { }

    ngOnInit() { }

    onToggleHiddenMenu() {
        this.mustShowHiddenMenu = !this.mustShowHiddenMenu;
    }
}