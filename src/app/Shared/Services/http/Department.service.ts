import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentDto } from '../../dtos/Departments/DepartmentDto.model';
import { ServiceResponse } from '../../dtos/ServiceResponse.model';
import { HttpServerService } from './http-service.service';
 @Injectable({
	providedIn: 'root'	})
export class DepartmentService {
	constructor(private httpService : HttpServerService) {}
 getAll():Observable<ServiceResponse<DepartmentDto[]>>{
	const url = `department/get-all`;
	return this.httpService.post<ServiceResponse<DepartmentDto[]>>(url)
}
getDepartmentById(id:number):Observable<ServiceResponse<DepartmentDto>>{
	const url = `department/get-department-by-id/${id}`;
	return this.httpService.post<ServiceResponse<DepartmentDto>>(url)
}
updateFormBrm():Observable<ServiceResponse<number>>{
	const url = `department/update-form-brm`;
	return this.httpService.post<ServiceResponse<number>>(url)
}}
