import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FocusTrapModule } from 'primeng/focustrap';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { MainComponent } from '../main/main.component';
import { ComponentsModule } from '../Shared/components/components.module';
import { DirectivesModule } from '../Shared/Directives/directives.module';
import { PipesModule } from '../Shared/Pipes/pipes.module';
import { AreaAssignmentsComponent } from './area-assignments/area-assignments.component';
import { AreaListComponent } from './area-list/area-list.component';
import { AuthorizeManagementComponent } from './authorize-management/authorize-management.component';
import { DepartmentAssignmentsComponent } from './department-assignments/department-assignments.component';
import { DepartmentDetailListComponent } from './department-detail-list/department-detail-list.component';
import { GroupAssignmentsComponent } from './group-assignments/group-assignments.component';
import { GroupListComponent } from './group-list/group-list.component';
import { MainRoutingModule } from './main-routing.module';
import { MemberListComponent } from './member-list/member-list.component';
import { ReceiveCardAddressManagementComponent } from './receive-card-address-management/receive-card-address-management.component';
import { RegisterListComponent } from './register-list/register-list.component';
import { RegistryPageListComponent } from './registry-page-list/registry-page-list.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { StartAddressListComponent } from './start-address-list/start-address-list.component';
import { UserListComponent } from './user-list/user-list.component';
@NgModule({
  declarations: [
    MainComponent,
    DepartmentDetailListComponent,
    RegistryPageListComponent,
    SkillListComponent,
    StartAddressListComponent,
    MemberListComponent,
    RegisterListComponent,
    AreaListComponent,
    DepartmentAssignmentsComponent,
    AreaAssignmentsComponent,
    GroupAssignmentsComponent,
    GroupListComponent,
    AuthorizeManagementComponent,
    ReceiveCardAddressManagementComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    RippleModule,
    ButtonModule,
    ReactiveFormsModule,
    ToolbarModule,
    SplitButtonModule,
    EditorModule,
    PipesModule,
    ScrollPanelModule,
    ImageModule,
    ToggleButtonModule,
    TabViewModule,
    CardModule,
    DirectivesModule,
    PasswordModule,
    TagModule,
    FocusTrapModule,
    AutoCompleteModule,
    OverlayPanelModule
  ],
})
export class MainModule {}
