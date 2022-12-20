import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { StartTimeDto } from '../../dtos/StartTimes/StartTimeDto.model';
import { UpSertStartTimeDto } from '../../dtos/StartTimes/UpSertStartTimeDto.model';
import { HttpServerService } from './http-service.service';
 @Injectable({
	providedIn: 'root'	})
export class StartTimesService {
	constructor(private httpService : HttpServerService) {}
 create(request:UpSertStartTimeDto | null):Observable<ServiceResponse<StartTimeDto>>{
	const url = `starttimes/Create`;
	return this.httpService.post<ServiceResponse<StartTimeDto>>(url, request)
}
update(id:number, request:UpSertStartTimeDto | null):Observable<ServiceResponse<StartTimeDto>>{
	const url = `starttimes/Update/${id}`;
	return this.httpService.put<ServiceResponse<StartTimeDto>>(url, request)
}
delete(id:number):Observable<ServiceResponse<boolean>>{
	const url = `starttimes/Delete/${id}`;
	return this.httpService.delete<ServiceResponse<boolean>>(url)
}
getbyid(id:number):Observable<ServiceResponse<StartTimeDto>>{
	const url = `starttimes/GetById/${id}`;
	return this.httpService.get<ServiceResponse<StartTimeDto>>(url)
}
getall():Observable<ServiceResponse<StartTimeDto[]>>{
	const url = `starttimes/GetAll`;
	return this.httpService.get<ServiceResponse<StartTimeDto[]>>(url)
}}
