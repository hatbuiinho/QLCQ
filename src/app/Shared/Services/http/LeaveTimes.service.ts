import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResultDto } from '../../dtos/PageResultDto.model';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { LeaveTimeDto } from '../../dtos/TimeToLeaves/LeaveTimeDto.model';
import { LeaveTimeLookUpDto } from '../../dtos/TimeToLeaves/LeaveTimeLookUpDto.model';
import { UpSertLeaveTimeDto } from '../../dtos/TimeToLeaves/UpSertLeaveTimeDto.model';
import { HttpServerService } from './http-service.service';
 @Injectable({
	providedIn: 'root'	})
export class LeaveTimesService {
	constructor(private httpService : HttpServerService) {}
 search(request:LeaveTimeLookUpDto | null):Observable<ServiceResponse<PageResultDto<LeaveTimeDto>>>{
	const url = `leavetimes/search`;
	return this.httpService.get<ServiceResponse<PageResultDto<LeaveTimeDto>>>(url, request)
}
create(request:UpSertLeaveTimeDto | null):Observable<ServiceResponse<LeaveTimeDto>>{
	const url = `leavetimes/Create`;
	return this.httpService.post<ServiceResponse<LeaveTimeDto>>(url, request)
}
update(id:number, request:UpSertLeaveTimeDto | null):Observable<ServiceResponse<LeaveTimeDto>>{
	const url = `leavetimes/Update/${id}`;
	return this.httpService.put<ServiceResponse<LeaveTimeDto>>(url, request)
}
delete(id:number):Observable<ServiceResponse<boolean>>{
	const url = `leavetimes/Delete/${id}`;
	return this.httpService.delete<ServiceResponse<boolean>>(url)
}
getbyid(id:number):Observable<ServiceResponse<LeaveTimeDto>>{
	const url = `leavetimes/GetById/${id}`;
	return this.httpService.get<ServiceResponse<LeaveTimeDto>>(url)
}
getall():Observable<ServiceResponse<LeaveTimeDto[]>>{
	const url = `leavetimes/GetAll`;
	return this.httpService.get<ServiceResponse<LeaveTimeDto[]>>(url)
}}
