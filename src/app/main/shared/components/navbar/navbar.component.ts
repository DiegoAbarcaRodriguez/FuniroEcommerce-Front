import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ShoppingCarService } from './../../services/shopping-car.service';

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

            .fixate-navbar{
                z-index:10;
                position:fixed;
                top:0;
                left:0;
                align-text:center;
            }
           
        `
    ]
})

export class NavbarComponent implements OnInit {

    @ViewChild('navbar')
    navbar?: ElementRef<HTMLDivElement>

    mustShowHiddenMenu: boolean = false;

    constructor(private _shoppingCarService: ShoppingCarService) { }

    ngOnInit() { }

    onToggleHiddenMenu() {
        this.mustShowHiddenMenu = !this.mustShowHiddenMenu;
    }

    @HostListener('window:scroll', ['$event'])
    onFixateNavbar(event: any) {
        const document: Document = event.target;
        const headerDiv: HTMLDivElement = document.querySelector('.header-image')!;

        if (headerDiv?.getBoundingClientRect().top < 0) {
            this.navbar?.nativeElement.classList.add('fixate-navbar');
            return;
        }

        this.navbar?.nativeElement.classList.remove('fixate-navbar');
    }

    onAddToShoppingCar() {
        this._shoppingCarService.mustShowShoppingCarComponet = true;
        document.querySelector('body')?.classList.add('no-scroll');
    }
}