import { ServiceResponse } from 'src/app/Shared/dtos/ServiceResponse.model';
import { UserDto } from './../../dtos/Users/UserDto.model';
import { PageResultDto } from './../../dtos/PageResultDto.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordDto } from '../../dtos/Users/ChangePasswordDto.model';
import { CreateUserDto } from '../../dtos/Users/CreateUserDto.model';
import { UpdateUserDto } from '../../dtos/Users/UpdateUserDto.model';
import { UserLookUpDto } from '../../dtos/Users/UserLookUpDto.model';
import { HttpServerService } from './http-service.service';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpService: HttpServerService) {}
  getasync(id: number): Observable<ServiceResponse<UserDto>> {
    const url = `users/GetAsync/${id}`;
    return this.httpService.get<any>(url);
  }
  search(
    request: UserLookUpDto | null
  ): Observable<ServiceResponse<PageResultDto<UserDto>>> {
    const url = `users/search`;
    return this.httpService.get<any>(url, request);
  }
  createasync(
    request: CreateUserDto | null
  ): Observable<ServiceResponse<never>> {
    const url = `users/CreateAsync`;
    return this.httpService.get<any>(url, request);
  }
  updateasync(
    id: number,
    request: UpdateUserDto | null
  ): Observable<ServiceResponse<never>> {
    const url = `users/UpdateAsync/${id}`;
    return this.httpService.put<any>(url, request);
  }
  deleteasync(id: number): Observable<ServiceResponse<never>> {
    const url = `users/DeleteAsync/${id}`;
    return this.httpService.delete<any>(url);
  }
  changePassword(
    request: ChangePasswordDto | null
  ): Observable<ServiceResponse<never>> {
    const url = `users/change-password`;
    return this.httpService.post<any>(url, request);
  }
  unlock(id: number): Observable<ServiceResponse<never>> {
    const url = `users/unlock/${id}`;
    return this.httpService.post<any>(url);
  }
}
