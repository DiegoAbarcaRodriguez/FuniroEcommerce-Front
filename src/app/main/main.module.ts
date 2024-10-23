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


@NgModule({
    imports: [
        MainRoutingModule,
        CommonModule
    ],
    exports: [],
    declarations: [
        LayoutComponent,
        HomeComponent,
        NavbarComponent,
        FooterComponent,
        HeaderHomeComponent,
        BrowseRangeComponent,
        OurProductsComponent,
        CarrouselComponent,
        CollageComponent,
        
        SelectFunitureDirective,
    ],
})
export class MainModule { }
