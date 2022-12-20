import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PositionResponse } from '../../dtos/PositionResponse.model';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { HttpServerService } from './http-service.service';
 @Injectable({
	providedIn: 'root'	})
export class PositionService {
	constructor(private httpService : HttpServerService) {}
 getAll():Observable<ServiceResponse<PositionResponse[]>>{
	const url = `position/get-all`;
	return this.httpService.post<ServiceResponse<PositionResponse[]>>(url)
}}
