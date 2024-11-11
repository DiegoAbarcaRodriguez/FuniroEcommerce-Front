import { NgModule } from '@angular/core';
import { ContactComponent } from './pages/contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { SharedMainModule } from '../../shared/shared.module';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { FormContactComponent } from './components/form-contact/form-contact.component';


@NgModule({
    imports: [
        ContactRoutingModule,
        SharedMainModule
    ],
    declarations: [
        ContactComponent,
        ContactInformationComponent,
        FormContactComponent
    ],
})
export class ContactModule { }
