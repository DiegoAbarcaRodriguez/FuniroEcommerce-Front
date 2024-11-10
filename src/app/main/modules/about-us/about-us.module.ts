import { NgModule } from '@angular/core';
import { AboutUsComponent } from './pages/about-us.component';
import { MainModule } from '../../main.module';
import { AboutUsRoutingModule } from './about-us-routing.module';



@NgModule({
    imports: [
        MainModule,
        AboutUsRoutingModule
    ],
    declarations: [AboutUsComponent],

})
export class AboutUsModule { }
