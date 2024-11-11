import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BrowseRangeComponent } from './components/browse-the-range/browse-the-range.component';
import { CollageComponent } from './components/collage/collage.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderHomeComponent } from './components/header-home/header-home.component';
import { SharedMainModule } from '../../shared/shared.module';



@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        HomeRoutingModule,
        SharedMainModule
    ],
    declarations: [
        BrowseRangeComponent,
        CollageComponent,
        CarrouselComponent,
        HeaderHomeComponent,

        HomeComponent,
    ],
})
export class HomeModule { }
