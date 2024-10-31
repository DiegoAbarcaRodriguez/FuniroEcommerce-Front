import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderHomeComponent } from './components/header-home/header-home.component';
import { BrowseRangeComponent } from './components/browse-the-range/browse-the-range.component';
import { OurProductsComponent } from './components/our-products/our-products.component';
import { CommonModule } from '@angular/common';
import { SelectFunitureDirective } from './directives/select-furniture.directive';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { CollageComponent } from './components/collage/collage.component';
import { ButtonScrollUpComponent } from './components/button-scroll-up/button-scroll-up.component';
import { ShopComponent } from './pages/shop/shop.component';
import { HeroImageComponent } from './components/hero-image/hero-image.component';
import { NavbarFilterComponent } from './components/navbar-filter/navbar-filter.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { BannerSupportComponent } from './components/banner-support/banner-support.component';
import { ProductComponent } from './pages/product/product.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductInformationComponent } from './components/product-information/product-information.component';


@NgModule({
    imports: [
        MainRoutingModule,
        CommonModule
    ],
    exports: [],
    declarations: [
        LayoutComponent,
        HomeComponent,
        ShopComponent,

        NavbarComponent,
        FooterComponent,
        HeaderHomeComponent,
        BrowseRangeComponent,
        OurProductsComponent,
        CarrouselComponent,
        CollageComponent,
        ButtonScrollUpComponent,
        HeroImageComponent,
        NavbarFilterComponent,
        PaginationComponent,
        BannerSupportComponent,
        ProductComponent,
        BreadcrumbComponent,
        ProductCardComponent,
        ProductInformationComponent,

        SelectFunitureDirective,
    ],
})
export class MainModule { }
