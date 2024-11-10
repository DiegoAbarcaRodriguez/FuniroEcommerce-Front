import { NgModule } from '@angular/core';
import { ContactComponent } from './pages/contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { MainModule } from '../../main.module';


@NgModule({
    imports: [
        ContactRoutingModule,
        MainModule
    ],
    declarations: [ContactComponent],
})
export class ContactModule { }
