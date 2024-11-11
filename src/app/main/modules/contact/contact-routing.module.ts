import { NgModule } from '@angular/core';

import { RouterModule, Route, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact.component';

const routes: Routes = [
    {
        path: '',
        component: ContactComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContactRoutingModule { }
