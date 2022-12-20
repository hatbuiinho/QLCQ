import { PermissionGroup } from './../../dtos/Permissions/PermissionGroup.model';
import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { RolesService } from '../../Services/http/Roles.service';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-permission-assign',
  templateUrl: './permission-assign.component.html',
  styleUrls: ['./permission-assign.component.css'],
})
export class PermissionAssignComponent implements OnInit {
  @Input('minimum')
  public set minimunPermission(value: string[]) {
    this._minimunPermission = value;
    this.checkMinimunPermissions();
  }
  private _minimunPermission: string[] = [];
  public get minimunPermission(): string[] {
    return this._minimunPermission;
  }
  permissions: PermissionGroup[] = [];
  permssionNodes: TreeNode[] = [];
  public selectedPermissions: TreeNode[] = [];

  constructor(private roleService: RolesService) {}
  ngOnInit(): void {
    this.roleService.apis().subscribe({
      next: (res) => {
        if (res.success) {
          this.permissions = res.data ?? [];
          this.permssionNodes = this.permissions.map((g) => {
            return {
              label: g.name,
              data: g.key,
              children: g.registeredPermissions.map((p) => {
                const required = !this.minimunPermission.includes(p.key);
                return {
                  label: p.name,
                  data: p.key,
                  selectable: required,
                  key: p.key,
                };
              }),
            };
          });
        }
      },
    });
  }

  checkMinimunPermissions() {
    if (this.minimunPermission.length) {
      this.minimunPermission.forEach((p) => {
        if (this.selectedPermissions.findIndex((n) => n.key === p) === -1) {
          this.selectedPermissions.push({
            key: p,
          });
        }
      });
    }
  }

  change() {
    this.checkMinimunPermissions();
  }
}
