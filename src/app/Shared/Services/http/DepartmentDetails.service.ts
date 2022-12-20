import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentDetailDto } from '../../dtos/DepartmentDetails/DepartmentDetailDto.model';
import { DepartmentDetailLookUpDto } from '../../dtos/DepartmentDetails/DepartmentDetailLookUpDto.model';
import { UpSertDepartmentDetailDto } from '../../dtos/DepartmentDetails/UpSertDepartmentDetailDto.model';
import { PageResultDto } from '../../dtos/PageResultDto.model';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { HttpServerService } from './http-service.service';
@Injectable({
  providedIn: 'root',
})
export class DepartmentDetailsService {
  constructor(private httpService: HttpServerService) {}
  search(
    request: DepartmentDetailLookUpDto | null
  ): Observable<ServiceResponse<PageResultDto<DepartmentDetailDto>>> {
    const url = `departmentdetails/search`;
    return this.httpService.get<
      ServiceResponse<PageResultDto<DepartmentDetailDto>>
    >(url, request);
  }
  create(
    request: UpSertDepartmentDetailDto | null
  ): Observable<ServiceResponse<DepartmentDetailDto>> {
    const url = `departmentdetails/Create`;
    return this.httpService.post<ServiceResponse<DepartmentDetailDto>>(
      url,
      request
    );
  }
  update(
    id: number,
    request: UpSertDepartmentDetailDto | null
  ): Observable<ServiceResponse<DepartmentDetailDto>> {
    const url = `departmentdetails/Update/${id}`;
    return this.httpService.put<ServiceResponse<DepartmentDetailDto>>(
      url,
      request
    );
  }
  delete(id: number): Observable<ServiceResponse<boolean>> {
    const url = `departmentdetails/Delete/${id}`;
    return this.httpService.delete<ServiceResponse<boolean>>(url);
  }
  deleteRange(ids: number[]): Observable<ServiceResponse<any>> {
    const url = `departmentdetails/delete-range`;
    return this.httpService.post<ServiceResponse<any>>(url, ids);
  }
  getbyid(id: number): Observable<ServiceResponse<DepartmentDetailDto>> {
    const url = `departmentdetails/GetById/${id}`;
    return this.httpService.get<ServiceResponse<DepartmentDetailDto>>(url);
  }
  getAll(): Observable<ServiceResponse<DepartmentDetailDto[]>> {
    const url = `departmentdetails/GetAll`;
    return this.httpService.get<ServiceResponse<DepartmentDetailDto[]>>(url);
  }

  acceptRange(ids: number[]): Observable<ServiceResponse<number>> {
    const url = `departmentdetails/accept-range`;
    return this.httpService.post<ServiceResponse<number>>(url, ids);
  }
}
