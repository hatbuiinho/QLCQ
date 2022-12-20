import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrmMemberRequest } from '../../dtos/BRM/BrmMemberRequest.model';
import { HttpServerService } from './http-service.service';
 @Injectable({
	providedIn: 'root'	})
export class BRMService {
	constructor(private httpService : HttpServerService) {}
 syncDaile():Observable<any>{
	const url = `brm/sync-daile`;
	return this.httpService.post<any>(url)
}
getDaile():Observable<any>{
	const url = `brm/get-daile`;
	return this.httpService.post<any>(url)
}
getMembers(request:BrmMemberRequest | null):Observable<any>{
	const url = `brm/get-members`;
	return this.httpService.post<any>(url, request)
}
pullAddress():Observable<any>{
	const url = `brm/pull-address`;
	return this.httpService.post<any>(url)
}
getDepartments():Observable<any>{
	const url = `brm/get-departments`;
	return this.httpService.post<any>(url)
}}
