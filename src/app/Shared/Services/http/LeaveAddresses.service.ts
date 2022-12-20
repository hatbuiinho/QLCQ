import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveAddressDto } from '../../dtos/LeaveAddresses/LeaveAddressDto.model';
import { UpSertLeaveAddressDto } from '../../dtos/LeaveAddresses/UpSertLeaveAddressDto.model';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { HttpServerService } from './http-service.service';
 @Injectable({
	providedIn: 'root'	})
export class LeaveAddressesService {
	constructor(private httpService : HttpServerService) {}
 event(id:number):Observable<ServiceResponse<LeaveAddressDto[]>>{
	const url = `leaveaddresses/event/${id}`;
	return this.httpService.get<ServiceResponse<LeaveAddressDto[]>>(url)
}
create(request:UpSertLeaveAddressDto | null):Observable<ServiceResponse<LeaveAddressDto>>{
	const url = `leaveaddresses/Create`;
	return this.httpService.post<ServiceResponse<LeaveAddressDto>>(url, request)
}
update(id:number, request:UpSertLeaveAddressDto | null):Observable<ServiceResponse<LeaveAddressDto>>{
	const url = `leaveaddresses/Update/${id}`;
	return this.httpService.put<ServiceResponse<LeaveAddressDto>>(url, request)
}
delete(id:number):Observable<ServiceResponse<boolean>>{
	const url = `leaveaddresses/Delete/${id}`;
	return this.httpService.delete<ServiceResponse<boolean>>(url)
}
getbyid(id:number):Observable<ServiceResponse<LeaveAddressDto>>{
	const url = `leaveaddresses/GetById/${id}`;
	return this.httpService.get<ServiceResponse<LeaveAddressDto>>(url)
}
getall():Observable<ServiceResponse<LeaveAddressDto[]>>{
	const url = `leaveaddresses/GetAll`;
	return this.httpService.get<ServiceResponse<LeaveAddressDto[]>>(url)
}}
