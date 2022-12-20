import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressDto } from '../../dtos/AddressDto.model';
import { HttpServerService } from './http-service.service';
 @Injectable({
	providedIn: 'root'	})
export class AddressService {
	constructor(private httpService : HttpServerService) {}
 dsTinh():Observable<AddressDto[]>{
	const url = `address/ds-tinh`;
	return this.httpService.get<AddressDto[]>(url)
}
dsHuyen(id:number):Observable<AddressDto[]>{
	const url = `address/ds-huyen/${id}`;
	return this.httpService.get<AddressDto[]>(url)
}
dsXa(id:number):Observable<AddressDto[]>{
	const url = `address/ds-xa/${id}`;
	return this.httpService.get<AddressDto[]>(url)
}}
