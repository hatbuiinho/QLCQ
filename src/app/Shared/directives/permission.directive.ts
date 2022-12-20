import {
  Directive,
  ElementRef,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthDataService } from '../Services/http/auth-data.service';

@Directive({
  selector: '[permissison]',
})
export class PermissionDirective {
  private permissions: string[] = [];
  private allPermissions: string[] = [];

  private logicalOp: 'OR' | 'AND' = 'OR';
  private isHidden = true;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authDataService: AuthDataService
  ) {}

  ngOnInit() {
    this.authDataService.$permissions.subscribe({
      next: (p) => {
        this.allPermissions = p ?? [];
        this.updateView();
      },
    });
  }

  @Input()
  set permissison(val: string | string[]) {
    if (typeof val === 'string') {
      val = [val];
    }
    this.permissions = val;
    this.updateView();
  }

  @Input()
  set permissisonOp(permop: 'OR' | 'AND') {
    this.logicalOp = permop;
    this.updateView();
  }

  private checkPermission() {
    let hasPermission = false;
    if (this.allPermissions.length) {
      for (const checkPermission of this.permissions) {
        const permissionFound = this.allPermissions.find(
          (x) => x == checkPermission
        );

        if (permissionFound) {
          hasPermission = true;

          if (this.logicalOp === 'OR') {
            break;
          }
        } else {
          hasPermission = false;
          if (this.logicalOp === 'AND') {
            break;
          }
        }
      }
    }
    return hasPermission;
  }

  private updateView() {
    if (this.checkPermission()) {
      if (this.isHidden) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainerRef.clear();
    }
  }
}
