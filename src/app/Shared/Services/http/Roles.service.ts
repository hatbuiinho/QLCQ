import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PageResultDto } from '../../dtos/PageResultDto.model';
import { PermissionGroup } from '../../dtos/Permissions/PermissionGroup.model';
import { RoleDto } from '../../dtos/Roles/RoleDto.model';
import { RoleLookUpDto } from '../../dtos/Roles/RoleLookUpDto.model';
import { UpSertRoleDto } from '../../dtos/Roles/UpSertRoleDto.model';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { HttpServerService } from './http-service.service';
@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private httpService: HttpServerService) {}

  private permissions: PermissionGroup[] | undefined;
  apis(): Observable<ServiceResponse<PermissionGroup[]>> {
    if (this.permissions) {
      return new Observable<ServiceResponse<PermissionGroup[]>>((sub) => {
        sub.next({ data: this.permissions, success: true });
      });
    }
    const url = `roles/apis`;
    return this.httpService
      .get<ServiceResponse<PermissionGroup[]>>(url)
      .pipe(tap((res) => (this.permissions = res.data)));
  }
  search(
    request: RoleLookUpDto | null
  ): Observable<ServiceResponse<PageResultDto<RoleDto>>> {
    const url = `roles/search`;
    return this.httpService.get<ServiceResponse<PageResultDto<RoleDto>>>(
      url,
      request
    );
  }
  create(request: UpSertRoleDto | null): Observable<ServiceResponse<RoleDto>> {
    const url = `roles/Create`;
    return this.httpService.post<ServiceResponse<RoleDto>>(url, request);
  }
  update(
    id: number,
    request: UpSertRoleDto | null
  ): Observable<ServiceResponse<RoleDto>> {
    const url = `roles/Update/${id}`;
    return this.httpService.put<ServiceResponse<RoleDto>>(url, request);
  }
  delete(id: number): Observable<ServiceResponse<boolean>> {
    const url = `roles/Delete/${id}`;
    return this.httpService.delete<ServiceResponse<boolean>>(url);
  }
  getbyid(id: number): Observable<ServiceResponse<RoleDto>> {
    const url = `roles/GetById/${id}`;
    return this.httpService.get<ServiceResponse<RoleDto>>(url);
  }
  getall(): Observable<ServiceResponse<RoleDto[]>> {
    const url = `roles/GetAll`;
    return this.httpService.get<ServiceResponse<RoleDto[]>>(url);
  }
  deleteMany(ids: number[]): Observable<ServiceResponse<number>> {
    const url = `roles/delete`;
    return this.httpService.post<ServiceResponse<number>>(url, ids);
  }
}
