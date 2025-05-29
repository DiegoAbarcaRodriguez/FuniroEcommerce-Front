import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IncomesComponent } from "./pages/incomes/incomes.component";

const routes: Routes = [
    {
        path: '',
        component: IncomesComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class IncomesRoutingModule { }
