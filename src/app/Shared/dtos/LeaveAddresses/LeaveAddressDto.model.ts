import { AddressDto } from "../AddressDto.model";
import { EventDto } from "../EventDto.model";
import { LeaveTimeDto } from "../TimeToLeaves/LeaveTimeDto.model";

export interface LeaveAddressDto {
	id: number;
	wardId: number;
	eventId: number;
	provinceId: number;
	districtId: number;
	name?: string ;
	address?: string ;
	description?: string ;
	event?: EventDto ;
	ward?: AddressDto ;
	province?: AddressDto ;
	district?: AddressDto ;
	times: LeaveTimeDto[] ;
}