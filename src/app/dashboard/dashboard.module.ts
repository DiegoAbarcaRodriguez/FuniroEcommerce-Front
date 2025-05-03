import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { DahsboardLayoutComponent } from './layout/dashboard-layout.component';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalUsersComponent } from './components/modal-users/modal-user.component';
import { DashboardTitlesComponent } from './components/dashboard-titles/dashboard-titles.component';


@NgModule({
    imports: [
        DashboardRoutingModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        SideBarComponent,
        DahsboardLayoutComponent,
        ToolbarComponent,
        ModalUsersComponent,
        DashboardTitlesComponent
    ],
    exports: [DashboardTitlesComponent]
})
export class DashboardModule { }
