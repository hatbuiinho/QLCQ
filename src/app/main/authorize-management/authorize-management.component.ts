import { BreadCrumbService } from 'src/app/Shared/Services/client/bread-crumb.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-authorize-management',
  templateUrl: './authorize-management.component.html',
  styleUrls: ['./authorize-management.component.css'],
})
export class AuthorizeManagementComponent {
  constructor(breadCrumb: BreadCrumbService) {
    breadCrumb.setPageTitle('Quản lý phân quyền');
  }
}
