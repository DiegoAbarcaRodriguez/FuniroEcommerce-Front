import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardUsersComponent } from './pages/dashboard-users.component';
import { DahsboardLayoutComponent } from './layout/dashboard-layout.component';


const routes: Routes = [
    {
        path: '',
        component: DahsboardLayoutComponent,
        children: [
            {
                path: 'users',
                component: DashboardUsersComponent
            },
            {
                path: '**',
                redirectTo: 'users'
            }
        ]
    },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
