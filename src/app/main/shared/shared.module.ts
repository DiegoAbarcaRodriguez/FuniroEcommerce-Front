import { NgModule } from '@angular/core';
import { BannerSupportComponent } from './components/banner-support/banner-support.component';
import { ButtonScrollUpComponent } from './components/button-scroll-up/button-scroll-up.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroImageComponent } from './components/hero-image/hero-image.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OurProductsComponent } from './components/our-products/our-products.component';
import { ShoppingCarComponent } from './components/shopping-car/shopping-car.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SelectFunitureDirective } from './directives/select-furniture.directive';
import { SharedModule } from "../../shared/shared.module";
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    exports: [
        BannerSupportComponent,
        ButtonScrollUpComponent,
        FooterComponent,
        HeroImageComponent,
        NavbarComponent,
        OurProductsComponent,
        ShoppingCarComponent,
        SnackbarComponent,

        SelectFunitureDirective
    ],
    declarations: [
        BannerSupportComponent,
        ButtonScrollUpComponent,
        FooterComponent,
        HeroImageComponent,
        NavbarComponent,
        OurProductsComponent,
        ShoppingCarComponent,
        SnackbarComponent,

        SelectFunitureDirective


    ],
})
export class SharedMainModule { }
