import { NgModule } from '@angular/core';
import { ContactComponent } from './pages/contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { SharedMainModule } from '../../shared/shared.module';


@NgModule({
    imports: [
        ContactRoutingModule,
        SharedMainModule
    ],
    declarations: [ContactComponent],
})
export class ContactModule { }
