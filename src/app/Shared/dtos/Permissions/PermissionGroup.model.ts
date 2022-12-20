import { PermissionDescription } from './PermissionDescription.model';
export interface PermissionGroup {
  key: string;
  name: string;
  registeredPermissions: PermissionDescription[];
}
