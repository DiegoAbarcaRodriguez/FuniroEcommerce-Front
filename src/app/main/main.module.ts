import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SelectFunitureDirective } from './directives/select-furniture.directive';
import { OurProductsComponent } from './components/our-products/our-products.component';
import { HeroImageComponent } from './components/hero-image/hero-image.component';
import { BannerSupportComponent } from './components/banner-support/banner-support.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonScrollUpComponent } from './components/button-scroll-up/button-scroll-up.component';
import { ShoppingCarComponent } from './components/shopping-car/shopping-car.component';


@NgModule({
    imports: [
        MainRoutingModule,
        CommonModule
    ],
    exports: [
        OurProductsComponent,
        HeroImageComponent,
        BannerSupportComponent,
        PaginationComponent
    ],
    declarations: [
        LayoutComponent,

        OurProductsComponent,
        HeroImageComponent,
        BannerSupportComponent,
        PaginationComponent,
        NavbarComponent,
        FooterComponent,
        ButtonScrollUpComponent,
        ShoppingCarComponent,

        SelectFunitureDirective,
    ],
})
export class MainModule { }
