import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventRegistryPageContentDto } from '../../dtos/EventRegistryPageContents/EventRegistryPageContentDto.model';
import { EventRegistryPageContentLookUpDto } from '../../dtos/EventRegistryPageContents/EventRegistryPageContentLookUpDto.model';
import { UpSertEventRegistryPageContentDto } from '../../dtos/EventRegistryPageContents/UpSertEventRegistryPageContentDto.model';
import { PageResultDto } from '../../dtos/PageResultDto.model';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { HttpServerService } from './http-service.service';
 @Injectable({
	providedIn: 'root'	})
export class RegistrationPageContentsService {
	constructor(private httpService : HttpServerService) {}
 getbyid(id:number):Observable<ServiceResponse<EventRegistryPageContentDto>>{
	const url = `registrationpagecontents/GetById/${id}`;
	return this.httpService.get<ServiceResponse<EventRegistryPageContentDto>>(url)
}
default(id:number):Observable<ServiceResponse<EventRegistryPageContentDto>>{
	const url = `registrationpagecontents/default/${id}`;
	return this.httpService.get<ServiceResponse<EventRegistryPageContentDto>>(url)
}
search(request:EventRegistryPageContentLookUpDto | null):Observable<ServiceResponse<PageResultDto<EventRegistryPageContentDto>>>{
	const url = `registrationpagecontents/search`;
	return this.httpService.get<ServiceResponse<PageResultDto<EventRegistryPageContentDto>>>(url, request)
}
create(request:UpSertEventRegistryPageContentDto | null):Observable<ServiceResponse<EventRegistryPageContentDto>>{
	const url = `registrationpagecontents/Create`;
	return this.httpService.post<ServiceResponse<EventRegistryPageContentDto>>(url, request)
}
update(id:number, request:UpSertEventRegistryPageContentDto | null):Observable<ServiceResponse<EventRegistryPageContentDto>>{
	const url = `registrationpagecontents/Update/${id}`;
	return this.httpService.put<ServiceResponse<EventRegistryPageContentDto>>(url, request)
}
delete(id:number):Observable<ServiceResponse<boolean>>{
	const url = `registrationpagecontents/Delete/${id}`;
	return this.httpService.delete<ServiceResponse<boolean>>(url)
}
getall():Observable<ServiceResponse<EventRegistryPageContentDto[]>>{
	const url = `registrationpagecontents/GetAll`;
	return this.httpService.get<ServiceResponse<EventRegistryPageContentDto[]>>(url)
}}
