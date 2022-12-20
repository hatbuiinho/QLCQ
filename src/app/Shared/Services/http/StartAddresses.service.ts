import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { StartAddressDto } from '../../dtos/StartAddresses/StartAddressDto.model';
import { UpSertStartAddressDto } from '../../dtos/StartAddresses/UpSertStartAddressDto.model';
import { HttpServerService } from './http-service.service';
@Injectable({
  providedIn: 'root',
})
export class StartAddressesService {
  constructor(private httpService: HttpServerService) {}
  event(id: number): Observable<ServiceResponse<StartAddressDto[]>> {
    const url = `startaddresses/event/${id}`;
    return this.httpService.get<ServiceResponse<StartAddressDto[]>>(url);
  }
  create(
    request: UpSertStartAddressDto | null
  ): Observable<ServiceResponse<StartAddressDto>> {
    const url = `startaddresses/Create`;
    return this.httpService.post<ServiceResponse<StartAddressDto>>(
      url,
      request
    );
  }
  update(
    id: number,
    request: UpSertStartAddressDto | null
  ): Observable<ServiceResponse<StartAddressDto>> {
    const url = `startaddresses/Update/${id}`;
    return this.httpService.put<ServiceResponse<StartAddressDto>>(url, request);
  }
  delete(id: number): Observable<ServiceResponse<boolean>> {
    const url = `startaddresses/Delete/${id}`;
    return this.httpService.delete<ServiceResponse<boolean>>(url);
  }
  getbyid(id: number): Observable<ServiceResponse<StartAddressDto>> {
    const url = `startaddresses/GetById/${id}`;
    return this.httpService.get<ServiceResponse<StartAddressDto>>(url);
  }
  getall(): Observable<ServiceResponse<StartAddressDto[]>> {
    const url = `startaddresses/GetAll`;
    return this.httpService.get<ServiceResponse<StartAddressDto[]>>(url);
  }
}
