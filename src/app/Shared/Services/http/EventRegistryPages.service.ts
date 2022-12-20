import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventRegistryPageDto } from '../../dtos/EventRegistryPages/EventRegistryPageDto.model';
import { EventRegistryPageLookUpDto } from '../../dtos/EventRegistryPages/EventRegistryPageLookUpDto.model';
import { UpSertEventRegistryPageDto } from '../../dtos/EventRegistryPages/UpSertEventRegistryPageDto.model';
import { PageResultDto } from '../../dtos/PageResultDto.model';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { HttpServerService } from './http-service.service';
 @Injectable({
	providedIn: 'root'	})
export class EventRegistryPagesService {
	constructor(private httpService : HttpServerService) {}
 getbyid(id:string | null):Observable<ServiceResponse<EventRegistryPageDto>>{
	const url = `eventregistrypages/GetById/${id}`;
	return this.httpService.get<ServiceResponse<EventRegistryPageDto>>(url)
}
search(request:EventRegistryPageLookUpDto | null):Observable<ServiceResponse<PageResultDto<EventRegistryPageDto>>>{
	const url = `eventregistrypages/search`;
	return this.httpService.get<ServiceResponse<PageResultDto<EventRegistryPageDto>>>(url, request)
}
create(request:UpSertEventRegistryPageDto | null):Observable<ServiceResponse<EventRegistryPageDto>>{
	const url = `eventregistrypages/Create`;
	return this.httpService.post<ServiceResponse<EventRegistryPageDto>>(url, request)
}
update(id:string | null, request:UpSertEventRegistryPageDto | null):Observable<ServiceResponse<EventRegistryPageDto>>{
	const url = `eventregistrypages/Update/${id}`;
	return this.httpService.put<ServiceResponse<EventRegistryPageDto>>(url, request)
}
delete(id:string | null):Observable<ServiceResponse<boolean>>{
	const url = `eventregistrypages/Delete/${id}`;
	return this.httpService.delete<ServiceResponse<boolean>>(url)
}
getall():Observable<ServiceResponse<EventRegistryPageDto[]>>{
	const url = `eventregistrypages/GetAll`;
	return this.httpService.get<ServiceResponse<EventRegistryPageDto[]>>(url)
}}
