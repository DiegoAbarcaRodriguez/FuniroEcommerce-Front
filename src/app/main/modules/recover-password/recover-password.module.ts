import { NgModule } from '@angular/core';
import { RecoverPasswordRoutingModule } from './recover-password-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecoverPasswordComponent } from './pages/recover-password.component';

@NgModule({
    imports: [
        RecoverPasswordRoutingModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [RecoverPasswordComponent]
})
export class RecoverModule { }
