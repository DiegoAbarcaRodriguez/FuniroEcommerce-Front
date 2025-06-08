import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ShoppingCarService } from './../../services/shopping-car.service';
import { FavoritesService } from '../../services/favorites.service';
import { ModalCustomerService } from '../../services/modal-customer.service';
import { PurchaseListService } from '../../services/purchase-list.service';

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

            .translate-middle{
                width:15px;
                height:15px;
                font-size:12px;
            }
           
        `
    ]
})

export class NavbarComponent implements OnInit {


    @ViewChild('navbar')
    navbar?: ElementRef<HTMLDivElement>

    isMobile: boolean = window.innerWidth <= 768;

    mustShowHiddenMenu: boolean = false;
    mustShowFavoriteList: boolean = false;
    mustShowPurchaseList: boolean = false;
    totalOrders?: number;

    constructor(
        private _shoppingCarService: ShoppingCarService,
        private _favoritesService: FavoritesService,
        private _modalCustomerService: ModalCustomerService,
        private _purchaseListService: PurchaseListService
    ) { }

    ngOnInit() {

        this._favoritesService.mustShowFavoritesListComponent.subscribe(mustShow => this.mustShowFavoriteList = mustShow);
        this._purchaseListService.mustShowPurchaseList.subscribe(mustShow => this.mustShowPurchaseList = mustShow);
        this.getTotalOrders();
    }

    private getTotalOrders() {
        this._purchaseListService.getOrders().subscribe(
            {
                next: ({ orders }) => {
                    this.totalOrders = orders.length;
                }
            });
    }

    openModalUser() {
        this._modalCustomerService.openModal();
    }

    onToggleHiddenMenu() {
        this.mustShowHiddenMenu = !this.mustShowHiddenMenu;
    }

    @HostListener('window:resize', ['$event'])
    onResizeWindow(event: any) {
        this.isMobile = window.innerWidth <= 768;
        if (event.currentTarget.innerWidth >= 992) {
            this.mustShowHiddenMenu = false;
        }
    }

    @HostListener('window:scroll', ['$event'])
    onFixateNavbar(event: any) {
        const document: Document = event.target;
        const headerDiv: HTMLDivElement = document.querySelector('.header-image')!;
        const h1Tag: HTMLElement = document.querySelector('h1')!;

        if (headerDiv?.getBoundingClientRect().top < 0 || h1Tag?.getBoundingClientRect().top < 0) {
            this.navbar?.nativeElement.classList.add('fixate-navbar');
            return;
        }

        this.navbar?.nativeElement.classList.remove('fixate-navbar');
    }

    onAddToShoppingCar() {
        this._shoppingCarService.mustShowShoppingCarComponet = true;
        window.scrollTo(0, 0);
        document.querySelector('body')?.classList.add('no-scroll');
    }

    onDeployFavoritesList() {
        this._purchaseListService.mustShowPurchaseList = false;
        this._favoritesService.mustShowFavoritesListComponent = true;
        window.scroll(0, 0);
    }

    onDeployPurchaseList() {
        this._favoritesService.mustShowFavoritesListComponent = false;
        this._purchaseListService.mustShowPurchaseList = true;
        window.scroll(0, 0);
    }
}