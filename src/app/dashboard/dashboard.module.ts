import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { DahsboardLayoutComponent } from './layout/dashboard-layout.component';
import { CommonModule } from '@angular/common';
import { DashboardUsersComponent } from './pages/dashboard-users.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { UserStatusPipe } from './pipes/user-status.pipe';
import { ModalUsersComponent } from './components/modal-users/modal-user.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        DashboardRoutingModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        SideBarComponent,
        DashboardUsersComponent,
        DahsboardLayoutComponent,
        ToolbarComponent,
        TableUsersComponent,
        ModalUsersComponent,

        UserStatusPipe
    ]
})
export class DashboardModule { }
