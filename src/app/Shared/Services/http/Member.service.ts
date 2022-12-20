import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberDto } from '../../dtos/Members/MemberDto.model';
import { PatchUpdateMemberDto } from '../../dtos/Members/PatchUpdateMemberDto.model';
import { UpSertMemberDto } from '../../dtos/Members/UpSertMemberDto.model';
import { SearchMemberRequest } from '../../dtos/SearchMemberRequest.model';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { HttpServerService } from './http-service.service';
@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private httpService: HttpServerService) {}
  getAll(): Observable<ServiceResponse<MemberDto[]>> {
    const url = `member/get-all`;
    return this.httpService.post<ServiceResponse<MemberDto[]>>(url);
  }
  getByDepartment(
    departmentId: number
  ): Observable<ServiceResponse<MemberDto[]>> {
    const url = `member/get-by-department/${departmentId}`;
    return this.httpService.post<ServiceResponse<MemberDto[]>>(url);
  }
  getById(id: string): Observable<ServiceResponse<MemberDto>> {
    const url = `member/get-by-id/${id}`;
    return this.httpService.post<ServiceResponse<MemberDto>>(url);
  }
  getByGroup(groupId: number): Observable<ServiceResponse<MemberDto[]>> {
    const url = `member/get-by-group/${groupId}`;
    return this.httpService.post<ServiceResponse<MemberDto[]>>(url);
  }
  getByEvent(EventId: number): Observable<ServiceResponse<MemberDto[]>> {
    const url = `member/get-by-Event/${EventId}`;
    return this.httpService.post<ServiceResponse<MemberDto[]>>(url);
  }
  add(request: UpSertMemberDto | null): Observable<ServiceResponse<MemberDto>> {
    const url = `member/add`;
    return this.httpService.post<ServiceResponse<MemberDto>>(url, request);
  }
  update(
    id: string,
    request: UpSertMemberDto | null
  ): Observable<ServiceResponse<MemberDto>> {
    const url = `member/update/${id}`;
    return this.httpService.post<ServiceResponse<MemberDto>>(url, request);
  }
  patchUpdate(id: string, request: PatchUpdateMemberDto) {
    const url = `member/update/${id}`;
    return this.httpService.patch<ServiceResponse<any>>(url, request);
  }
  delete(id: string): Observable<ServiceResponse<boolean>> {
    const url = `member/delete/${id}`;
    return this.httpService.post<ServiceResponse<boolean>>(url);
  }
  search(
    request: SearchMemberRequest | null
  ): Observable<ServiceResponse<MemberDto>> {
    const url = `member/search`;
    return this.httpService.post<ServiceResponse<MemberDto>>(url, request);
  }
}
