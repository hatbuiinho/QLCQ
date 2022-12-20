import { LeaveAddressDto } from "../LeaveAddresses/LeaveAddressDto.model";

export interface LeaveTimeDto {
	id: number;
	addressId: number;
	note?: string ;
	name: string ;
	time: Date;
	address?: LeaveAddressDto ;
}