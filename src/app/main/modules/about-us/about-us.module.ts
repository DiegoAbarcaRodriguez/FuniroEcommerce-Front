import { NgModule } from '@angular/core';
import { AboutUsComponent } from './pages/about-us.component';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { SharedMainModule } from '../../shared/shared.module';



@NgModule({
    imports: [
        SharedMainModule,
        AboutUsRoutingModule
    ],
    declarations: [AboutUsComponent],

})
export class AboutUsModule { }
