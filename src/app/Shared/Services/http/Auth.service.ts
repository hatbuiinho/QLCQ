import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../dtos/LoginResponse.model';
import { MemberDto } from '../../dtos/Members/MemberDto.model';
import { MemberLoginRequest } from '../../dtos/Members/MemberLoginRequest.model';
import { PermissionGroup } from '../../dtos/Permissions/PermissionGroup.model';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { UserLoginDto } from 'src/app/Shared/dtos/Users/UserLoginDto.model';

import { HttpServerService } from './http-service.service';
import { UserDto } from '../../dtos/Users/UserDto.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpService: HttpServerService) {}
  login(
    request: UserLoginDto | null
  ): Observable<ServiceResponse<LoginResponse>> {
    const url = `auth/login`;
    return this.httpService.post<ServiceResponse<LoginResponse>>(url, request);
  }
  loginMember(
    request: MemberLoginRequest | null
  ): Observable<ServiceResponse<LoginResponse>> {
    const url = `auth/login-member`;
    return this.httpService.post<ServiceResponse<LoginResponse>>(url, request);
  }
  permission(): Observable<ServiceResponse<string[]>> {
    const url = `auth/permission`;
    return this.httpService.post<ServiceResponse<string[]>>(url);
  }
  user(): Observable<ServiceResponse<UserDto>> {
    const url = `auth/user`;
    return this.httpService.get<ServiceResponse<UserDto>>(url);
  }
  member(): Observable<ServiceResponse<MemberDto>> {
    const url = `auth/member`;
    return this.httpService.get<ServiceResponse<MemberDto>>(url);
  }
  apis(): Observable<ServiceResponse<PermissionGroup[]>> {
    const url = `auth/apis`;
    return this.httpService.get<ServiceResponse<PermissionGroup[]>>(url);
  }
}
