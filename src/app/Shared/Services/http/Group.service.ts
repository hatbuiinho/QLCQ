import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupDto } from '../../dtos/Groups/GroupDto.model';
import { GroupLookUpDto } from '../../dtos/Groups/GroupLookUpDto.model';
import { UpSertGroupDto } from '../../dtos/Groups/UpSertGroupDto.model';
import { PageResultDto } from '../../dtos/PageResultDto.model';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { HttpServerService } from './http-service.service';
@Injectable({
  providedIn: 'root',
})
export class GroupService {
  deleteMany(ids: number[]): Observable<ServiceResponse<number>> {
    const url = `group/delete`;
    return this.httpService.post<ServiceResponse<number>>(url, ids);
  }
  constructor(private httpService: HttpServerService) {}
  search(
    request: GroupLookUpDto | null
  ): Observable<ServiceResponse<PageResultDto<GroupDto>>> {
    const url = `group/search`;
    return this.httpService.get<ServiceResponse<PageResultDto<GroupDto>>>(
      url,
      request
    );
  }
  create(
    request: UpSertGroupDto | null
  ): Observable<ServiceResponse<GroupDto>> {
    const url = `group/Create`;
    return this.httpService.post<ServiceResponse<GroupDto>>(url, request);
  }
  update(
    id: number,
    request: UpSertGroupDto | null
  ): Observable<ServiceResponse<GroupDto>> {
    const url = `group/Update/${id}`;
    return this.httpService.put<ServiceResponse<GroupDto>>(url, request);
  }
  delete(id: number): Observable<ServiceResponse<boolean>> {
    const url = `group/Delete/${id}`;
    return this.httpService.delete<ServiceResponse<boolean>>(url);
  }
  getbyid(id: number): Observable<ServiceResponse<GroupDto>> {
    const url = `group/GetById/${id}`;
    return this.httpService.get<ServiceResponse<GroupDto>>(url);
  }
  getall(): Observable<ServiceResponse<GroupDto[]>> {
    const url = `group/GetAll`;
    return this.httpService.get<ServiceResponse<GroupDto[]>>(url);
  }
}
