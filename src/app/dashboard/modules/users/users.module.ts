import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { CommonModule } from '@angular/common';
import { DashboardUsersComponent } from './pages/dashboard-users/dashboard-users.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { UserStatusPipe } from './pipes/user-status.pipe';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
    imports: [
        UsersRoutingModule,
        CommonModule,
        SharedModule
    ],
    declarations: [
        DashboardUsersComponent,
        TableUsersComponent,
        UserStatusPipe
    ],

})
export class UsersModule { }
