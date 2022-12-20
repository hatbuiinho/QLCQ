import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaDto } from '../../dtos/Areas/AreaDto.model';
import { AreaLookUpDto } from '../../dtos/Areas/AreaLookUpDto.model';
import { UpSertAreaDto } from '../../dtos/Areas/UpSertAreaDto.model';
import { PageResultDto } from '../../dtos/PageResultDto.model';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { HttpServerService } from './http-service.service';
@Injectable({
  providedIn: 'root',
})
export class AreasService {
  deleteMany(ids: number[]): Observable<ServiceResponse<number>> {
    const url = `areas/delete`;
    return this.httpService.post<ServiceResponse<number>>(url, ids);
  }
  constructor(private httpService: HttpServerService) {}
  search(
    request: AreaLookUpDto | null
  ): Observable<ServiceResponse<PageResultDto<AreaDto>>> {
    const url = `areas/search`;
    return this.httpService.get<ServiceResponse<PageResultDto<AreaDto>>>(
      url,
      request
    );
  }
  create(request: UpSertAreaDto | null): Observable<ServiceResponse<AreaDto>> {
    const url = `areas/Create`;
    return this.httpService.post<ServiceResponse<AreaDto>>(url, request);
  }
  update(
    id: number,
    request: UpSertAreaDto | null
  ): Observable<ServiceResponse<AreaDto>> {
    const url = `areas/Update/${id}`;
    return this.httpService.put<ServiceResponse<AreaDto>>(url, request);
  }
  delete(id: number): Observable<ServiceResponse<boolean>> {
    const url = `areas/Delete/${id}`;
    return this.httpService.delete<ServiceResponse<boolean>>(url);
  }
  getbyid(id: number): Observable<ServiceResponse<AreaDto>> {
    const url = `areas/GetById/${id}`;
    return this.httpService.get<ServiceResponse<AreaDto>>(url);
  }
  getall(): Observable<ServiceResponse<AreaDto[]>> {
    const url = `areas/GetAll`;
    return this.httpService.get<ServiceResponse<AreaDto[]>>(url);
  }
}
