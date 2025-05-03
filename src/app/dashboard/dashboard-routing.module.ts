import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardUsersComponent } from './modules/users/pages/dashboard-users/dashboard-users.component';
import { DahsboardLayoutComponent } from './layout/dashboard-layout.component';
import { DashboardFurnituresComponent } from './modules/furnitures/pages/dashboard-furnitures/dashboard-furnitures.component';
import { AddFurnitureComponent } from './modules/furnitures/pages/add-furniture/add-furniture.component';
import { DashboardUserGuard } from './modules/users/guard/dashboard-user.guard';


const routes: Routes = [
    {
        path: '',
        component: DahsboardLayoutComponent,
        children: [
            {
                path: 'users',
                loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
                canActivate: [DashboardUserGuard]
            },
            {
                path: 'furnitures',
                loadChildren: () => import('./modules/furnitures/furnitures.module').then(m => m.FurnituresModule)
            },
            {
                path: 'shippings',
                loadChildren: () => import('./modules/shippings/shippings.module').then(m => m.ShippingsModule)
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
