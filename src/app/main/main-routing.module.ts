import { PrintCardComponent } from './../Shared/components/print-card/print-card.component';
import { ReceiveCardAddressManagementComponent } from './receive-card-address-management/receive-card-address-management.component';
import { CroppableImageInputComponent } from './../Shared/components/croppable-image-input/croppable-image-input.component';
import { GroupAssignmentsComponent } from './group-assignments/group-assignments.component';
import { GroupListComponent } from './group-list/group-list.component';
import { AreaAssignmentsComponent } from './area-assignments/area-assignments.component';
import { ComingSoonComponent } from './../Shared/components/coming-soon/coming-soon.component';
import { AreaListComponent } from './area-list/area-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberListComponent } from './member-list/member-list.component';
import { AuthGuard } from '../Shared/Guards/auth.guard';
import { DepartmentDetailListComponent } from './department-detail-list/department-detail-list.component';
import { MainComponent } from './main.component';
import { RegisterListComponent } from './register-list/register-list.component';
import { RegistryPageListComponent } from './registry-page-list/registry-page-list.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { StartAddressListComponent } from './start-address-list/start-address-list.component';
import { DepartmentAssignmentsComponent } from './department-assignments/department-assignments.component';
import { AuthorizeManagementComponent } from './authorize-management/authorize-management.component';
import { Keys } from '../Shared/constants/keys.const';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'event/departments',
        component: DepartmentDetailListComponent,
      },
      {
        path: 'event/departments-assignment',
        component: DepartmentAssignmentsComponent,
      },
      {
        path: 'event/areas-assignment',
        component: AreaAssignmentsComponent,
      },
      {
        path: 'event/groups-assignment',
        component: GroupAssignmentsComponent,
      },
      {
        path: 'event/areas',
        component: AreaListComponent,
      },
      {
        path: 'event/groups',
        component: GroupListComponent,
      },
      {
        path: 'event/pages',
        component: RegistryPageListComponent,
      },
      {
        path: 'event/registers',
        component: RegisterListComponent,
      },
      {
        path: 'members',
        component: MemberListComponent,
      },
      {
        path: 'users',
        component: AuthorizeManagementComponent,
        data: {
          [Keys.ROUTE_REQUIRED]: [],
        },
      },
      {
        path: 'event/skills',
        component: SkillListComponent,
      },
      {
        path: 'event/start-address',
        component: StartAddressListComponent,
      },
      {
        path: 'event/card-address',
        component: ReceiveCardAddressManagementComponent,
      },
      {
        path: 'event/areas-assignment',
        component: ComingSoonComponent,
      },
      {
        path: 'event/groups-assignment',
        component: ComingSoonComponent,
      },
      {
        path: 'dashboard',
        component: ComingSoonComponent,
      },
      {
        path: 'event/statistic/start',
        component: ComingSoonComponent,
      },
      {
        path: 'event/statistic/status',
        component: ComingSoonComponent,
      },
      {
        path: 'user/profile',
        component: ComingSoonComponent,
      },
      {
        path: 'user/settings',
        component: ComingSoonComponent,
      },
      {
        path: '',
        redirectTo: 'event/registers',
        pathMatch: 'full',
      },
      {
        path: 'register/print',
        component: PrintCardComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
