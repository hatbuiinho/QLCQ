import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceiveCardAddressDto } from '../../dtos/ReceiveCardLocations/ReceiveCardAddressDto.model';
import { UpSertReceiveCardAddressDto } from '../../dtos/ReceiveCardLocations/UpSertReceiveCardAddressDto.model';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { HttpServerService } from './http-service.service';
@Injectable({
  providedIn: 'root',
})
export class ReceiveCardAddressesService {
  constructor(private httpService: HttpServerService) {}
  event(id: number): Observable<ServiceResponse<ReceiveCardAddressDto[]>> {
    const url = `receivecardaddresses/Event/${id}`;
    return this.httpService.get<ServiceResponse<ReceiveCardAddressDto[]>>(url);
  }
  create(
    request: UpSertReceiveCardAddressDto | null
  ): Observable<ServiceResponse<ReceiveCardAddressDto>> {
    const url = `receivecardaddresses/Create`;
    return this.httpService.post<ServiceResponse<ReceiveCardAddressDto>>(
      url,
      request
    );
  }
  update(
    id: number,
    request: UpSertReceiveCardAddressDto | null
  ): Observable<ServiceResponse<ReceiveCardAddressDto>> {
    const url = `receivecardaddresses/Update/${id}`;
    return this.httpService.put<ServiceResponse<ReceiveCardAddressDto>>(
      url,
      request
    );
  }
  delete(id: number): Observable<ServiceResponse<boolean>> {
    const url = `receivecardaddresses/Delete/${id}`;
    return this.httpService.delete<ServiceResponse<boolean>>(url);
  }
  getbyid(id: number): Observable<ServiceResponse<ReceiveCardAddressDto>> {
    const url = `receivecardaddresses/GetById/${id}`;
    return this.httpService.get<ServiceResponse<ReceiveCardAddressDto>>(url);
  }
  getall(): Observable<ServiceResponse<ReceiveCardAddressDto[]>> {
    const url = `receivecardaddresses/GetAll`;
    return this.httpService.get<ServiceResponse<ReceiveCardAddressDto[]>>(url);
  }
}
